import { useState } from 'react';

const Toggleable = (props) => {
	const [visible, setVisible] = useState(false);
	const hideWhenVisible = { display: visible ? 'none' : '' };
	const shownWhenVisible = { display: visible ? '' : 'none' };

	const toggleVisibility = () => {
		setVisible(!visible);
	};

	return (
		<div>
			<div style={hideWhenVisible}>
				<button onClick={toggleVisibility}>{props.buttonLabel}</button>
			</div>
			<div style={shownWhenVisible}>
				{props.children}
				<button onClick={toggleVisibility}>cancel</button>
			</div>
		</div>
	);
};

export default Toggleable;