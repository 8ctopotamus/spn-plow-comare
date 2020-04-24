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

add_action( 'admin_footer', 'spn_custom_toolbar_actions' );
function spn_custom_toolbar_actions() { ?>
  <script type="text/javascript">
		jQuery("li#wp-admin-bar-import-plows .ab-item").on('click', function() {
      const confirmation = confirm('You are about to overwrite all plows.');
      jQuery(this).text('Importing... please be patient 😁')
			jQuery.post(
				'<?php echo esc_url( admin_url('admin-post.php') ); ?>',
				{ 
          action: 'spn_plow_compare_actions',
          do: 'upload_plow_data',
				},
				function(response) {
					const res = JSON.parse(response)
					console.log(res)
					if (res.status == 'success') {
            jQuery(this).text('Import Plows')
						alert(`Plows added!`)
					} else {
            jQuery(this).text('Import Plows')
						console.error(res)
						alert('Plow import failed :(')
					}
				},
			);
		});
  </script>
<?php }

