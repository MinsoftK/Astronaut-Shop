import React, { useState } from 'react';
import ShoesSlide from '../component/ShoesSlide';

const ShoesShow = () => {
	let [img, setImg] = useState([
		'https://github.com/MinsoftK/react/blob/main/shop/src/img/shoes0.jpg?raw=true',
		'https://github.com/MinsoftK/react/blob/main/shop/src/img/shoes1.jpg?raw=true',
		'https://github.com/MinsoftK/react/blob/main/shop/src/img/shoes2.jpg?raw=true',
		'https://github.com/MinsoftK/react/blob/main/shop/src/img/shoes3.jpg?raw=true',
		'https://github.com/MinsoftK/react/blob/main/shop/src/img/shoes4.jpg?raw=true',
	]);

	return <ShoesSlide img={img}></ShoesSlide>;
};
export default ShoesShow;
