import React, { useState } from 'react';
import Slide from '../component/Slide';

const ShoesShow = () => {
	let [img, setImg] = useState([
		'https://github.com/MinsoftK/react/blob/main/shop/src/img/shoes3.jpg?raw=true',
		'https://github.com/MinsoftK/react/blob/main/shop/src/img/shoes1.jpg?raw=true',
		'https://github.com/MinsoftK/react/blob/main/shop/src/img/wcshoes1.jpg?raw=true',
		'https://github.com/MinsoftK/react/blob/main/shop/src/img/cshoes0.jpg?raw=true',
	]);
	// const Modal = (props) => {
	// 	return (
	// 		<div>
	// 			<center>
	// 				<img
	// 					style={{ textAlign: 'center' }}
	// 					src={img[props.num]}
	// 					width="60%"
	// 					height="30%"></img>
	// 			</center>
	// 		</div>
	// 	);
	// };
	{
		/* {img.map((img, i) => {
					return <Modal num={i} key={i} />;
				})} */
	}
	return (
		<>
			{/* {img.map((img, i) => {
					return <Modal num={i} key={i} />;
				})} */}
			<Slide img={img}></Slide>
		</>
	);
};
export default ShoesShow;
