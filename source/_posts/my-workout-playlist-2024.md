---
title: My workout playlist
date: 2025-02-15 23:23:23
categories: diary
---

Maintaining my physical and mental health is a priority, and running and working out have become key components of that. I try to make time for exercise after work or on weekends when the weather is good and when I have time. It's a great way to de-stress and stay in shape after long hours at a desk.

<!--more-->

I'm sharing a part of my current workout playlist, based on recommendations from my music app. Hopefully, you'll find some inspiration for your own workouts.

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
<style>
    .player-container {
        width: 640px;
        max-width: 100%;
        margin: 0 auto;
        background-color: #fff;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0,0,0,0.1);
        padding: 20px;
    }
    #player {
        display: none;
    }
    .video-list {
        margin-bottom: 20px;
    }
    .video-item {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        padding: 10px;
        border-radius: 5px;
        transition: background-color 0.3s;
        justify-content: space-between; /* Add this */
    }
    .video-item:hover {
        background-color: #f0f0f0;
    }
    .video-item.active {
        background-color: #e0e0e0;
    }
    .video-item-info {
        display: flex;
        align-items: center;
        cursor: pointer; /* Make the thumbnail and title clickable */
    }
    .video-item img {
        width: 120px;
        height: 90px;
        margin-right: 10px;
        border-radius: 5px;
    }
    .controls {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 20px;
    }
    #progress-bar {
        flex-grow: 1;
        margin: 0 10px;
        -webkit-appearance: none;
        height: 5px;
        border-radius: 5px;
        background: #d3d3d3;
        outline: none;
    }
    #progress-bar::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background: #97dffd;
        cursor: pointer;
    }
    button {
        background-color: transparent;
        border: none;
        cursor: pointer;
        font-size: 24px;
        color: #97dffd;
    }
    .time-display {
        font-size: 14px;
        color: #666;
    }
    .youtube-link-button {
        background-color: #e74c3c; /* Red */
        color: white;
        border: none;
        padding: 8px 12px;
        border-radius: 5px;
        cursor: pointer;
        font-size: 14px;
        transition: background-color 0.3s;
    }
    .youtube-link-button:hover {
        background-color: #c0392b; /* Darker red */
    }
    .fluid-vids {
        padding: 0 !important;
        padding-top: 0px !important;
    }
</style>

<div class="player-container">
        <div class="controls">
        <button id="prev"><i class="fas fa-step-backward"></i></button>
        <button id="play-pause"><i class="fas fa-play"></i></button>
        <button id="next"><i class="fas fa-step-forward"></i></button>
        <input type="range" id="progress-bar" min="0" max="100" value="0">
        <span class="time-display">
            <span id="current-time">0:00</span> / <span id="duration">0:00</span>
        </span>
    </div>
    <div id="player"></div>
    <div class="video-list" id="video-list"></div>
</div>

