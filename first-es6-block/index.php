<?php
/**
 * Plugin Name: First ES6 Block
 * Version: 1.0.0
 * Description: This is my first Gutenberg Block in ES6
 * Author: Shubham Chitransh
 *
 * @package first-es6-block
 */

 function my_custom_block() {
	wp_register_script(
		"first-es6-block-editor",
		plugins_url("build/index.js", __FILE__),
		array("wp-blocks", "wp-element", "wp-editor"),
		filemtime(plugin_dir_path(__FILE__) . "build/index.js")
	);

	wp_register_style(
		"first-es6-block-style",
		plugins_url("src/style.css", __FILE__),
		array(),
		filemtime(plugin_dir_path(__FILE__ . "src/style.css"))
	);

	wp_register_style(
		"first-es6-block-editor-style",
		plugins_url("src/editor.css", __FILE__, ),
		array("wp-edit-blocks"),
		filemtime(plugin_dir_path(__FILE__ . "src/editor.css"))
	);

	register_block_type("first-es6-block/test-block", array(
		"style" => "first-es6-block-style",
		"editor_style" => "first-es6-block-editor-style",
		"editor_script"=> "first-es6-block-editor"
	));
 }

 add_action("init", "my_custom_block");