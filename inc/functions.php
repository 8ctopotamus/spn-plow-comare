<?php

function spn_get_plow_data() {
  $data = [];
  // assets
  $args = [
    'post_type'  => 'plows',
    'posts_per_page' => -1,
  ];
  $the_query = new WP_Query( $args );
  if ( $the_query->have_posts() ) {
    while ( $the_query->have_posts() ) {
      $the_query->the_post();
      $p = get_post();
      $p->categories = [];
      $p->acf = get_fields();
      $data[] = $p;
    }
  }
  wp_reset_postdata();
  return $data;
  exit;
}

/*
 * CSV Import
 */ 

function spn_get_attachement_id($key, $val, $id) {
  $imgUrlParts = explode('/', $val);
  $imgFileName = $imgUrlParts[count($imgUrlParts) - 1];
  $foundId = false;
  $media_query = new WP_Query(
    array(
      'post_type' => 'attachment',
      'post_status' => 'inherit',
      'posts_per_page' => -1,
    )
  );
  foreach ($media_query->posts as $post) {
    if (strpos($val, $post->post_title) !== false) {
      $foundId = $post->ID;
      break;
    }
  }
  return $foundId;
}

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
  $csv = plugin_dir_url( __DIR__ ) . 'data/plows.csv';
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
      // ToDo: blade_thickness and blade_cutting_edge_thickness: convert decimal to fraction (text field)
      update_field($key, $val, $newPostId);
    }

    // Note for later: Example of populating images fields
    // foreach($acfData as $key => $val) {
    //   $acfField = acf_get_field($key);
    //   if ($acfField['type'] === 'image' || $acfField['type'] === 'file') {
    //     $found = advctrls_get_attachement_id($key, $val, $newPostId);
    //     if ($found) {
    //       $val = $found;
    //     }
    //   }
    //   update_field($key, $val, $newPostId);
    // }

    $count++;
  }
  fclose($file);
  echo json_encode(['success' => true]);
  exit();
}