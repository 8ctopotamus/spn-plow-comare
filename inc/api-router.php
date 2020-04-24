<?php

$do = $_POST['do'];

if ( empty( $do ) ) {
  echo '[cCrest Media Repo] No action specified. :(';
  http_response_code(400);
  wp_die();
}

$do();

wp_die();
