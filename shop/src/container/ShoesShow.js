import { Carousel } from 'antd';
import React, { useState } from 'react';

const ShoesShow = () => {
	const contentStyle = {
		display: 'flex',
		height: '30vh',
		color: '#fff',
		lineHeight: '160px',
		textAlign: 'center',
		background: 'black',
	};
	let [img, setImg] = useState([
		'https://github.com/MinsoftK/react/blob/main/shop/src/img/shoes3.jpg?raw=true',
		'https://github.com/MinsoftK/react/blob/main/shop/src/img/shoes1.jpg?raw=true',
		'https://github.com/MinsoftK/react/blob/main/shop/src/img/wcshoes1.jpg?raw=true',
		'https://github.com/MinsoftK/react/blob/main/shop/src/img/cshoes0.jpg?raw=true',
	]);
	const Modal = (props) => {
		return (
			<div>
				<center>
					<img
						style={{ textAlign: 'center' }}
						src={img[props.num]}
						width="60%"></img>
				</center>
			</div>
		);
	};

	return (
		<Carousel autoplay>
			{img.map((img, i) => {
				return <Modal style={contentStyle} num={i} key={i} />;
			})}
		</Carousel>
	);
};
export default ShoesShow;
