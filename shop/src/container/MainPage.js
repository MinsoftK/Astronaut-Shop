import React, { useState } from 'react';
/* component */
import Navigator from '../component/Navbar';
import Data from '../Data/ShoesData';
import ShoesItem from '../component/ShoesItem';

/* bootstrap, antd */
import 'antd/dist/antd.css';
import { Button } from 'antd';

const MainPage = () => {
	let [shoes, setShoes] = useState(Data);
	return (
		<>
			<Navigator></Navigator>
			<br />
			<div className="welcomePage">
				<h1>Hello Astronaut!</h1>
				<h2>We are Astronaut in Universe.</h2>
				<Button className="welcomePage__btn" type="primary">
					About Astronaut
				</Button>
			</div>

			<div className="container">
				<div className="row">
					{shoes.map((item, i) => {
						return <ShoesItem shoes={item} num={i} key={i}></ShoesItem>;
					})}
				</div>
			</div>

			<div class="no-display">화면이 너무 작습니다. </div>
		</>
	);
};
export default MainPage;
