import React, { useState } from 'react';
import axios from 'axios';
import { Route } from 'react-router-dom';

/* Data */
import Data from '../Data/ShoesData';
import Data2 from '../Data/ShoesData2';

/* component */
import { Button } from 'antd';
import ShoesItem from '../component/ShoesItem';
import Navigator from '../component/Navbar';
import About from './About';

const ShoesList = (props) => {
	let [shoes, setShoes] = useState(Data); //남자 상품의 데이터
	let [wshoes, setWShoes] = useState(Data2); //여자 상품의 데이터
	let [shoesNum, setShoesNum] = useState(Object.keys(Data).length); //남자 상품의 개수
	let [wshoesNum, setWShoesNum] = useState(Object.keys(Data2).length); //여자 상품의 개수
	let [btndisable, setBtnDisable] = useState(false); //상품의 개수가 넘어가면 남자카테고리 더보기 버튼 비활성화
	let [wbtndisable, setWBtnDisable] = useState(false); //상품의 개수가 넘어가면 여자 카테고리 더보기 버튼 비활성화

	/************** 렌더링 관련 컴포넌트 **************/
	//props.num이 0이면 남자 화면 렌더링
	const Man = () => {
		//클릭했을 때, 해당 상품의 about 컴포넌트로 보내야 한다.
		const manClick = () => {
			<Route path="/about/man/:id">
				<About shoes={shoes}></About>
			</Route>;
		};
		return (
			<div className="row">
				{shoes.map((item, i) => {
					//컴포넌트 반복
					return (
						<ShoesItem
							shoes={item}
							num={i}
							sex="man"
							key={i}
							onClick={manClick}></ShoesItem>
					);
				})}
			</div>
		);
	};
	//props.num이 1이면 여자 화면 렌더링
	const Woman = () => {
		const womanClick = () => {};
		return (
			<div className="row">
				{wshoes.map((item, i) => {
					//컴포넌트 반복
					return (
						<ShoesItem
							shoes={item}
							num={i}
							key={i}
							sex="woman"
							onClick={womanClick}></ShoesItem>
					);
				})}
			</div>
		);
	};
	//더보기 버튼 UI  남자, 여자 버튼의 각각의 State를 props로 받는다.
	const ButtonUI = (props) => {
		console.log(props);
		return (
			<Button
				disabled={props.whosebtn}
				type="primary"
				style={{ margin: '4rem' }}
				onClick={() => {
					fetchData(props.i);
				}}>
				더보기
			</Button>
		);
	};

	/************** 더보기 버튼 클릭시 axios 작동 **************/
	//axios로 추가데이터 받아오기 num:0 남자 num:1 여자
	const fetchData = (i) => {
		i
			? axios // i === 1일때 여자 카테고리 더보기 버튼 클릭시
					.get('https://minsoftk.github.io/jsontest/test' + i + '.json')
					.then((result) => {
						let newObj = [...wshoes, ...result.data]; //데이터 합치기
						setWShoesNum(Data.length + result.data.length); //원래 Data와 추가된 데이터의 길이
						if (newObj.length >= wshoesNum) setWBtnDisable('true'); //합친 데이터의 길이가 더 크다면 여자 카테고리 버튼 비활성화
						setWShoes(newObj);
						console.log(btndisable);
					})
					.catch(() => {
						console.log('실패');
					})
			: axios // i === 0일때 남자 카테고리 더보기 버튼 클릭시
					.get('https://minsoftk.github.io/jsontest/test' + i + '.json')
					.then((result) => {
						let newObj = [...shoes, ...result.data]; //데이터 합치기
						setShoesNum(Data.length + result.data.length); //원래 Data와 추가된 데이터의 길이
						if (newObj.length >= shoesNum) setBtnDisable('true'); //합친 데이터의 길이가 더 크다면 남자 카테고리 버튼 비활성화
						setShoes(newObj);
						console.log(btndisable);
					})
					.catch(() => {
						console.log('실패');
					});
	};
	return (
		<>
			<Navigator></Navigator>
			<div className="container">
				<div className="row">
					{props.num === 1 ? <Woman></Woman> : <Man></Man>}
				</div>
				{props.num === 1 ? (
					<ButtonUI i={props} whosebtn={wbtndisable}></ButtonUI>
				) : (
					<ButtonUI i={props} whosebtn={btndisable}></ButtonUI>
				)}
			</div>
		</>
	);
};
export default ShoesList;
