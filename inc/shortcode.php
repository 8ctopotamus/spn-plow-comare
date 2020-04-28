<?php
// shortcode
function spn_plow_compare_shortcode( $atts ) {
	return '<div id="root"></div>';
}
add_shortcode( 'spn-plow-compare', 'spn_plow_compare_shortcode' );