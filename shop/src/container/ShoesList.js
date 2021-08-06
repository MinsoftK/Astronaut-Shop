import React, { useEffect, useState } from 'react';
import axios from 'axios';

/* component */
import { Button } from 'antd';
import ShoesItem from '../component/ShoesItem';
import Navigator from '../component/Navbar';

const ShoesList = (props) => {
	let [shoes, setShoes] = useState(props.shoes); // 상품의 데이터

	let [shoesNum, setShoesNum] = useState(Object.keys(props).length); //남자 상품의 개수
	let [wshoesNum, setWShoesNum] = useState(Object.keys(props).length); //여자 상품의 개수
	let [btndisable, setBtnDisable] = useState(false); //상품의 개수가 넘어가면 남자카테고리 더보기 버튼 비활성화
	let [wbtndisable, setWBtnDisable] = useState(false); //상품의 개수가 넘어가면 여자 카테고리 더보기 버튼 비활성화

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
		console.log('fetch', props);
		axios // i === 1일때 여자 카테고리 더보기 버튼 클릭시
			.get('https://minsoftk.github.io/jsontest/test' + props.i + '.json')
			.then((result) => {
				let newObj = [...props.shoes, ...result.data]; //데이터 합치기
				//새로운 상품 데이터 입력
				console.log(newObj);
				setShoes(newObj);
				console.log(shoes);
				props.i // 원래 Data와 추가된 데이터의 길이
					? setWShoesNum(props.length + result.data.length)
					: setShoesNum(props.length + result.data.length);
				// 합친 데이터의 길이가 더 크다면 각각 카테고리 버튼 비활성화
				if (newObj.length >= wshoesNum) setWBtnDisable(true);
				if (newObj.length >= shoesNum) setBtnDisable(true);
			})
			.catch(() => {
				console.log('실패');
			});
	};
	useEffect(() => {
		console.log('test');
	}, [shoes]);

	return (
		<>
			<Navigator></Navigator>
			<div className="container">
				<div className="row">
					{props.shoes.map((item, i) => {
						//컴포넌트 반복
						return <ShoesItem shoes={item} sex={props.num} key={i}></ShoesItem>;
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
