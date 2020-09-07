<?php

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