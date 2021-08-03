/* eslint-disable */

import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';

/* component container */
import ShoesDetail from './component/ShoesDetail';
import ShoesList from './container/ShoesList';
import MainPage from './container/MainPage';

const App = () => {
	let [sex, setSex] = useState(null);
	return (
		<div className="App">
			<div class="no-display">화면이 너무 작습니다. </div>
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
				<Route path="/about">
					<ShoesList></ShoesList>
				</Route>
			</Switch>
		</div>
	);
};

export default App;
