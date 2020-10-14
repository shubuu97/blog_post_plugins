/**
 * WordPress dependencies.
 */
import {__} from '@wordpress/i18n';
import {MediaPlaceholder, InspectorControls, BlockControls} from '@wordpress/block-editor';
import {RangeControl, Panel, PanelBody, ToolbarGroup, Button as BlockControlButton} from '@wordpress/components';
import {withInstanceId, compose} from '@wordpress/compose';
import {withSelect, withDispatch} from '@wordpress/data';
import {useEffect} from '@wordpress/element';
import React, {Fragment} from 'react'

/**
 * Internal dependencies.
 */
import Button from './../../../components/button';
import './style.scss';

/**
 * External dependencies.
 */
import classNames from 'classnames';
import {isUndefined, isArray, last, isEmpty} from 'lodash';

/**
 * Edit Component.
 *
 * @param {Object} props Component props.
 *
 * @return {jsx}
 */
const Edit = ({attributes, setAttributes, isSelected, canShowButton, currentSlideIndex, updateSlideIndex, slideCount}) => {
	const {
		mediaUrl,
		mediaId,
		mediaAlt,
		buttonBottomSpacing,
		buttonLeftSpacing,
		showButton,
	} = attributes;

	/**
	 * Update media.
	 *
	 * @param {Object} media Media object.
	 *
	 * @return {void}
	 */
	const updateMedia = (media) => {
		setAttributes({
			mediaUrl: media.url || '',
			mediaId: media.id || '',
			mediaWidth: media.width || '',
			mediaHeight: media.height || '',
			mediaAlt: media.alt || media.title || '',
			thumbnailUrl: media.sizes ? media.sizes.thumbnail.url : '',
			thumbnailWidth: media.sizes ? media.sizes.thumbnail.width : '',
			thumbnailHeight: media.sizes ? media.sizes.thumbnail.height : ''
		});
	};

	const mediaPlaceholder = (<MediaPlaceholder
		onSelect={updateMedia}
		allowedTypes={['image']}
		multiple={false}
		labels={{title: __('Slide Image', 'motto')}}
	/>);

	/**
	 * On slide mount and unmount
	 */
	useEffect(() => {

		// If new slide was added.
		if ((currentSlideIndex + 1) === slideCount) {
			updateSlideIndex(currentSlideIndex);
		}

		// If slide was removed move back to the previous slide.
		return () => {
			updateSlideIndex(currentSlideIndex - 1);
		};
	}, []);

	useEffect(() => {
		setAttributes({
			showButton: canShowButton
		});
	}, [canShowButton]);

	useEffect(() => {
		setAttributes({
			id: currentSlideIndex
		});
	}, [currentSlideIndex]);

	const slideHasImageClass = mediaUrl ? 'motto-carousel__slide-has-image' : '';

	return (
		<div className={classNames('motto-carousel__slide', slideHasImageClass)}>
			<div className="motto-carousel__slide-inner-container">
				{mediaId ? (
					<Fragment>
						<img src={mediaUrl} alt={mediaAlt}/>
						{showButton && (
							<Button
								attributes={attributes}
								setAttributes={setAttributes}
								isSelected={isSelected}
								config={{
									wrapper: {
										className: 'wp-block-button blue_button is-style-btn-with-arrow',
										style: {
											bottom: `${buttonBottomSpacing}px`,
											left: `${buttonLeftSpacing}px`
										}
									},
									RichText: {
										className: 'wp-block-button__link motto-carousel__cta-button'
									}
								}}
							/>
						)}
					</Fragment>
				) : (mediaPlaceholder)}

				{!isEmpty(mediaUrl) && (
					<BlockControls>
						<ToolbarGroup>
							<BlockControlButton onClick={() => updateMedia({})}>
								{__('Remove', 'motto')}
							</BlockControlButton>
						</ToolbarGroup>
					</BlockControls>
				)}

				{showButton && (
					<InspectorControls>
						<Panel>
							<PanelBody title={__('Button bottom Spacing', 'motto')} initialOpen={true}>
								<RangeControl
									label={__('Button bottom Spacing', 'motto')}
									value={buttonBottomSpacing}
									onChange={(spacing) => setAttributes({buttonBottomSpacing: spacing})}
									min={0}
									max={150}
								/>
								<RangeControl
									label={__('Button Left Spacing', 'motto')}
									value={buttonLeftSpacing}
									onChange={(spacing) => setAttributes({buttonLeftSpacing: spacing})}
									min={0}
									max={150}
								/>
							</PanelBody>
						</Panel>
					</InspectorControls>
				)}
			</div>
		</div>
	);
};

const applyWithSelect = withSelect((select, props) => {
	const {clientId, instanceId} = props;

	const getBlockAttributes = select('core/block-editor').getBlockAttributes;
	const getBlockParents = select('core/block-editor').getBlockParents;
	const getBlocks = select('core/block-editor').getBlocks;

	// When the block is used inside a columns block, the client ids are received as an array else string.
	let parentBlockClientIds = getBlockParents(clientId);

	const parentBlockClientId = isArray(parentBlockClientIds) ? last(parentBlockClientIds) : parentBlockClientIds;
	const parentBlockAttributes = getBlockAttributes(parentBlockClientId);
	const canShowButton = (parentBlockAttributes && !isUndefined(parentBlockAttributes.showButton)) ? parentBlockAttributes.showButton : true;

	/**
	 * InstanceId is not reliable for slide index.
	 */
	let currentSlideIndex = instanceId;
	let slideCount = 0;

	if (parentBlockClientId) {
		const slides = getBlocks(parentBlockClientId);

		if (slides && slides.length) {
			slideCount = slides.length;

			slides.forEach((slide, index) => {
				if (clientId === slide.clientId) {
					currentSlideIndex = index;
				}
			});
		}
	}

	return {
		canShowButton,
		currentSlideIndex,
		parentBlockClientId,
		slideCount
	};
});

const applyWithDispatch = withDispatch((dispatch, props) => {
	const {parentBlockClientId} = props;

	/**
	 * Update slide index.
	 *
	 * @param {int} slideIndex Slide index.
	 *
	 * @return {void}
	 */
	const updateSlideIndex = (slideIndex) => {
		if (parentBlockClientId) {
			dispatch('core/block-editor').updateBlockAttributes(parentBlockClientId, {
				currentSlideIndex: slideIndex
			});
		}
	};

	return {
		updateSlideIndex
	};
});

export default compose(applyWithSelect, applyWithDispatch)(withInstanceId(Edit));
