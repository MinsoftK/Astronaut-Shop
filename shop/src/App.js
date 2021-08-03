/* eslint-disable */

import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';

/* component container */
import ShoesDetail from './component/ShoesDetail';
import MainPage from './container/MainPage';

const App = () => {
	return (
		<div className="App">
			<div class="no-display">화면이 너무 작습니다. </div>
			<Switch>
				<Route exact path="/">
					<MainPage></MainPage>
				</Route>
				<Route path="/detail">
					<ShoesDetail></ShoesDetail>
				</Route>
			</Switch>
		</div>
	);
};

export default App;
