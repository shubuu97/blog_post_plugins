/**
 * WordPress dependencies.
 */
import {__} from '@wordpress/i18n';
import {InspectorControls, InnerBlocks, BlockControls} from '@wordpress/block-editor';
import {
	ToggleControl,
	SelectControl,
	Panel,
	PanelBody,
	BaseControl,
	ToolbarGroup,
	ToolbarButton,
	Button
} from '@wordpress/components';
import {withSelect, withDispatch} from '@wordpress/data';
import {compose} from '@wordpress/compose';
import {useState, useEffect} from '@wordpress/element';

/**
 * External dependencies.
 */
import {first, isEmpty} from 'lodash';
import classnames from 'classnames';

/**
 * Internal dependencies.
 */
import './style.scss';
import Navigation from './navigation';
import Thumbnails from './thumbnails';

/**
 * Child block name.
 *
 * @type {string}
 */
const CHILD_BLOCK_NAME = 'motto/carousel-slide';

/**
 * Carousel Styles.
 *
 * @type {Object}
 */
const carouselStyles = {
	'styleOne': {
		key: 'motto-carousel-style-1',
		label: __('Style 1', 'motto')
	},
	'styleTwo': {
		key: 'motto-carousel-style-2',
		label: __('Style 2 ( with thumbnails )', 'motto')
	}
};

/**
 * Edit Component.
 *
 * @param {Object} props Component props.
 *
 * @return {jsx}
 */
const Edit = (props) => {
	const [expanded, updateExpandState] = useState(false);

	const {clientId, getInnerBlocks, updateBlockAttributes, attributes, setAttributes, className} = props;
	const {showButton, style, currentSlideIndex} = attributes;
	const innerBlocks = getInnerBlocks(clientId) || [];
	const slideCount = innerBlocks.length;

	const containerClasses = classnames(
		'motto-carousel',
		style,
		className,
		{
			'motto-carousel--expanded': expanded
		}
	);

	/**
	 * Get all inner block carousel slide images.
	 *
	 * @return {array}
	 */
	const getCarouselImages = () => {
		const images = [];

		innerBlocks.forEach((innerBlock) => {
			if (CHILD_BLOCK_NAME === innerBlock.name) {
				const mediaUrl = innerBlock.attributes.mediaUrl || '';
				images.push(mediaUrl);
			}
		});

		return images;
	};

	/**
	 * Toggle show button.
	 *
	 * @return {void}
	 */
	const toggleShowButton = () => {
		innerBlocks.forEach((innerBlock) => {
			updateBlockAttributes(innerBlock.clientId, {
				showButton: !showButton
			});
		});

		setAttributes({showButton: !showButton});
	};

	/**
	 * Move to certain slide.
	 *
	 * @param {int} index Slide index.
	 *
	 * @return {void}
	 */
	const moveTo = (index) => {
		if (0 <= index && index < slideCount) {
			setAttributes({
				currentSlideIndex: index
			});
		}
	};

	useEffect(() => moveTo(currentSlideIndex), [currentSlideIndex]);

	const carouselImages = getCarouselImages();

	return (
		<div data-active-slide={currentSlideIndex} className={containerClasses}>
			<div className="motto-carousel__slides">
				<InnerBlocks
					template={[[CHILD_BLOCK_NAME]]}
					allowedBlocks={[CHILD_BLOCK_NAME]}
				/>
				{!isEmpty(carouselImages) && (
					<Navigation
						getInnerBlocks={() => getInnerBlocks(clientId)}
						slideCount={slideCount}
						currentSlideIndex={currentSlideIndex}
						moveTo={moveTo}
					/>
				)}
			</div>

			<BlockControls>
				<ToolbarGroup>
					<Button onClick={() => updateExpandState(!expanded)}>
						{expanded ? __('Collapse', 'motto') : __('Expand', 'motto')}
					</Button>
				</ToolbarGroup>
			</BlockControls>

			<InspectorControls>
				<Panel>
					<PanelBody title={__('Carousel Settings', 'motto')} initialOpen={true}>
						<BaseControl>
							<SelectControl
								label={__('Carousel Style', 'motto')}
								value={style}
								options={[
									{label: carouselStyles.styleOne.label, value: carouselStyles.styleOne.key},
									{label: carouselStyles.styleTwo.label, value: carouselStyles.styleTwo.key}
								]}
								onChange={(selection) => setAttributes({style: selection})}
							/>
						</BaseControl>
						<BaseControl>
							<ToggleControl
								label={__('Show Button', 'motto')}
								checked={showButton}
								onChange={toggleShowButton}
							/>
						</BaseControl>
					</PanelBody>
				</Panel>
			</InspectorControls>

			{(carouselStyles.styleTwo.key === style) && !isEmpty(carouselImages) && (
				<Thumbnails
					carouselImages={carouselImages}
					moveTo={moveTo}
					currentSlideIndex={currentSlideIndex}
				/>
			)}
		</div>
	);
};

const applyWithSelect = withSelect((select) => ({
	getInnerBlocks: (clientId) => first(select('core/block-editor').getBlocksByClientId(clientId)).innerBlocks
}));

const applyWithDispatch = withDispatch((dispatch) => ({
	updateBlockAttributes: dispatch('core/block-editor').updateBlockAttributes
}));

export default compose(applyWithSelect, applyWithDispatch)(Edit);
