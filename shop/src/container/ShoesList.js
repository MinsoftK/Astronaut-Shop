import React, { useState } from 'react';
import Data from '../Data/ShoesData';
import Data2 from '../Data/ShoesData2';

import ShoesItem from '../component/ShoesItem';
import Navigator from '../component/Navbar';

const ShoesList = (num) => {
	let [shoes, setShoes] = useState(Data);
	{
		console.log(num);
	}
	return (
		<>
			<Navigator></Navigator>
			<div className="container">
				<div className="row">
					{shoes.map((item, i) => {
						return <ShoesItem shoes={item} num={i} key={i}></ShoesItem>;
					})}
				</div>
			</div>
		</>
	);
};
export default ShoesList;
