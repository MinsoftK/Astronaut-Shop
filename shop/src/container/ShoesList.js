import React, { useState } from 'react';
import Data from '../Data/ShoesData';
import ShoesItem from '../component/ShoesItem';

const ShoesList = () => {
	let [shoes, setShoes] = useState(Data);
	return (
		<div className="container">
			<div className="row">
				{shoes.map((item, i) => {
					return <ShoesItem shoes={item} num={i} key={i}></ShoesItem>;
				})}
			</div>
		</div>
	);
};
export default ShoesList;
