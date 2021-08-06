import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';

import Navbar from '../component/Navbar';
import './About.scss';

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
	let findItem = props.shoes.find((item) => item.id === parseInt(id));
	let [alert, setAlert] = useState(1);
	console.log(props);
	console.log(findItem);
	//findItem이 계속 2번씩 렌더링 된다. useEffect 활용하기.
	useEffect(() => {
		//find
		console.log(props);
		console.log(findItem);
	}, []);
	useEffect(() => {
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
			<Navbar></Navbar>
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
						<img src={findItem.imageUrl} width="100%" />
					</div>
					<div className="col-md-6 mt-4">
						<h4 className="pt-5">{findItem.title}</h4>
						<h4>₩ {findItem.price}</h4>
						<p>{findItem.description}</p>
						<button className="btn btn-danger">주문하기</button>
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
		</>
	);
};
export default About;
