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
						{shoes.map((item, i) => {
							return <ShoesItem shoes={item} num={i}></ShoesItem>;
						})}
					</div>
				</div>
			</>
			<div class="no-display">화면이 너무 작습니다. </div>
		</div>
	);
};

export default App;
