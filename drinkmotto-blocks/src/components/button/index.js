/**
 * WordPress dependencies.
 */
import { RichText } from '@wordpress/block-editor';
import { merge } from 'lodash';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies.
 */
import URLPicker from './url-picker';

/**
 * Button Component.
 *
 * @param {Object} props Component props.
 *
 * @return {jsx}
 */
const Button = ( props ) => {

	const { attributes, setAttributes, isSelected, config } = props;
	const { buttonText, buttonUrl } = attributes;

	const settings = merge( {
		wrapper: {
			className: 'wp-block-button'
		},
		RichText: {
			placeholder: __( 'Add text…', 'motto' ),
			value: buttonText,
			onChange: ( value ) => setAttributes( { buttonText: value } ),
			withoutInteractiveFormatting: true,
			className: 'wp-block-button__link'
		},
		URLPicker: {
			isSelected: isSelected,
			buttonUrl: buttonUrl,
			setAttributes: setAttributes
		}
	}, config );

	return (
		<div { ...settings.wrapper } >
			<RichText { ...settings.RichText } />
			{ settings.URLPicker && (
				<URLPicker { ...settings.URLPicker } />
			) }
		</div>
	);
};

export default Button;
