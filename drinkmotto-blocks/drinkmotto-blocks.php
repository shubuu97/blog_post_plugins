<?php
/**
 * Plugin Name: Motto Buy Now
 * Plugin URI: https://github.com/a8cteam51/drinkmotto/
 * Description: Adds a Buy Now button-style link to Motto projects.
 * Author: WordPress Special Products Team
 * Author URI: https://github.com/a8cteam51/drinkmotto/
 * Version: 1.0.0
 * License: GPL2+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
 *
 */


// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'src/init.php';
