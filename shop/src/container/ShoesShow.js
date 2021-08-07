import React, { useState } from 'react';
import ShoesSlide from '../component/ShoesSlide';

const ShoesShow = () => {
	let [img, setImg] = useState([
		'https://github.com/MinsoftK/jsontest/blob/master/shoes0.jpg?raw=true',
		'https://github.com/MinsoftK/jsontest/blob/master/shoes1.jpg?raw=true',
		'https://github.com/MinsoftK/jsontest/blob/master/shoes2.jpg?raw=true',
		'https://github.com/MinsoftK/jsontest/blob/master/shoes3.jpg?raw=true',
	]);

	return <ShoesSlide img={img}></ShoesSlide>;
};
export default ShoesShow;
