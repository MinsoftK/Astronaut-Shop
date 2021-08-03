import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';

/* Data */
import Data from '../Data/ShoesData';
import Data2 from '../Data/ShoesData2';

/* component */
import ShoesItem from '../component/ShoesItem';
import Navigator from '../component/Navbar';
import About from './About';

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
			</div>
		</>
	);
};
export default ShoesList;
