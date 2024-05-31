<?php

namespace BlueBench;

function enqueue_theme_assets() {
	\wp_enqueue_style(
		'blue-bench-co/style',
		\get_stylesheet_uri()
	);
}
\add_action( 'wp_enqueue_scripts', __NAMESPACE__ . '\\enqueue_theme_assets' );

function enqueue_editor_assets() {
	\add_editor_style(\get_parent_theme_file_uri('style.css'));
}
\add_action( 'after_setup_theme', __NAMESPACE__ . '\\enqueue_editor_assets' );

function enqueue_editor_scripts() {
	$assets = require_once 'build/index.asset.php';
	\wp_enqueue_script(
		'blue-bench-co/editor-script',
		\get_parent_theme_file_uri('build/index.js'),
		$assets['dependencies'],
		$assets['version']
	);
}
\add_action( 'enqueue_block_editor_assets', __NAMESPACE__ . '\\enqueue_editor_scripts' );
