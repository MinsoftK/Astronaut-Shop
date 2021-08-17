import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { connect, useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import './About.scss';
/** React bootstrap **/
import { Nav } from 'react-bootstrap';
/* box styled 컴포넌트 */
let Box = styled.div`
	padding: 30px;
`;

let Boxtitle = styled.h4`
	font-size: 25px;
	color: ${(props) => props.color};
`;

const About = (props) => {
	let { id } = useParams();
	let history = useHistory();
	let [alert, setAlert] = useState(1);
	let [tab, setTab] = useState('');
	let [switchOn, setSwitchOn] = useState(false);
	let [goCartPage, setGoCartPage] = useState(false);
	let [itemPrice, setItemPrice] = useState(0);
	let findItem = props.num
		? props.wshoes.find((item) => item.id === parseInt(id))
		: props.shoes.find((item) => item.id === parseInt(id));
	//reudx 파트
	let dispatch = useDispatch();

	//findItem이 계속 2번씩 렌더링 된다. useEffect 활용하기.
	// console.log(findItem);
	useEffect(() => {
		let itemPrice = findItem.price
			.toString()
			.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
		setItemPrice(itemPrice);
		console.log(itemPrice);
		console.log('test');
		let Timer = setTimeout(() => {
			setAlert(0);
		}, 4000);
		//컴포넌트가 사라질때 실행할 코드는 return
		return function getout() {
			console.log('함수종료');
			clearTimeout(Timer);
		};
	}, []);
	return (
		<>
			<div className="container">
				<Box>
					<Boxtitle>About Astronaut's Shoes</Boxtitle>
				</Box>
				{alert ? (
					<div className="shose-alert">
						<p>재고가 많이 남지 않았습니다.</p>
					</div>
				) : null}

				<div className="row">
					<div className="col-md-6">
						<img src={findItem.imageUrl} width="100%" alt="..." />
					</div>
					<div className="col-md-6 mt-4">
						<h4 className="pt-5">{findItem.title}</h4>
						<h4>₩ {itemPrice}</h4>
						<p>{findItem.description}</p>
						<Remain remain={findItem.remain}> </Remain>
						<button
							className="btn btn-danger"
							onClick={() => {
								dispatch({
									type: '항목추가',
									payload: {
										id: findItem.id,
										sex: props.num,
										name: findItem.title,
										remain: findItem.remain,
										quan: 1,
										imageUrl: findItem.imageUrl,
										price: findItem.price,
									},
								});
								history.push('/cart');
							}}>
							장바구니에 추가
						</button>
						<button
							className="btn btn-danger"
							onClick={() => {
								history.goBack();
							}}>
							뒤로가기
						</button>
					</div>
				</div>
			</div>

			<Nav
				className="mb-5"
				fill
				variant="pills"
				defaultActiveKey="/home"
				style={{ marginTop: '50px' }}>
				<Nav.Item>
					<Nav.Link
						eventKey="link-0"
						onClick={() => {
							setSwitchOn(false);
							setTab(0);
						}}>
						상품 설명
					</Nav.Link>
				</Nav.Item>
				<Nav.Item>
					<Nav.Link
						eventKey="link-1"
						onClick={() => {
							setSwitchOn(false);
							setTab(1);
						}}>
						배송정보
					</Nav.Link>
				</Nav.Item>
				<Nav.Item>
					<Nav.Link
						eventKey="link-2"
						onClick={() => {
							setSwitchOn(false);
							setTab(2);
						}}>
						환불정보
					</Nav.Link>
				</Nav.Item>
			</Nav>

			<TabContent tab={tab} setSwitchOn={setSwitchOn} />
		</>
	);
};

const TabContent = (props) => {
	useEffect(() => {
		props.setSwitchOn(true);
	});
	if (props.tab === 0)
		return <div style={{ padding: '100px' }}>상품 설명란</div>;
	else if (props.tab === 1)
		return <div style={{ padding: '100px' }}>배송정보에 관련된 창</div>;
	else return <div style={{ padding: '100px' }}>2번째 내용입니다.</div>;
};

const Remain = (props) => {
	return <h5>재고 :{props.remain} </h5>;
};

export default About;
