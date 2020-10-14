/**
 * External dependencies.
 */
import {isEmpty} from 'lodash';

/**
 * Thumbnails Component.
 *
 * @param {Object} props Component props.
 *
 * @return {jsx}
 */
const Thumbnails = (props) => {

	const {carouselImages, moveTo, currentSlideIndex} = props;

	return (
		<div className="motto-carousel__thumbnails">
			<ul className="motto-carousel__thumbnails-list">
				{carouselImages.map((coverImage, index) => {
					const isActiveClass = (currentSlideIndex === index) ? 'motto-carousel__thumbnail--active' : '';
					return (
						<li onClick={() => moveTo(index)} key={`thumbnail-${index}`}
							className={`motto-carousel__thumbnail ${isActiveClass}`}>
							<a className="motto-carousel__thumbnail-link">
								{!isEmpty(coverImage) && (
									<img className="motto-carousel__thumbnail-image" src={coverImage} alt=""/>
								)}
							</a>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default Thumbnails;
