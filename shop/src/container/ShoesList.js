import React, { useState, lazy, Suspense, useEffect } from 'react';
import axios from 'axios';

/* Data */
import Data from '../Data/ShoesData';
import Data2 from '../Data/ShoesData2';

/* component */
import { Button } from 'antd';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

let ShoesItem = lazy(() => {
	return import('../component/ShoesItem');
});

const ShoesList = (props) => {
	let [shoesNum, setShoesNum] = useState(Object.keys(Data).length); //남자 상품의 개수
	let [wshoesNum, setWShoesNum] = useState(Object.keys(Data2).length); //여자 상품의 개수
	let [btndisable, setBtnDisable] = useState(false); //상품의 개수가 넘어가면 남자카테고리 더보기 버튼 비활성화
	let [wbtndisable, setWBtnDisable] = useState(false); //상품의 개수가 넘어가면 여자 카테고리 더보기 버튼 비활성화
	let [renderMan, setRenderMan] = useState(0);
	let [renderWoMan, setRenderWoMan] = useState(0);

	let IconStyle = { fontSize: 50, marginTop: '40vh' };
	const antIcon = (
		<div className="loadingIcon">
			<LoadingOutlined style={IconStyle} spin />
		</div>
	);
	useEffect(() => {
		console.log(btndisable, wbtndisable);
		console.log(renderMan);
	}, [renderMan]);

	//버튼의 비활성화 상태 session스토리지에 저장
	useEffect(() => {
		let btnData = window.sessionStorage.getItem('btnstate');
		btnData = JSON.parse(btnData);
		// 만약 btnData가 null이라면 session에 먼저 저장한다.
		if (!btnData) {
			saveBtnData();
		} else {
			//null이 아닐때 session에 저장되어 있는 btn의 상태를 기존의 상태에 입력.
			if (btnData.manbtn === true) setBtnDisable(true);
			if (btnData.womanbtn === true) setWBtnDisable(true);
		}
		//session의 정보를 업데이트 하는 과정이 끝나면 변경된 btn의 상태들을 다시 session에 저장한다.
		return saveBtnData();
	}, [btndisable, wbtndisable]);

	//버튼의 비활성화 상태 session스토리지에 저장
	const saveBtnData = () => {
		const shoesLength = { manbtn: btndisable, womanbtn: wbtndisable };
		window.sessionStorage.setItem('btnstate', JSON.stringify(shoesLength));
	};

	/************** 렌더링 관련 컴포넌트 **************/
	//props.num이 0이면 남자 화면 렌더링
	const Man = () => {
		//클릭했을 때, 해당 상품의 about 컴포넌트로 보내야 한다.
		setRenderMan(props.shoes.length);
		return (
			<div className="row">
				<Suspense fallback={<Spin indicator={antIcon} />}>
					{props.shoes.map((item, i) => {
						//컴포넌트 반복
						return (
							<ShoesItem
								shoes={item}
								num={i}
								sex="manshoes"
								key={i}
							></ShoesItem>
						);
					})}
				</Suspense>
			</div>
		);
	};
	//props.num이 1이면 여자 화면 렌더링
	const Woman = () => {
		return (
			<div className="row">
				<Suspense fallback={<Spin indicator={antIcon} />}>
					{props.wshoes.map((item, i) => {
						//컴포넌트 반복
						return (
							<ShoesItem
								shoes={item}
								num={i}
								key={i}
								sex="womanshoes"
							></ShoesItem>
						);
					})}
				</Suspense>
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
					fetchData(props.all);
				}}
			>
				더보기
			</Button>
		);
	};

	/************** 더보기 버튼 클릭시 axios 작동 **************/
	//axios로 추가데이터 받아오기 num:0 남자 num:1 여자
	const fetchData = (props) => {
		console.log('axios 시작', props);
		props.num
			? axios // i === 1일때 여자 카테고리 더보기 버튼 클릭시
					.get('https://minsoftk.github.io/jsontest/test' + props.num + '.json')
					.then((result) => {
						let newObj = [...props.wshoes, ...result.data]; //데이터 합치기
						setWShoesNum(Data.length + result.data.length); //원래 Data와 추가된 데이터의 길이
						if (newObj.length >= wshoesNum) setWBtnDisable(true); //합친 데이터의 길이가 더 크다면 여자 카테고리 버튼 비활성화
						if (props.num) props.setWShoes(newObj);
						else props.setShoes(newObj);
						console.log('axios 데이터 바인딩 성공');
					})
					.catch((e) => {
						console.log(e);
					})
			: axios // i === 0일때 남자 카테고리 더보기 버튼 클릭시
					.get('https://minsoftk.github.io/jsontest/test' + props.num + '.json')
					.then((result) => {
						let newObj = [...props.shoes, ...result.data]; //데이터 합치기
						setShoesNum(Data.length + result.data.length); //원래 Data와 추가된 데이터의 길이
						if (newObj.length >= shoesNum) setBtnDisable(true); //합친 데이터의 길이가 더 크다면 남자 카테고리 버튼 비활성화
						props.setShoes(newObj);
						console.log('axios 데이터 바인딩 성공');
					})
					.catch((e) => {
						console.log('실패', e);
					});
	};
	return (
		<>
			<div className="container">
				<div className="row">
					{props.num === 1 ? (
						<Woman shoes={props}></Woman>
					) : (
						<Man shoes={props}></Man>
					)}
				</div>
				{props.num === 1 ? (
					<ButtonUI all={props} whosebtn={wbtndisable}></ButtonUI>
				) : (
					<ButtonUI all={props} whosebtn={btndisable}></ButtonUI>
				)}
			</div>
		</>
	);
};
export default ShoesList;
