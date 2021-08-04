import React, { useEffect } from 'react';
import Navbar from '../component/Navbar';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
import './About.scss';

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
	useEffect(() => {});
	return (
		<>
			<Navbar></Navbar>
			<div className="container">
				<Box>
					<Boxtitle>About Astronaut's Shoes</Boxtitle>
				</Box>
				<div className="shose-alert">
					<p>재고가 많이 남지 않았습니다.</p>
				</div>
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
