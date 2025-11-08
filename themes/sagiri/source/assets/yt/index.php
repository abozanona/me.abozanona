<?php
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");

// Other websites we can use
// https://www.clipto.com/media-downloader/free-youtube-to-mp3-converter-0416
// https://postsyncer.com/tools/youtube-audio-downloader
// https://aimusic.fm/youtube-to-MP3/

$id = $_GET['id'];

function sendCurlRequest($url, $headers, $postData = null)
{
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

    if ($postData) {
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $postData);
    }

    $response = curl_exec($ch);
    curl_close($ch);

    return json_decode($response, true);
}

$headers = [
    'accept: application/json, text/plain, */*',
    'accept-language: en-US,en;q=0.9,ar;q=0.8,de;q=0.7,zh-CN;q=0.6,zh;q=0.5',
    'content-type: application/json',
    'origin: https://www.clipto.com',
    'priority: u=1, i',
    'referer: https://www.clipto.com/media-downloader/free-youtube-to-mp3-converter-0416',
    'sec-ch-ua: "Google Chrome";v="141", "Not?A_Brand";v="8", "Chromium";v="141"',
    'sec-ch-ua-mobile: ?0',
    'sec-ch-ua-platform: "macOS"',
    'sec-fetch-dest: empty',
    'sec-fetch-mode: cors',
    'sec-fetch-site: same-origin',
    'user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36',
];

$postData = '{"url":"https://www.youtube.com/watch?v=' . $id . '"}';

$response = sendCurlRequest('https://www.clipto.com/api/youtube', $headers, $postData);

header('location:' . $response['medias'][0]['url']);
die();