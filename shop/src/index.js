import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';
import Data from './Data/ShoesData';
import Data2 from './Data/ShoesData2';

// let reduxData = [
// 	{ Data },
// 	{ Data2 },
// 	[
// 		{ id: 0, name: '멋진신발', remain: 2 },
// 		{ id: 1, name: '나이키신발', remain: 3 },
// 	],
// ];

let btn_state = true;

const alert = (state = alert, action) => {
	if (action.type === '알림닫기') {
		return !alert;
	}
	return state;
};

let reduxData = [
	{ id: 0, name: '멋진신발', remain: 2 },
	{ id: 1, name: '나이키신발', remain: 3 },
];
const remainReducer = (state = reduxData, action) => {
	if (action.type === '수량증가') {
		let copy = [...state];
		copy[0].remain++;
		return copy;
	} else if (action.type === '수량감소') {
		let copy = [...state];
		if (copy[0].remain < 1) copy[0].remain = 0;
		else copy[0].remain--;
		return copy;
	} else {
		return state;
	}
};
let store = createStore(combineReducers({ remainReducer, alert }));

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<Provider store={store}>
				<App />
			</Provider>
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
