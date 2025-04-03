---
title: How to detect animals poses using mmpose
date: 2025-04-04 23:23:23
categories: technical
---

In this post I will demonstrate how to setup mmpose inside a docker container to detect animals poses using the pre-trained COCO-animal pose estimation model from mmpose.

<!--more-->

MMPose is an open-source pose estimation toolbox built on PyTorch and part of the OpenMMLab ecosystem. It supports a wide range of pose estimation tasks, including 2D and 3D human and animal pose estimation.

Ps: You can refer to https://mmpose.readthedocs.io/en/latest/demos.html for more details on animals pose estimation using mmpose.

Here are the steps to do that:

## Setup Docker container file
To get started create a file named `Dockerfile` with the following content


```dockerfile
FROM python:3.10-slim

# Install system dependencies and build tools
RUN apt-get update && apt-get install -y git build-essential gcc g++ libgl1-mesa-glx libglib2.0-0 libsm6 libxext6 libxrender-dev wget ffmpeg && apt-get clean && rm -rf /var/lib/apt/lists/*

# Install PyTorch for CPU
RUN pip3 install --no-cache-dir torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cpu

# Create a working directory
WORKDIR /app

# Install MMPose dependencies
RUN pip3 install --no-cache-dir opencv-python
RUN pip3 install --no-cache-dir openmim
RUN pip3 install --no-cache-dir mmengine
RUN pip3 install --no-cache-dir -U mmcv==2.1.0
RUN pip3 install --no-cache-dir mmdet
RUN pip3 install --no-cache-dir mmpose

# Make directories for input/output
RUN mkdir -p /app/input /app/output

# Download model checkpoint => This will save time and prevent python code from downloading them each time the code is executed.
RUN mkdir -p /root/.cache/torch/hub/checkpoints/ && cd /root/.cache/torch/hub/checkpoints/ && wget -q https://download.openmmlab.com/mmpose/v1/projects/rtmposev1/rtmpose-m_simcc-ap10k_pt-aic-coco_210e-256x256-7a041aa1_20230206.pth
RUN mkdir -p /root/.cache/torch/hub/checkpoints/ && cd /root/.cache/torch/hub/checkpoints/ && wget -q https://download.openmmlab.com/mmdetection/v3.0/rtmdet/rtmdet_m_8xb32-300e_coco/rtmdet_m_8xb32-300e_coco_20220719_112220-229f527c.pth

# Clone MMPose for configs and demo scripts. We will use it later in the code
RUN git clone -b main --depth 1 https://github.com/open-mmlab/mmpose.git /app/mmpose

CMD ["/bin/bash"]
```

## Add code to detect poses
Next step is creating a file named `animal_pose.py` with the following content. This file holds the logic for pose estimation.

```python
import os
import numpy as np
import mmcv
from mmpose.utils import register_all_modules
from mmpose.apis import MMPoseInferencer

input_dir = 'input'
output_dir = 'output'

def main():
    os.makedirs(output_dir, exist_ok=True)

    register_all_modules()
    inferencer = MMPoseInferencer('animal')

    input_files = [f for f in os.listdir(input_dir) 
                  if f.lower().endswith(('.png', '.jpg', '.jpeg', '.mp4'))]
    if not input_files:
        return

    for input_file in input_files:
        input_path = os.path.join(input_dir, input_file)
        if input_path.endswith(".mp4"):
            process_video(input_path, inferencer)
        else:
            process_image(input_path, inferencer)

    
def process_video(input_path, inferencer):
    video = mmcv.VideoReader(input_path)
    
    for frame_idx, frame in enumerate(video):
        result_generator = inferencer(frame, vis_out_dir=output_dir)
        result = next(result_generator)

        predictions = result["predictions"][0][0]
        keypoints = np.array(predictions["keypoints"])
        keypoint_scores = np.array(predictions["keypoint_scores"])

def process_image(input_path, inferencer):
    result_generator = inferencer(input_path, vis_out_dir=output_dir)
    result = next(result_generator)
    
    predictions = result["predictions"][0][0]
    keypoints = np.array(predictions["keypoints"])
    keypoint_scores = np.array(predictions["keypoint_scores"])


if __name__ == '__main__':
    main()
```

This code will detect poses for both videos and images.

## Link everything together
And finally create a file named `run.sh` with the following content. This bash script build the docker image, moves files to it, and executes the python script. The output result for input images can be found in out directory.

```bash
#!/bin/bash
# Check if file provided
if [ "$1" == "" ]; then
    echo "Usage: ./direct_run.sh /path/to/animal_image.jpg"
    exit 1
fi

# Create directories
mkdir -p input output

# Copy image to input
cp "$1" input/
echo "Copied $1 to input directory"

# Build the Docker image
echo "Building Docker image..."
docker build --platform linux/arm64 -t mmpose-animal-m2 .

# Run inference directly (non-interactive mode)
echo "Running animal pose detection..."
docker run --rm --platform linux/arm64 \
    -v "$(pwd)/input:/app/input" \
    -v "$(pwd)/output:/app/output" \
    -v "$(pwd)/animal_pose.py:/app/animal_pose.py" \
    mmpose-animal-m2 python3 /app/animal_pose.py

echo ""
echo "Processing complete! Check the 'output' directory for results."
```

If you want to get the poses coordinates, you can print `keypoints` & `keypoint_scores` and use them.