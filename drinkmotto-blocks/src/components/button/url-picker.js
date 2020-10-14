/**
 * WordPress dependencies.
 */
import { BlockControls, URLInput } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import {
	Popover,
	ToolbarGroup,
	ToolbarButton,
	KeyboardShortcuts
} from '@wordpress/components';
import { rawShortcut, displayShortcut } from '@wordpress/keycodes';
import {link} from '@wordpress/icons';
import React, { Fragment } from 'react'

/**
 * Url picket component.
 *
 * @param {Object} props Component props.
 *
 * @return {jsx}
 */
const URLPicker = ( props ) => {
	const { isSelected, buttonUrl, setAttributes } = props;
	const [ isURLPickerOpen, setIsURLPickerOpen ] = useState( false );

	/**
	 * Open link control.
	 */
	const openLinkControl = () => {
		setIsURLPickerOpen( true );
	};

	const linkControl = isURLPickerOpen && (
		<Popover
			position="bottom center"
			onClose={ () => setIsURLPickerOpen( false ) }
		>
			<URLInput
				value={ buttonUrl }
				onChange={ ( url ) => {
					setAttributes( { buttonUrl: url } );
				} }
			/>
		</Popover>
	);

	return (
		<Fragment>
			<BlockControls>
				<ToolbarGroup>
					<ToolbarButton
						name="link"
						icon={ link }
						title={ __( 'Link' ) }
						shortcut={ displayShortcut.primary( 'k' ) }
						onClick={ openLinkControl }
					/>
				</ToolbarGroup>
			</BlockControls>
			{ isSelected && (
				<KeyboardShortcuts
					bindGlobal
					shortcuts={ {
						[ rawShortcut.primary( 'k' ) ]: openLinkControl
					} }
				/>
			) }
			{ linkControl }
		</Fragment>
	);
};

export default URLPicker;
