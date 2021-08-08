/* eslint-disable */

import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';

/* component container */
import ShoesList from './container/ShoesList';
import MainPage from './container/MainPage';
import About from './container/About';
import Astronaut from './container/Astronaut';

/* data */
import Data from './Data/ShoesData';
import Data2 from './Data/ShoesData2';
import addData from './Data/addManShoes';
import addData2 from './Data/addManShoes';

const App = () => {
	let [shoes, setShoes] = useState(Data);
	let [wshoes, setWShoes] = useState(Data2);
	console.log('최상단', shoes, wshoes);
	return (
		<div className="App">
			<div className="no-display">화면이 너무 작습니다. </div>
			<Switch>
				<Route exact path="/">
					<MainPage></MainPage>
				</Route>
				<Route path="/manshoes/:id">
					<About shoes={shoes} wshoes={wshoes} num={0}></About>
				</Route>
				<Route path="/womanshoes/:id">
					<About shoes={shoes} wshoes={wshoes} num={1}></About>
				</Route>
				<Route exact path="/manshoes">
					<ShoesList
						shoes={shoes}
						wshoes={wshoes}
						setShoes={setShoes}
						num={0}></ShoesList>
				</Route>
				<Route exact path="/womanshoes">
					<ShoesList
						shoes={shoes}
						wshoes={wshoes}
						setWShoes={setWShoes}
						num={1}></ShoesList>
				</Route>
				<Route path="/description">
					<Astronaut></Astronaut>
				</Route>
			</Switch>
		</div>
	);
};

export default App;
