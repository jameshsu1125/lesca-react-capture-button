import React, { Component } from 'react';
import EXIF from 'exif-js';
import UserAgent from 'lesca-user-agent';

class CaptureButton extends Component {
	constructor(props) {
		super(props);
	}

	set(option = { file, size, cb }) {
		const { file, size = this.props.size || 500, cb } = option;
		const ctx = this.refs.canvas.getContext('2d');
		let reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = (e) => {
			const image = new Image();
			image.onload = () => {
				// change width / height
				const root = this;
				const { width, height } = image;
				let w = width,
					h = height;
				switch (width > height) {
					case true:
						if (w > size) {
							h = Math.round((h *= size / w));
							w = size;
						}
						break;
					default:
						if (h > size) {
							w = Math.round((w *= size / h));
							h = size;
						}
				}
				this.refs.canvas.width = w;
				this.refs.canvas.height = h;

				// get Exif
				EXIF.getData(image, function () {
					const ori = UserAgent.get() === 'mobile' ? EXIF.getTag(this, 'Orientation') : 1;

					switch (ori) {
						case 1: // 水平(一般)
							ctx.drawImage(image, 0, 0, w, h);
							break;
						case 2: // 水平鏡像
							ctx.translate(w, 0);
							ctx.scale(-1, 1);
							ctx.drawImage(image, 0, 0, w, h);
							break;
						case 3: // 翻轉180度
							ctx.translate(w / 2, h / 2);
							ctx.rotate((180 * Math.PI) / 180);
							ctx.drawImage(image, -w / 2, -h / 2, w, h);
							break;
						case 4: // 垂直鏡像
							ctx.translate(0, h);
							ctx.scale(1, -1);
							ctx.drawImage(image, 0, 0, w, h);
							break;
						case 5: // 水平鏡像後，順時鐘翻轉270度
							ctx.translate(w, 0);
							ctx.scale(-1, 1);
							ctx.translate(w / 2, h / 2);
							ctx.rotate((90 * Math.PI) / 180);
							ctx.drawImage(image, -w / 2, -h / 2, w, h);
							break;
						case 6: // 順時鐘翻轉270度
							ctx.translate(w / 2, h / 2);
							ctx.rotate((270 * Math.PI) / 180);
							ctx.drawImage(image, -w / 2, -h / 2, w, h);
							break;
						case 7: // 水平鏡像後，順時鐘翻轉90度
							ctx.translate(w, 0);
							ctx.scale(-1, 1);
							ctx.translate(w / 2, h / 2);
							ctx.rotate((270 * Math.PI) / 180);
							ctx.drawImage(image, -w / 2, -h / 2, w, h);
							break;
						case 8: // 順時鐘翻轉90度
							ctx.translate(w / 2, h / 2);
							ctx.rotate((90 * Math.PI) / 180);
							ctx.drawImage(image, -w / 2, -h / 2, w, h);
							break;
						default:
							ctx.drawImage(image, 0, 0, w, h);
							break;
					}
					cb(root.refs.canvas.toDataURL('image/png', root.props.compress || 1.0));
				});
			};
			image.src = e.target.result;
		};
	}

	capture() {
		this.refs.input.click();
	}

	onChange(e) {
		var file = e.target.files[0];
		this.set({
			file: file,
			cb: (e) => {
				if (this.props.onCapture) this.props.onCapture(e);
			},
		});
	}

	append() {
		if (this.props.image) return <img ref='button' onClick={this.capture.bind(this)} src={this.props.image} />;
		else
			return (
				<button ref='button' onClick={this.capture.bind(this)}>
					{this.props.label ? this.props.label : 'Capture'}
				</button>
			);
	}

	render() {
		return (
			<>
				{this.append()}
				<input
					style={{ display: 'none' }}
					ref='input'
					onChange={this.onChange.bind(this)}
					type='file'
					accept='image/*'
					capture='camera'
				/>
				<canvas ref='canvas' style={{ display: 'none' }} />
			</>
		);
	}
}

export default CaptureButton;
