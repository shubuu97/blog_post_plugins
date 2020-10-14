/**
 * External dependencies.
 */
import {isEmpty} from 'lodash';

/**
 * Save Component.
 *
 * @param {Object} props Component props.
 *
 * @return {jsx}
 */
const Save = ({attributes}) => {

	const {
		mediaUrl,
		mediaWidth,
		mediaHeight,
		mediaAlt,
		showButton,
		buttonText,
		buttonUrl,
		buttonBottomSpacing,
		buttonLeftSpacing,
		thumbnailUrl,
		thumbnailWidth,
		thumbnailHeight
	} = attributes;

	const buttonStyle = {
		bottom: buttonBottomSpacing,
		left: buttonLeftSpacing
	};

	return (
		<div className="motto-carousel__slide">
			<div className="motto-carousel__slide-inner-container" data-thumbnail-url={thumbnailUrl}
				 data-thumbnail-width={thumbnailWidth} data-thumbnail-height={thumbnailHeight}
				 data-thumbnail-alt={mediaAlt}>
				<img src={mediaUrl} alt={mediaAlt} width={mediaWidth} height={mediaHeight}/>
				{showButton && !isEmpty(buttonText) && (
					<div style={buttonStyle} className="wp-block-button blue_button is-style-btn-with-arrow">
						<a className="wp-block-button__link" href={buttonUrl}>{buttonText}</a>
					</div>
				)}
			</div>
		</div>
	);
};

export default Save;
