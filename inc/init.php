<?php

// routes
add_action( 'admin_post_nopriv_spn_plow_compare_actions', 'spn_plow_compare_actions' );
add_action( 'admin_post_spn_plow_compare_actions', 'spn_plow_compare_actions' );
function spn_plow_compare_actions() {
  include( plugin_dir_path( __DIR__ ) . 'inc/api-router.php' );
}

// Shortcode Scripts+styles
add_action( 'wp_enqueue_scripts', 'spn_plow_compare_load_shortcode_resources' );
function spn_plow_compare_load_shortcode_resources() {
	global $post, $wpdb;
	
  wp_register_style( 'animate_css', '//cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css' );

	if (in_array($_SERVER['REMOTE_ADDR'], array('127.0.0.1', '::1'))) {
    $react_app_js = 'http://localhost:3000/static/js/bundle.js';
  } else {
		// production
    $jsBundle = glob(plugin_dir_path( __DIR__ ) . "client/build/static/js/*.js");
    if (!empty($jsBundle)) {        
      $jsPathParts = explode(PLUGIN_SLUG, $jsBundle[0]);
      $react_app_js = site_url() . '/wp-content/plugins/' . PLUGIN_SLUG . $jsPathParts[1];
    }
  }

	wp_register_script( 'spn_plow_compare_react_app', $react_app_js, array(), false, true );

	// check if shorcode is used
	$shortcode_found = false;
	if (has_shortcode($post->post_content, 'spn-plow-compare') ) {
		 $shortcode_found = true;
	} else if ( isset($post->ID) ) { // checks post meta
		$result = $wpdb->get_var( $wpdb->prepare(
			"SELECT count(*) FROM $wpdb->postmeta " .
			"WHERE post_id = %d and meta_value LIKE '%%spn-plow-compare%%'", $post->ID ) );
		$shortcode_found = ! empty( $result );
	}
	
	if ( $shortcode_found ) {
		wp_enqueue_style('animate_css');

		$allPlows = spn_get_plow_data();

		$plowTypes = array_unique(array_map(function($p) {
			return $p->acf['plow_type'];
		}, $allPlows));

		$sticky = [];
		$nonSticky = [];

		$manufacturers = [];
		$bladeWidths = [];

		foreach($allPlows as $p) {
			if ($p->plow_categories) {
				foreach( $p->plow_categories as $pCat) {
					if (!in_array($pCat, $manufacturers)) {
						$manufacturers[] = $pCat;
					}
					if ($p->acf['blade_width_expanded']) {
						$bladeWidths[] = (int)$p->acf['blade_width_expanded'];
					}
				}
			}
			// sort the plow
			if ($p->acf['sticky']) {
				$sticky[] = $p;
			} else {
				$nonSticky[] = $p;
			}
		}

		shuffle($nonSticky);
		$allPlows = array_merge($sticky, $nonSticky);		

		$truck_size = array_unique(array_map(function($size) {
			return $size->name;
		}, get_terms('truck_size')));
		
		wp_localize_script( 'spn_plow_compare_react_app', 'wp_data', [
			'plows' => $allPlows,
			'controls' => [
				'truck_size' => $truck_size,
				'plow_type' => $plowTypes,
				'blade_width_expanded' => $bladeWidths,
				'manufacturers' => $manufacturers,
			],
      'site_url' => site_url(),
      'admin_ajax_url' => esc_url( admin_url('admin-post.php')),
    ] );
		wp_enqueue_script( 'spn_plow_compare_react_app' );
	}
}






// show products from 2 cats on product_cat archives
function spn_compare_archive($query) {
	$plows = $_GET['plows'];
	if ( !is_admin() && is_post_type_archive( 'plows' ) && !empty($plows) && $query->is_main_query()) {
    $queryParams = explode(' ', $plows);

    // $taxArray = [];

    // forEach($queryParams as $param) {
    //   array_push($taxArray , array(
    //      'taxonomy' => 'product_cat',
    //      'field' => 'slug',
    //      'terms' => $param
    //     )
    //   );
    // }

    // // add relation to inclusivly filter multiple cats
    // $taxArray['relation'] = 'AND';

    // $query->set('tax_query', $taxArray);
  }
}
add_action('pre_get_posts','spn_compare_archive');