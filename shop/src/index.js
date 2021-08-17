import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';

/** Date **/
import Data from './Data/ShoesData';
import Data2 from './Data/ShoesData2';

let btn_alert = true;

const alert = (state = btn_alert, action) => {
	if (action.type === '알림닫기') {
		return !alert;
	}
	return state;
};

let reduxData = [
	{
		id: 0,
		name: '조던 신발',
		remain: 2,
		price: 154000,
		imageUrl:
			'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHhyiZtZ6lAAas106pmvCAk1WBWjBSsaSwWg&usqp=CAU',
	},
	{
		id: 1,
		name: '나이키 신발',
		remain: 3,
		price: 160000,
		imageUrl:
			'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQB3gpm9aeMg3Uu8LPaLiJ78wvqvTTYl4uwgHOahv9uZI9LCkLItChJvIwu4VBJIIbh-aaCu00&usqp=CAc',
	},
];

const remainReducer = (state = reduxData, action) => {
	if (action.type === '수량증가') {
		let copy = [...state];
		console.log('action.data', action.data);
		copy[action.data].remain++;
		return copy;
	} else if (action.type === '수량감소') {
		let copy = [...state];
		console.log('action.data', action.data);
		if (copy[action.data].remain < 1) copy[action.data].remain = 0;
		else copy[action.data].remain--;
		return copy;
	} else if (action.type === '항목추가') {
		let found = state.findIndex((a) => {
			//reduxData의 상품 이름과 payload에 일치하는 아이템의 idx 반환
			return a.name === action.payload.name;
		});
		console.log('중복되는 상품 idx', found);
		if (found >= 0) {
			let copy = [...state];
			copy[found].remain++;
			return copy;
		} else {
			let copy = [...state];
			copy.push(action.payload);
			return copy;
		}
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
