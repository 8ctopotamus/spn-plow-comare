<?php
// function spn_plow_compare_enqueue_scripts_styles() {}
// add_action('wp_enqueue_scripts', 'spn_plow_compare_enqueue_scripts_styles');

// routes
add_action( 'admin_post_nopriv_spn_plow_compare_actions', 'spn_plow_compare_actions' );
add_action( 'admin_post_spn_plow_compare_actions', 'spn_plow_compare_actions' );
function spn_plow_compare_actions() {
  include( plugin_dir_path( __DIR__ ) . 'inc/api-router.php' );
}

// Admin Toolbar buttons
add_action('admin_bar_menu', 'add_item', 100);
function add_item( $admin_bar ){
  global $pagenow;
	$admin_bar->add_menu( array( 'id'=>'import-plows','title'=>'Import Plows','href'=>'#' ) );
}
// Admin Toolbar buttons events
add_action( 'admin_footer', 'spn_custom_toolbar_actions' );
function spn_custom_toolbar_actions() { ?>
  <script type="text/javascript">
		jQuery("li#wp-admin-bar-import-plows .ab-item").on('click', function() {
			const confirmation = confirm('You are about to overwrite all plows.');
			$btn = jQuery(this);
      $btn.text('Importing... please be patient 😁')
			jQuery.post(
				'<?php echo esc_url( admin_url('admin-post.php') ); ?>',
				{ 
					action: 'spn_plow_compare_actions',
					do: 'upload_plow_data',
				},
				function(response) {
					console.log(response)
					const res = JSON.parse(response)
					if (res && res.success === true) {
						console.log(res)
            $btn.text('Plows imported 👍')
					} else {
						$btn.text('Import Plows')
						console.log(response)
						alert('Plow import failed :(')
					}
				},
			);
		});
  </script>
<?php }


// Shortcode Scripts+styles
add_action( 'wp_enqueue_scripts', 'spn_plow_compare_load_shortcode_resources' );
function spn_plow_compare_load_shortcode_resources() {
	global $post, $wpdb;
	
	// localhost
	if (in_array($_SERVER['REMOTE_ADDR'], array('127.0.0.1', '::1'))) {
		$app_js = 'http://localhost:3000/static/js/bundle.js';
	} 
	// production - load compiled react app
	else {
		// load built react app here
		$compiledReactApp = preg_grep('~^main.*\.js$~', scandir(plugin_dir_path( __DIR__ ) . "client/build/static/js"));
		$app_js = plugin_dir_path( __DIR__ ) .'client/build/static/js/' . $compiledReactApp[2];
	}

	wp_register_script( 'spn_plow_compare_react_app', $app_js, array(), false, true );

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
		$allPlows = spn_get_plow_data();
		$allManufacturers = spn_get_manufacturers_data();

		$plowTypes = array_unique(array_map(function($p) {
			return $p->acf['plow_type'];
		}, $allPlows));

		$manufacturers = array_unique(array_map(function($p) {
			return $p->plow_categories[0]->slug;
		}, $allPlows));

		wp_localize_script( 'spn_plow_compare_react_app', 'wp_data', [
			'plows' => $allPlows,
			'controls' => [
				'plow_type' => $plowTypes,
				'manufacturers' => $manufacturers,
				'blade_width_expanded' => $bladeWidths,
			],
      'site_url' => site_url(),
      'admin_ajax_url' => esc_url( admin_url('admin-post.php')),
    ] );
		wp_enqueue_script( 'spn_plow_compare_react_app' );
	}
}