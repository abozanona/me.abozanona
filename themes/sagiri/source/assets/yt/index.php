<?php
$id = $_GET['id'];

$ch = curl_init();

$url = curl_escape($ch, "https://www.youtube.com/watch?v=$id");

curl_setopt($ch, CURLOPT_URL, "https://154.82.111.112.sslip.io/newp");
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt(
    $ch,
    CURLOPT_POSTFIELDS,
    "c=PS&u=$url"
);
curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/x-www-form-urlencoded'));


// receive server response ...
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$res = curl_exec($ch);

curl_close($ch);
$res = json_decode($res);
// further processing ....
// echo stream_get_contents(fopen('http://example.com/', "rb"));
header('location:' . "https://154.82.111.112.sslip.io" . $res->data->mp3);
