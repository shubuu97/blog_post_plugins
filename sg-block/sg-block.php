<?php

/**
 * Plugin Name: Simple Gutenberg Block
 * Plugin URI: https://simpleblock.com
 * Description: This is a Simple Gutenberg block.
 * Version: 1.0.0
 * Author: Shubham Chitransh
 *
 * @package simple-gutenberg-block
 */

 define('SG_PLUGIN_URL', plugins_url('sg-block'));
 define('SG_PLUGIN_DIR_PATH', plugin_dir_path(__FILE__));

 function gutenberg_custom_blocks() {
	 //Block UI Style
	wp_register_style(
		"sg_block_ui_style",
		SG_PLUGIN_URL . '/style.css',
		array("wp-edit-blocks"),
		filemtime(SG_PLUGIN_DIR_PATH . "style.css")
	);

	//Block Editor Style
	wp_register_style(
		"sg_block_editor_style",
		SG_PLUGIN_URL . '/editor.css',
		array("wp-edit-blocks"),
		filemtime(SG_PLUGIN_DIR_PATH . "editor.css")
	);

	wp_register_script(
		"sg-block-editor.js",
		SG_PLUGIN_URL . '/sg-block.js',
		array("wp-blocks", "wp-components", "wp-element", "wp-editor", "wp-i18n"),
		filemtime(SG_PLUGIN_DIR_PATH . "sg-block.js")
	);

	register_block_type("sg-block/simple-block", array(
		"style" => "sg_block_ui_style",
		"editor_style" => "sg_block_editor_style",
		"editor_script" => "sg-block-editor.js"
	));
 }

 add_action("init", "gutenberg_custom_blocks");