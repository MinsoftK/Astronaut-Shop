import React from 'react';
import { Link } from 'react-router-dom';
/* component */
import Navigator from '../component/Navbar';
import ShoesShow from './ShoesShow';
/* bootstrap, antd */
import 'antd/dist/antd.css';
import { Button, Carousel } from 'antd';

import './MainPage.scss';
import ShoesList from './ShoesList';

const MainPage = () => {
	return (
		<>
			<Navigator></Navigator>
			<br />
			<div className="welcomePage">
				<h1>Hello Astronaut!</h1>
				<h2>We are Astronaut in Universe.</h2>
				<Button className="welcomePage__btn" type="primary">
					<Link to="/menshoes">See Astronaut Product!</Link>
				</Button>
			</div>
			<br />
			<br />
			<h2 className="welcomePage__middle">Special Experience</h2>
			<div className="content">
				<ShoesShow></ShoesShow>
			</div>
			<div className="no-display">화면이 너무 작습니다. </div>
		</>
	);
};
export default MainPage;
