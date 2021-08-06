/* eslint-disable */

import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';

/* component container */
import ShoesList from './container/ShoesList';
import MainPage from './container/MainPage';
import About from './container/About';

/* data */
import Data from './Data/ShoesData';
import Data2 from './Data/ShoesData2';

const App = () => {
	let [shoes, setShoes] = useState(Data);
	let [wshoes, setWshoes] = useState(Data2);

	return (
		<div className="App">
			<div className="no-display">화면이 너무 작습니다. </div>
			<Switch>
				<Route exact path="/">
					<MainPage></MainPage>
				</Route>
				<Route path="/menshoes">
					<ShoesList num={0}></ShoesList>
				</Route>
				<Route path="/womenshoes">
					<ShoesList num={1}></ShoesList>
				</Route>
				<Route path="/about/0">
					<About shoes={shoes}></About>
				</Route>
			</Switch>
		</div>
	);
};

export default App;
