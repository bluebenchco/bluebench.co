import { registerBlockExtension } from '@10up/block-components'
import {
	AnglePickerControl,
	Dropdown,
	ToolbarButton,
} from '@wordpress/components'
import { rotateRight } from '@wordpress/icons'
import {
	BlockControls
} from '@wordpress/block-editor'

const newAttributes = {
	tiltAngle: {
		type: 'number',
		default: 0
	}
}

function generateInlneStyle(attributes) {
	const { tiltAngle, style = {} } = attributes
	const transform = (style.transform || '')
		.replace(/rotate\([^)]*\)/g, '')
		.replace(/\s+/g, ' ')
		.trim();

	if (tiltAngle === 0) {
		style.transform = transform

		return style
	}

	style.transform = `${transform} rotate(${tiltAngle}deg)`

	return style
}

function HeaderTiltControl( props ) {
	const { attributes, setAttributes } = props
	const { tiltAngle = 0 } = attributes

	const tiltInput = (
		<div style={{ width: '7rem'}}>
			<AnglePickerControl
				value={ tiltAngle }
				label="Angle"
				onChange={angle => {
					setAttributes({ tiltAngle: angle })
				}}
			/>
		</div>
	)

	return (
		<BlockControls group="other">
			<Dropdown
				popoverProps={{
					headerTitle: 'Tilt angle',
					variant: 'toolbar'
				}}
				renderToggle={({ isOpen, onToggle }) => (
					<ToolbarButton
						icon={ rotateRight }
						label="Tilt angle"
						onClick={ onToggle }
						aria-expanded={ isOpen }
						isPressed={ tiltAngle !== 0 }
					/>
				)}
				renderContent={() => tiltInput}
			/>
		</BlockControls>
	)
}

registerBlockExtension('core/heading', {
	extensionName: 'tilt',
	attributes: newAttributes,
	classNameGenerator: () => null,
	inlineStyleGenerator: generateInlneStyle,
	Edit: HeaderTiltControl
})
