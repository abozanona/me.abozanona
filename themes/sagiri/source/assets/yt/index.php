<?php
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");

$id = $_GET['id'];

// https://ezmp3.cc/

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 'https://proxy.ezmp3.cc/api/getServer');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_POST, 1);
$headers = array();
$headers[] = 'Accept: */*';
$headers[] = 'Accept-Language: en-US,en;q=0.9';
$headers[] = 'Content-Length: 0';
$headers[] = 'Content-Type: application/json';
$headers[] = 'Origin: https://ezmp3.cc';
$headers[] = 'Priority: u=1, i';
$headers[] = 'Referer: https://ezmp3.cc/';
$headers[] = 'Sec-Ch-Ua: \"Not/A)Brand\";v=\"8\", \"Chromium\";v=\"126\", \"Google Chrome\";v=\"126\"';
$headers[] = 'Sec-Ch-Ua-Mobile: ?0';
$headers[] = 'Sec-Ch-Ua-Platform: \"macOS\"';
$headers[] = 'Sec-Fetch-Dest: empty';
$headers[] = 'Sec-Fetch-Mode: cors';
$headers[] = 'Sec-Fetch-Site: same-site';
$headers[] = 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36';
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
$result = curl_exec($ch);
if (curl_errno($ch)) {
    echo 'Error:' . curl_error($ch);
    die();
}
curl_close($ch);
$res = json_decode($result);
$server = $res->serverURL;

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $server . '/api/convert');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, "{\"url\":\"https://www.youtube.com/watch?v=$id\",\"quality\":128,\"trim\":false,\"startT\":0,\"endT\":0}");
$headers = array();
$headers[] = 'Accept: */*';
$headers[] = 'Accept-Language: en-US,en;q=0.9,ar;q=0.8,de;q=0.7';
$headers[] = 'Connection: keep-alive';
$headers[] = 'Content-Type: application/json';
$headers[] = 'Origin: https://ezmp3.cc';
$headers[] = 'Referer: https://ezmp3.cc/';
$headers[] = 'Sec-Fetch-Dest: empty';
$headers[] = 'Sec-Fetch-Mode: cors';
$headers[] = 'Sec-Fetch-Site: same-site';
$headers[] = 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36';
$headers[] = 'Sec-Ch-Ua: \"Not/A)Brand\";v=\"8\", \"Chromium\";v=\"126\", \"Google Chrome\";v=\"126\"';
$headers[] = 'Sec-Ch-Ua-Mobile: ?0';
$headers[] = 'Sec-Ch-Ua-Platform: \"macOS\"';
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

$result = curl_exec($ch);
if (curl_errno($ch)) {
    echo 'Error:' . curl_error($ch);
}
curl_close($ch);

$res = json_decode($result);
header('location:' . $res->url);
die();