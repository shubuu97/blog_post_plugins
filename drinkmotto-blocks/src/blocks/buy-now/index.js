/**
 * BLOCK: moto-buy-now
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './editor.scss';
import './style.scss';

import {__} from '@wordpress/i18n';
import {registerBlockType} from '@wordpress/blocks';

import {Fragment} from '@wordpress/element';

import {
	BlockControls,
	URLInput,
	URLPopover
} from '@wordpress/block-editor';

import {
	IconButton,
	TextControl
} from '@wordpress/components';

/**
 * Register: a Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType('motto/buy-now', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __('Buy Now'), // Block title.
	description: __('Prompt visitors to Buy Now.'),
	icon: 'button', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__('Motto Buy Now'),
		__('button'),
		__('buy now'),
		__('buy'),
		__('Amazon'),
	],
	supports: {
		html: false,
		customClassName: false,
	},
	attributes: {
		url: {
			type: 'string',
			source: 'attribute',
			selector: 'a',
			attribute: 'href',
			default: '',
		},
	},


	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 *
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Component.
	 */
	edit: (props) => {
		const {
			attributes: {
				url
			},
			className,
			isSelected,
			setAttributes
		} = props;


		let body;

		if (isSelected) {
			body = (<Fragment>
				<form
					onSubmit={event => event.preventDefault()}>
					<a href={props.attributes.url}>
						<i>Buy now</i>
						<span></span>
					</a>
					<div className="blocks-moto-buy-now-toolbar" hidden={props.attributes.hidden}>
						<URLInput
							className="url"
							value={url}
							onChange={url => setAttributes({url})}
						/>
						<IconButton
							icon="editor-break"
							label={__('Apply', 'motto')}
							type="submit"
						/>
					</div>
				</form>
			</Fragment>);
		} else {
			body = (
				<a href={props.attributes.url}>
					<i>Buy now</i>
					<span></span>
				</a>
			)
		}

		return (
			<div className={className}>
				{body}
			</div>
		);
	},

	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 *
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Frontend HTML.
	 */
	save: (props) => {
		const {
			attributes: {
				url
			},
			className,
		} = props;

		return (
			<div className={className}>
				<a href={props.attributes.url}>
					<i>Buy now</i>
					<span></span>
				</a>
			</div>
		);
	},
});
