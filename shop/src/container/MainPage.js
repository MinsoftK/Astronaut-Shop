import React from 'react';
import { Link } from 'react-router-dom';
/* component */
import Navigator from '../component/Navbar';
import ShoesShow from './ShoesShow';
/* bootstrap, antd */
import 'antd/dist/antd.css';
import { Button } from 'antd';

import './MainPage.css';

const MainPage = () => {
	return (
		<>
			<Navigator></Navigator>
			<div className="welcomePage">
				<div className="container">
					<h1>Hello Astronaut!</h1>
					<h2>We are Astronaut in Universe.</h2>
					<Button
						className="welcomePage__btn"
						type="primary"
						size="large"
						shape="round">
						<Link to="/manshoes">See Astronaut Product!</Link>
					</Button>
				</div>
				<br />
			</div>
			<h2 className="welcomePage__middle">Special Experience with Astronaut</h2>
			<div className="content">
				<ShoesShow></ShoesShow>
			</div>
		</>
	);
};
export default MainPage;
