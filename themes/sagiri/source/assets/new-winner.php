<?php

if (isset($_GET['name'])) {
    file_put_contents('winners.out', $_GET['name'] . ".key\n", FILE_APPEND);
} else if (isset($_GET['list'])) {
    header('Content-Type:text/plain');
    echo file_get_contents('winners.out');
} else if (isset($_GET['opened'])) {
    $cnt = file_get_contents('opened-count.out');
    $cnt = intval($cnt);
    $cnt++;
    file_put_contents('opened-count.out', $cnt);
} else {
    http_response_code(404);
}
