<?php

/*
 * CSV Import
 */ 
function formatPHeaders($headers) {
  return array_map(function($h) {
    return implode("_", explode( " ", strtolower(($h))));
  }, $headers);
}
 
function delete_all_plows(){
  global $wpdb;
  $post_type = 'plows';
  $result = $wpdb->query( 
    $wpdb->prepare("
        DELETE posts,pt,pm
        FROM wp_posts posts
        LEFT JOIN wp_term_relationships pt ON pt.object_id = posts.ID
        LEFT JOIN wp_postmeta pm ON pm.post_id = posts.ID
        WHERE posts.post_type = %s
      ", 
      $post_type
    )
  );
  return $result !== false;
}
 
function upload_plow_data() {
  delete_all_plows();
  $csv = plugin_dir_url( __DIR__ ) . 'data/spn_plows.csv';
  $file = fopen($csv,"r");
  $count = 0;
  $headers = [];
  while( !feof($file) ) {
    $row = fgetcsv($file);
    // set headers
    if ($count === 0) {
      $headers = formatPHeaders($row);
      $count++;
      continue; // skip to body of data
    }
    // format data for new plow post
    $args = [
      'post_title' => '',
      'post_type' => 'plows',
      'post_status' => 'publish',
    ];
    $acfData = [];
    $colCount = 0;
    foreach($row as $col) {
      $key = $headers[$colCount];
      // title
      if ($key === 'title') {
       $args['post_title'] = $col;
      } else {
        $acfData[$key] = $col;
      }
      $colCount++;
    }
    // create new plow post
    $newPostId = wp_insert_post( $args );
    foreach($acfData as $key => $val) {
      // blade_thickness and blade_cutting_edge_thickness: convert decimal to fraction (text field)
      update_field($key, $val, $newPostId);
    }
    $count++;
  }
  fclose($file);
  echo json_encode(['status' => true]);
  exit();
}