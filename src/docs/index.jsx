import React from 'react';
import { render } from 'react-dom';
import MyClass from './../lib/index';

import './styles.css';

function Demo() {
	return (
		<MyClass
			onCapture={(e) => {
				console.log(e);
			}}
			compress={1.0}
			size={300}
		/>
	);
}

render(<Demo />, document.getElementById('app'));
