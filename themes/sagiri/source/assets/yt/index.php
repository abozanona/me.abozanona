<?php
$id = $_GET['id'];

$res = file_get_contents("https://yt2html5.com/?id=$id");
$res = json_decode($res);

$url = $res->data->player_response->streamingData->formats[0]->url;

header('location:' . $url);