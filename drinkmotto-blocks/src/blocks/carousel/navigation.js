/**
 * WordPress dependencies.
 */
import {__} from '@wordpress/i18n'
import React, {Fragment} from 'react'

/**
 * Navigation Component.
 *
 * @param {Object} props Component props.
 *
 * @return {jsx}
 */
const Navigation = (props) => {

	const {getInnerBlocks, currentSlideIndex, moveTo, slideCount} = props;

	const innerBlocks = getInnerBlocks();
	const bullets = [];

	const moveBack = () => {
		const newId = currentSlideIndex - 1;
		moveTo(newId);
	};

	const moveNext = () => {
		const newId = currentSlideIndex + 1;
		moveTo(newId);
	};

	if (slideCount) {
		innerBlocks.forEach((innerBlock, index) => {
			const slideNumber = index + 1;
			const bulletClass = currentSlideIndex === index ? 'motto-carousel__active-bullet' : '';

			bullets.push((
				<li key={`bullet-${index}`} onClick={() => moveTo(index)} className={bulletClass}>
					<a>{slideNumber}</a>
				</li>
			));
		});
	}

	return (
		<Fragment>
			<a onClick={moveBack} className="motto-carousel__prev-button">
				{__('Previous', 'motto')}
			</a>
			<a onClick={moveNext} className="motto-carousel__next-button">
				{__('Next', 'motto')}
			</a>
			<ul className="motto-carousel__bullets">
				{bullets}
			</ul>
		</Fragment>
	);
};

export default Navigation;
