/**
 * Child block of carousel block.
 */

/**
 * WordPress dependencies.
 */
import {registerBlockType} from '@wordpress/blocks';
import {__} from '@wordpress/i18n';

/**
 * Internal dependencies.
 */
import settings from './block';
import Edit from './edit';
import Save from './save';

/**
 * Register block type.
 */
registerBlockType(settings.name, {

	/**
	 * Block title.
	 *
	 * @type {string}
	 */
	title: __('Carousel Slide', 'motto'),

	/**
	 * Block Description.
	 *
	 * @type {string}
	 */
	description: __('Carousel Single Slide', 'motto'),

	/**
	 * Block icons shown in editor.
	 *
	 * @type {string}
	 */
	icon: 'format-image',

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
	 * Block Wrapper attributes
	 *
	 * @param {object} attributes Block attributes.
	 *
	 * @returns {object}
	 */
	getEditWrapperProps(attributes) {
		return {'data-slide': attributes.id};
	},

	/**
	 * Parent block.
	 *
	 * @type {Object}
	 */
	parent: ['motto/carousel'],

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
	save: Save
});
