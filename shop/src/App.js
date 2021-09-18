/* eslint-disable */

import React, { useState, lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

/* component container */
import Navigator from './component/Navbar';
import MainPage from './container/MainPage';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

let ShoesList = lazy(() => {
	return import('./container/ShoesList');
});
let About = lazy(() => {
	return import('./container/About');
});

let Cart = lazy(() => {
	return import('./container/Cart');
});
let AfterService = lazy(() => {
	return import('./container/AfterService');
});
let Notfound = lazy(() => {
	return import('./container/404');
});

/* data */
import Data from './Data/ShoesData';
import Data2 from './Data/ShoesData2';

const App = () => {
	let [shoes, setShoes] = useState(Data);
	let [wshoes, setWShoes] = useState(Data2);
	let IconStyle = { fontSize: 50, marginTop: '40vh' };
	const antIcon = (
		<div>
			<LoadingOutlined style={IconStyle} spin />
		</div>
	);
	return (
		<div className="App">
			<div className="no-display">화면이 너무 작습니다. </div>
			<Navigator></Navigator>
			<Switch>
				<Route exact path="/">
					<MainPage></MainPage>
				</Route>
				<Route path="/manshoes/:id">
					<Suspense fallback={<Spin indicator={antIcon} />}>
						<About shoes={shoes} wshoes={wshoes} num={0}></About>
					</Suspense>
				</Route>
				<Route path="/womanshoes/:id">
					<Suspense fallback={<Spin indicator={antIcon} />}>
						<About shoes={shoes} wshoes={wshoes} num={1}></About>
					</Suspense>
				</Route>
				<Route exact path="/manshoes">
					<Suspense fallback={<Spin indicator={antIcon} />}>
						<ShoesList
							shoes={shoes}
							wshoes={wshoes}
							setShoes={setShoes}
							num={0}
						></ShoesList>
					</Suspense>
				</Route>
				<Route exact path="/womanshoes">
					<Suspense fallback={<Spin indicator={antIcon} />}>
						<ShoesList
							shoes={shoes}
							wshoes={wshoes}
							setWShoes={setWShoes}
							num={1}
						></ShoesList>
					</Suspense>
				</Route>
				<Route path="/cart">
					<Suspense fallback={<Spin indicator={antIcon} />}>
						<Cart></Cart>
					</Suspense>
				</Route>
				<Route path="/afterservice">
					<Suspense fallback={<Spin indicator={antIcon} />}>
						<AfterService></AfterService>
					</Suspense>
				</Route>
				<Route path="*">
					<Suspense fallback={<Spin indicator={antIcon} />}>
						<Notfound></Notfound>
					</Suspense>
				</Route>
			</Switch>
		</div>
	);
};

export default App;
