<?php
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");

$id = $_GET['id'];

// https://y2mate.lol/

function sendCurlRequest($url, $headers, $postData = null) {
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

// First request
$headers1 = [
    'accept: */*',
    'accept-language: en-US,en;q=0.9,ar;q=0.8,de;q=0.7,zh-CN;q=0.6,zh;q=0.5',
    'cache-control: no-cache',
    'content-type: application/json',
    'origin: https://iframe.y2meta-uk.com',
    'pragma: no-cache',
    'priority: u=1, i',
    'referer: https://iframe.y2meta-uk.com/',
    'sec-ch-ua: "Not(A:Brand";v="99", "Google Chrome";v="133", "Chromium";v="133"',
    'sec-ch-ua-mobile: ?0',
    'sec-ch-ua-platform: "macOS"',
    'sec-fetch-dest: empty',
    'sec-fetch-mode: cors',
    'sec-fetch-site: cross-site',
    'user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36'
];

$response1 = sendCurlRequest('https://api.mp3youtube.cc/v2/sanity/key', $headers1);
$key = $response1['key'];

// Second request
$headers2 = [
    'accept: */*',
    'accept-language: en-US,en;q=0.9,ar;q=0.8,de;q=0.7,zh-CN;q=0.6,zh;q=0.5',
    'cache-control: no-cache',
    'content-type: application/x-www-form-urlencoded',
    'key: ' . $key,
    'origin: https://iframe.y2meta-uk.com',
    'pragma: no-cache',
    'priority: u=1, i',
    'referer: https://iframe.y2meta-uk.com/',
    'sec-ch-ua: "Not(A:Brand";v="99", "Google Chrome";v="133", "Chromium";v="133"',
    'sec-ch-ua-mobile: ?0',
    'sec-ch-ua-platform: "macOS"',
    'sec-fetch-dest: empty',
    'sec-fetch-mode: cors',
    'sec-fetch-site: cross-site',
    'user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36'
];

$postData = 'link=https%3A%2F%2Fyoutu.be%2F' . $id . '&format=mp3&audioBitrate=128&videoQuality=720&vCodec=h264';

$response2 = sendCurlRequest('https://api.mp3youtube.cc/v2/converter', $headers2, $postData);

header('location:' . $response2['url']);
die();