<?php

function spn_custom_posttypes() {
  register_post_type('plows', array(
    'label' => __('Plows'),
    'singular_label' => __('Plow'),
    'public' => true,
    'show_ui' => true,
    'capability_type' => 'post',
    'hierarchical' => false,
    'rewrite' => array('slug' => 'plows'),
    'supports' => array('title', 'editor', 'thumbnail'),
  ));
  
  // Register the taxonomy
  // Todo: Refactor to "Manufacturers"
  register_taxonomy( 'plow_categories', 
    array(0 => 'plows'),
    array(
    'show_in_rest' => true, /* Required to expose to WP-JSON API */
    'rest_base'=> 'plow-categories', /* Required to expose to WP-JSON API */
    'rest_controller_class' => 'WP_REST_Terms_Controller', /* Required to expose to WP-JSON API */
    'hierarchical' => true,
      'label' => 'Plow Categories',
      'show_ui' => true,
      'query_var' => true,
      'show_admin_column' => false,
      'labels' => array (
        'search_items' => 'Plow Category',
        'popular_items' => '',
        'all_items' => 'View All',
        'parent_item' => 'Choose Parent',
        'parent_item_colon' => '',
        'edit_item' => 'Edit Item',
        'update_item' => 'Update Item',
        'add_new_item' => 'Add New',
        'new_item_name' => 'New Item Name',
        'separate_items_with_commas' => '',
        'add_or_remove_items' => 'Add or Remove',
        'choose_from_most_used' => '',
      )
    )
  );

  register_taxonomy( 'truck_size', 
    array(0 => 'plows'),
    array(
      'show_in_rest' => true, /* Required to expose to WP-JSON API */
      'rest_base'=> 'truck-size', /* Required to expose to WP-JSON API */
      'rest_controller_class' => 'WP_REST_Terms_Controller', /* Required to expose to WP-JSON API */
      'hierarchical' => true,
      'label' => 'Truck Sizes',
      'show_ui' => true,
      'query_var' => true,
      'show_admin_column' => false,
      'labels' => array (
        'search_items' => 'Truck Size',
        'popular_items' => '',
        'all_items' => 'View All',
        'parent_item' => 'Choose Parent',
        'parent_item_colon' => '',
        'edit_item' => 'Edit Item',
        'update_item' => 'Update Item',
        'add_new_item' => 'Add New',
        'new_item_name' => 'New Item Name',
        'separate_items_with_commas' => '',
        'add_or_remove_items' => 'Add or Remove',
        'choose_from_most_used' => '',
      )
    )
  );
}
add_action('init', 'spn_custom_posttypes');