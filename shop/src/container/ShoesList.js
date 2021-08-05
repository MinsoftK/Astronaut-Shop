import React, { useState } from 'react';
import axios from 'axios';

/* Data */
import Data from '../Data/ShoesData';
import Data2 from '../Data/ShoesData2';

/* component */
import { Button } from 'antd';
import ShoesItem from '../component/ShoesItem';
import Navigator from '../component/Navbar';

const ShoesList = (props) => {
	let [shoes, setShoes] = useState(Data);
	let [wshoes, setWshoes] = useState(Data2);

	const Man = () => {
		return (
			<div className="row">
				{shoes.map((item, i) => {
					return <ShoesItem shoes={item} num={i} key={i}></ShoesItem>;
				})}
			</div>
		);
	};
	const Woman = () => {
		return (
			<div className="row">
				{wshoes.map((item, i) => {
					return <ShoesItem shoes={item} num={i} key={i}></ShoesItem>;
				})}
			</div>
		);
	};
	return (
		<>
			<Navigator></Navigator>
			<div className="container">
				<div className="row">
					{props.num === 1 ? <Woman></Woman> : <Man></Man>}
				</div>
				<Button
					type="primary"
					style={{ margin: '4rem' }}
					onClick={() => {
						axios
							.get(
								'https://github.com/MinsoftK/react/blob/main/shop/src/Data/addManShoes.json'
							)
							.then((result) => {
								console.log(result.data);
							})
							.catch(() => {
								console.log('실패');
							});
					}}>
					더보기
				</Button>
			</div>
		</>
	);
};
export default ShoesList;
