import React, { useEffect, useState } from 'react';
import axios from 'axios';

/* component */
import { Button } from 'antd';
import ShoesItem from '../component/ShoesItem';
import Navigator from '../component/Navbar';

/* Data */
import Data from '../Data/ShoesData';
import Data2 from '../Data/ShoesData2';

const ShoesList = (props) => {
	console.log(props);
	let [shoes, setShoes] = useState(Data); // 상품의 데이터
	let [wshoes, setWShoes] = useState(Data2);
	let [shoesNum, setShoesNum] = useState(Object.keys(props).length); //남자 상품의 개수
	let [wshoesNum, setWShoesNum] = useState(Object.keys(props).length); //여자 상품의 개수
	let [btndisable, setBtnDisable] = useState(false); //상품의 개수가 넘어가면 남자카테고리 더보기 버튼 비활성화
	let [wbtndisable, setWBtnDisable] = useState(false); //상품의 개수가 넘어가면 여자 카테고리 더보기 버튼 비활성화

	const Man = () => {
		//클릭했을 때, 해당 상품의 about 컴포넌트로 보내야 한다.
		return (
			<div className="row">
				{shoes.map((item, i) => {
					//컴포넌트 반복
					return <ShoesItem shoes={item} sex="man" key={i}></ShoesItem>;
				})}
			</div>
		);
	};
	//props.num이 1이면 여자 화면 렌더링
	const Woman = () => {
		return (
			<div className="row">
				{wshoes.map((item, i) => {
					//컴포넌트 반복
					console.log('item', item);
					return <ShoesItem shoes={item} key={i} sex="woman"></ShoesItem>;
				})}
			</div>
		);
	};
	//더보기 버튼 UI  남자, 여자 버튼의 각각의 State를 props로 받는다.
	const ButtonUI = (props) => {
		return (
			<Button
				disabled={props.whosebtn}
				type="primary"
				style={{ margin: '4rem' }}
				onClick={() => {
					fetchData(props);
				}}>
				더보기
			</Button>
		);
	};
	/************** 더보기 버튼 클릭시 axios 작동 **************/
	//axios로 추가데이터 받아오기 num:0 남자 num:1 여자
	const fetchData = (props) => {
		axios
			.get('YOUR_LINK')
			.then((result) => {
				let newObj = [...props.shoes, ...result.data]; //데이터 합치기
				console.log(newObj);
				props.i // 원래 Data와 추가된 데이터의 길이
					? setWShoesNum(props.length + result.data.length)
					: setShoesNum(props.length + result.data.length);
				if (newObj.length >= wshoesNum) {
					props.i // 합친 데이터의 길이가 더 크다면 각각 카테고리 버튼 비활성화
						? setWBtnDisable(true)
						: setBtnDisable(true); //합친 데이터의 길이가 더 크다면 여자 카테고리 버튼 비활성화
				}
			})
			.catch((e) => {
				console.log('실패', e);
			});
	};
	return (
		<>
			<Navigator></Navigator>
			<div className="container">
				<div className="row">
					{shoes.map((item, i) => {
						//컴포넌트 반복
						return <ShoesItem shoes={item} key={i}></ShoesItem>;
					})}
				</div>
				{props.num === 1 ? (
					<ButtonUI
						shoes={props.shoes}
						i={props.num}
						whosebtn={wbtndisable}></ButtonUI>
				) : (
					<ButtonUI
						shoes={props.shoes}
						i={props.num}
						whosebtn={btndisable}></ButtonUI>
				)}
			</div>
		</>
	);
};
export default ShoesList;
