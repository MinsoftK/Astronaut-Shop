/* eslint-disable */
import 'antd/dist/antd.css';
import { Button } from 'antd';

import './App.css';
import Data from './container/ShoesData';
import Navigator from './component/Navbar';
import React, { useState } from 'react';
import ShoesItem from './component/ShoesItem';

const App = () => {
	let [shoes, setShoes] = useState(Data);

	return (
		<div className="App">
			<>
				<Navigator></Navigator>
				<br />
				<div className="welcomePage">
					<h1>Hello Astronaut!</h1>
					<p>We are Astronaut in Universe. We are free and Beautiful!</p>
					<Button className="welcomePage__btn" type="primary">
						Primary Button
					</Button>
				</div>
				<div className="container">
					<div className="row">
						{Data.map((Data, i) => {
							<ShoesItem
								imageUrl={Data[i].imageUrl}
								title={Data[i].title}
								price={Data[i].price}
								des={Data[i].description}></ShoesItem>;
						})}
						<ShoesItem
							imageUrl={Data[0].imageUrl}
							title={Data[0].title}
							price={Data[0].price}
							des={Data[0].description}></ShoesItem>

						<div className="col-md-4">
							<img
								src="https://cueren.com/wp-content/uploads/2019/10/MBT10-CRES-1.jpg"
								width="100%"></img>
							<h4>상품명</h4>
							<p>상품설명 & 가격</p>
						</div>
						<div className="col-md-4">
							<img
								src="https://cueren.com/wp-content/uploads/2019/10/MLD09-CRBK-1.jpg"
								width="100%"></img>
							<h4>상품명</h4>
							<p>상품설명 & 가격</p>
						</div>
					</div>
				</div>
			</>
			<div class="no-display">화면이 너무 작습니다. </div>
		</div>
	);
};

export default App;
