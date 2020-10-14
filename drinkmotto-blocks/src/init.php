<?php
/**
 * Blocks Initializer
 *
 * Enqueue CSS/JS of all the blocks.
 *
 * @since   1.0.0
 * @package CGB
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Enqueue Gutenberg block assets for both frontend + backend.
 *
 * Assets enqueued:
 * 1. blocks.style.build.css - Frontend + Backend.
 * 2. blocks.build.js - Backend.
 * 3. blocks.editor.build.css - Backend.
 *
 * @uses {wp-blocks} for block type registration & related functions.
 * @uses {wp-element} for WP Element abstraction — structure of blocks.
 * @uses {wp-i18n} to internationalize the block's text.
 * @uses {wp-editor} for WP editor styles.
 * @since 1.0.0
 */

define( 'MOTTO_BUY_NOW_VERSION', '1.0' );

function drinkmotto_blocks_block_assets() { // phpcs:ignore
	// Register block styles for both frontend + backend.
	wp_enqueue_style(
		'drinkmotto_blocks-css', // Handle.
		plugins_url( 'dist/blocks.style.build.css', dirname( __FILE__ ) ), // Block style CSS.
		is_admin() ? array( 'wp-editor' ) : null, // Dependency to include the CSS after it.
		MOTTO_BUY_NOW_VERSION
	);

	// Register block editor script for backend.
	wp_enqueue_script(
		'drinkmotto_blocks-js', // Handle.
		plugins_url( '/dist/blocks.build.js', dirname( __FILE__ ) ), // Block.build.js: We register the block here. Built with Webpack.
		array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor' ), // Dependencies, defined above.
		MOTTO_BUY_NOW_VERSION,
		true // Enqueue the script in the footer.
	);

	// Register block editor styles for backend.
	wp_enqueue_style(
		'drinkmotto_blocks-editor-css', // Handle.
		plugins_url( 'dist/blocks.editor.build.css', dirname( __FILE__ ) ), // Block editor CSS.
		array( 'wp-edit-blocks' ), // Dependency to include the CSS after it.
		MOTTO_BUY_NOW_VERSION
	);

	// WP Localized globals. Use dynamic PHP stuff in JavaScript via `cgbGlobal` object.
	wp_localize_script(
		'drinkmotto_blocks-js',
		'mottoGlobal', // Array containing dynamic data for a JS Global.
		array(
			'pluginDirPath' => plugin_dir_path( __DIR__ ),
			'pluginDirUrl'  => plugin_dir_url( __DIR__ ),
			// Add more data here that you want to access from `cgbGlobal` object.
		)
	);

	wp_enqueue_script(
		'motto-accordion-frontend-js',
		plugins_url( 'src/blocks/accordion/assets/accordion.js', dirname( __FILE__ ) ),
		array( 'jquery' ),
		'1.0.0',
		true
	);
}

// Hook: Block assets.
add_action( 'init', 'drinkmotto_blocks_block_assets' );

