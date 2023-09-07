<?php
$id = $_GET['id'];

$opts = [
    "http" => [
        "method" => "GET",
        "header" => "Content-Type: application/x-www-form-urlencoded; charset=UTF-8\r\n" .
            "Referer: https://en1.y2mate.is/\r\n"
    ]
];
$context = stream_context_create($opts);

$res = file_get_contents("https://srvcdn15.2convert.me/api/json?url=https://www.youtube.com/watch?v=$id", false, $context);
$res = json_decode($res);
$videos = $res->formats->video;
foreach($videos as $video) {
    if(!$video->needConvert) {
        header('location:' . $video->url);
        die('');
    }
}
$url = $res->formats->video[0]->url;
header('location:' . $url);