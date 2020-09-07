<?php
/*
  Plugin Name: SnowPlowNews Plow Compare
  Plugin URI:  https://github.com/8ctopotamus/spn-plow-compare
  Description: A Plow post-type and comparison
  Version:     1.0
  Author:      @8ctopotamus
  Author URI:  https://github.com/8ctopotamus
  License:     GPL2
  License URI: https://www.gnu.org/licenses/gpl-2.0.html
*/

defined( 'ABSPATH' ) or die( 'No script kiddies please!' );

define('PLUGIN_SLUG', 'spn-plow-compare');

include( plugin_dir_path( __FILE__ ) . 'inc/functions.php' );
include( plugin_dir_path( __FILE__ ) . 'inc/cpt.php' );
include( plugin_dir_path( __FILE__ ) . 'inc/init.php' );
include( plugin_dir_path( __FILE__ ) . 'inc/admin.php' );
include( plugin_dir_path( __FILE__ ) . 'inc/shortcode.php' );