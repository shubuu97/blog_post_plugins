/**
 * Carousel block.
 *
 */

/**
 * WordPress dependencies.
 */
import {registerBlockType} from '@wordpress/blocks';
import {__} from '@wordpress/i18n';
import {InnerBlocks} from '@wordpress/block-editor';

import classnames from 'classnames';

/**
 * Internal dependencies.
 */
import './slide/index';
import Edit from './edit';
import settings from './block';

/**
 * Register block type.
 */
registerBlockType(settings.name, {

	/**
	 * Block title.
	 *
	 * @type {string}
	 */
	title: __('Carousel', 'motto'),

	/**
	 * Block Description.
	 *
	 * @type {string}
	 */
	description: __('Carousel block', 'motto'),

	/**
	 * Block icons shown in editor.
	 *
	 * @type {string}
	 */
	icon: 'images-alt2',

	/**
	 * Block Category
	 *
	 * @type {string}
	 */
	category: settings.category,

	/**
	 * Block attributes.
	 *
	 * @type {Object}
	 */
	attributes: settings.attributes,

	/**
	 * Describes the structure of the block in the context of the editor.
	 *
	 * @return {jsx} Block elements.
	 */
	edit: Edit,

	/**
	 * Defines the markup to be serialized back when a post is saved.
	 *
	 * @return {jsx}
	 */
	save(props) {

		return (
			<div className={classnames('motto-carousel-wrapper', props.attributes.style)}>
				<div className='motto-carousel'>
					<InnerBlocks.Content/>
				</div>
			</div>
		);
	}
});