<script src="https://www.youtube.com/iframe_api"></script>
<script>
    let player;
    let progressBar;
    let playPauseButton;
    let currentTimeSpan;
    let durationSpan;
    let playlist = ['ApXoWvfEYVU', 'vjFoj6nSPTM', '3UbjgjfYC-I', 'E9T78bT26sk', '4CSokyrdVgE', 'tLsJQ5srVQA', 'aSZUJJWXzAU', 'Zasx9hjo4WY', 't_N88_sndVs', 'ug0L5S2Qzwg', 'SJKeDG8lw04', 'x6JJTVol-iI', 'qAgPH1CWiAw', 'pgcZJqfCL80', 'HYsz1hP0BFo', 'RIDiNoRD69k', '_gPDULwKOkY'];
    let currentVideoIndex = 0;
    let isPlayerReady = false;
    let videoListCreated = false;
    function onYouTubeIframeAPIReady() {
        player = new YT.Player('player', {
            height: '360',
            width: '640',
            videoId: '',
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }
        });
    }
    function onPlayerReady(event) {
        isPlayerReady = true;
        progressBar = document.getElementById('progress-bar');
        playPauseButton = document.getElementById('play-pause');
        currentTimeSpan = document.getElementById('current-time');
        durationSpan = document.getElementById('duration');
        playPauseButton.addEventListener('click', togglePlayPause);
        progressBar.addEventListener('input', seekTo);
        document.getElementById('prev').addEventListener('click', playPreviousVideo);
        document.getElementById('next').addEventListener('click', playNextVideo);
        setInterval(updateProgressBar, 1000);
        createVideoList().then(() => {
            videoListCreated = true;
        });
    }
    function onPlayerStateChange(event) {
        if (event.data == YT.PlayerState.ENDED) {
            playNextVideo();
        }
    }
    function togglePlayPause() {
        if (!videoListCreated) return;
        if (player.getPlayerState() == YT.PlayerState.PLAYING) {
            player.pauseVideo();
            playPauseButton.innerHTML = '<i class="fas fa-play"></i>';
        } else {
            // Start playing from the beginning if no video is loaded, or resume
            if (player.getPlayerState() == YT.PlayerState.UNSTARTED || player.getVideoData().video_id === undefined) {
                loadVideo(playlist[currentVideoIndex]);
            } else {
                player.playVideo();
            }
            playPauseButton.innerHTML = '<i class="fas fa-pause"></i>';
        }
    }
    function seekTo() {
        if (!videoListCreated) return;
        const seekToTime = player.getDuration() * (progressBar.value / 100);
        player.seekTo(seekToTime, true);
    }
    function updateProgressBar() {
        if (!videoListCreated) return;
        if (player && player.getCurrentTime && player.getDuration) {
            const currentTime = player.getCurrentTime();
            const duration = player.getDuration();
            const percentage = (currentTime / duration) * 100;
            progressBar.value = percentage;
            currentTimeSpan.textContent = formatTime(currentTime);
            durationSpan.textContent = formatTime(duration);
        }
    }
    function formatTime(time) {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }
    function loadVideo(videoId) {
        if (isPlayerReady && player && player.loadVideoById) {
            player.loadVideoById(videoId);
            updateActiveVideo();
            playPauseButton.innerHTML = '<i class="fas fa-pause"></i>';
        } else {
            console.error('Player not ready');
        }
    }
    function playPreviousVideo() {
        if (!videoListCreated) return;
        currentVideoIndex = (currentVideoIndex - 1 + playlist.length) % playlist.length;
        loadVideo(playlist[currentVideoIndex]);
    }
    function playNextVideo() {
        if (!videoListCreated) return;
        currentVideoIndex = (currentVideoIndex + 1) % playlist.length;
        loadVideo(playlist[currentVideoIndex]);
    }
    async function createVideoList() {
        const videoList = document.getElementById('video-list');
        videoList.innerHTML = ''; // Clear existing items
        for (let index = 0; index < playlist.length; index++) {
            const videoId = playlist[index];
            try {
                const response = await fetch(`https://noembed.com/embed?url=https://www.youtube.com/watch?v=${videoId}`);
                const data = await response.json();
                const videoItem = document.createElement('div');
                videoItem.className = 'video-item';
                // Make the thumbnail and title clickable
                const videoItemInfo = document.createElement('div');
                videoItemInfo.className = 'video-item-info';
                videoItemInfo.innerHTML = `
                    <img src="${data.thumbnail_url}" alt="${data.title}">
                    <span>${data.title}</span>
                `;
                videoItemInfo.addEventListener('click', () => {
                    currentVideoIndex = index;
                    loadVideo(videoId);
                });
                videoItem.appendChild(videoItemInfo);
                // YouTube link button
                const youtubeLinkButton = document.createElement('button');
                youtubeLinkButton.className = 'youtube-link-button';
                youtubeLinkButton.innerHTML = '<i class="fab fa-youtube"></i>';
                youtubeLinkButton.addEventListener('click', (event) => {
                    event.stopPropagation(); // Prevent triggering video selection
                    window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
                });
                videoItem.appendChild(youtubeLinkButton);
                videoList.appendChild(videoItem);
            } catch (error) {
                console.error('Error fetching video data:', error);
            }
        }
    }
    function updateActiveVideo() {
        if (!videoListCreated) return;
        const videoItems = document.querySelectorAll('.video-item');
        videoItems.forEach((item, index) => {
            if (index === currentVideoIndex) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }
</script>