/**
 * BLOCK: Accordion
 *
 */

import "./style.scss";
import "./editor.scss";
import {__} from '@wordpress/i18n';
import {registerBlockType} from '@wordpress/blocks';

import {
	RichText,
	PlainText,
	MediaPlaceholder,
} from '@wordpress/block-editor';

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
registerBlockType("motto/accordion", {
	title: __("Motto Accordion"),
	icon: "excerpt-view",
	category: "common",
	keywords: [__("Accordion"), __("motto")],

	attributes: {
		id: {
			source: "attribute",
			selector: "div.accordion-container",
			attribute: "id",
		},
		accordions: {
			source: "query",
			default: [],
			selector: ".accordion",
			query: {
				index: {
					source: "text",
					selector: "span.accordion-index",
				},
				content: {
					source: "text",
					selector: "div.accordion-panel div",
				},
				title: {
					source: "text",
					selector: "span.accordion-title",
				},
				img_alt: {
					type: 'string',
					source: 'attribute',
					selector: 'img',
					attribute: 'alt',
					default: ''
				},
				img_url: {
					type: 'string',
					source: 'attribute',
					selector: 'img',
					attribute: 'src'
				},
			},
		},
	},

	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	edit: (props) => {
		const {accordions} = props.attributes;

		if (!props.attributes.id) {
			const id = `accordion${Math.floor(Math.random() * 100)}`;
			props.setAttributes({
				id,
			});
		}

		const removeImage = () => {
			props.setAttributes({
				index: null,
				img_url: '',
				img_alt: ''
			});
		};

		const accordionsList = accordions
			.sort((a, b) => a.index - b.index)
			.map((accordion) => {
				return (
					<div className="accordion">
						<div className="accordion-item">
							<h3 className="accordion__heading">
								<button
									aria-expanded="false"
									className="accordion-trigger"
									aria-controls={"sect" + accordion.index}
									id={"accordion" + accordion.index + "id"}>

									<PlainText
										className="title-plain-text"
										placeholder="Accordion title..."
										value={accordion.title}
										onChange={(title) => {
											const newObject = Object.assign({}, accordion, {
												title,
											});
											props.setAttributes({
												accordions: [
													...accordions.filter(
														(item) => item.index !== accordion.index
													),
													newObject,
												],
											});
										}}
									/>
									<span className="accordion-icon"></span>

								</button>
							</h3>
							<div id={"sect" + accordion.index}
								 role="region"
								 aria-labelledby={"accordion" + accordion.index + "id"}
								 className="accordion-panel">
								<RichText
									className="content-plain-text"
									style={{height: 58}}
									placeholder="Accordion content..."
									value={accordion.content}
									autoFocus
									onChange={(content) => {
										const newObject = Object.assign({}, accordion, {
											content,
										});
										props.setAttributes({
											accordions: [
												...accordions.filter(
													(item) => item.index !== accordion.index
												),
												newObject,
											],
										});
									}}
								/>
								{accordion.img_url ? (
									<img
										src={accordion.img_url}
										alt={accordion.img_alt}
										className={accordion.index ? `wp-image-${accordion.index}` : null}
									/>
								) : (
									<MediaPlaceholder
										icon='format-image'
										onSelect={(media) => {
											const newObject = Object.assign({}, accordion, {
												img_url: media.sizes.full.url,
												img_alt: media.alt
											});
											props.setAttributes({
												accordions: [
													...accordions.filter(
														(item) => item.index !== accordion.index
													),
													newObject,
												],
											});
										}}
										allowedTypes={['image']}
										className={accordion.index ? `wp-image-${accordion.index}` : null}
									/>
								)}
							</div>
						</div>
						<div className="motto-accordion--button-container--inner">
							<button
								className="remove-accordion"
								onClick={() => {
									const newAccordions = accordions
										.filter((item) => item.index !== accordion.index)
										.map((t) => {
											if (t.index > accordion.index) {
												t.index -= 1;
											}

											return t;
										});

									props.setAttributes({
										accordions: newAccordions,
									});
								}}
							>
								<span className="dashicons dashicons-remove"></span>
							</button>
						</div>
					</div>
				);
			});
		return (
			<div className={props.className}>
				{accordionsList}
				<div className="motto-accordion--button-container">
					<button
						className="add-more-accordion"
						onClick={(content) =>
							props.setAttributes({
								accordions: [
									...props.attributes.accordions,
									{
										index: props.attributes.accordions.length,
										content: "",
										title: "",
									},
								],
							})
						}
					>
						<span className="dashicons dashicons-insert"></span>
					</button>
				</div>
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
	 */
	save: (props) => {
		const {id, accordions} = props.attributes;

		const accordionsList = accordions.map(function (accordion) {
			let class_name = `wp-image-${accordion.index}`;
			return (
				<div className="accordion">
						<span className="accordion-index" style={{display: "none"}}>
							{accordion.index}
						</span>
					<h3 className="accordion__heading">
						<button aria-expanded="true" className="accordion-trigger"
								aria-controls={"sect" + id + accordion.index}
								id={"accordion" + id + accordion.index + "id"}>
							{accordion.title && (
								<span className="accordion-title accordion__title">
										{accordion.title}
									<span className="accordion-icon"></span>
									</span>
							)}
						</button>
					</h3>
					<div id={"sect" + id + accordion.index}
						 role="region"
						 aria-labelledby={"accordion" + id + accordion.index + "id"}
						 className="accordion-panel">
						<div>
							{accordion.content}
							{accordion.img_url && (
								<img
									src={accordion.img_url}
									alt={accordion.img_alt}
									className={class_name}
								/>
							)}
						</div>
					</div>
				</div>
			);
		});
		if (accordions.length > 0) {
			return (
				<div className="accordion-container" id={id} data-allow-toggle data-allow-multiple>
					{accordionsList}
				</div>

			);
		} else return null;
	},
});
