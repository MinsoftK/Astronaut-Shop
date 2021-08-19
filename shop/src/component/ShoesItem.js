/* eslint-disable */
import './ShoesItem.css';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

function ShoesItem(props) {
	let history = useHistory();

	//전달받은 props가 남자상품인지 여자상품인지엔 따라 url 설정
	let src =
		props.sex === 'womanshoes'
			? '/womanshoes/' + props.shoes.id
			: '/manshoes/' + props.shoes.id;

	//props의 신발가격 ',' 포맷처리
	let itemPrice = props.shoes.price
		.toString()
		.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
	/** 최적화 **/
	const onClick = () => {
		console.log('src', { src });
		history.push(src);
	};
	return (
		<div className="col-md-4" onClick={onClick}>
			<img loading="lazy" src={props.shoes.imageUrl} width="100%"></img>
			<h4>{props.shoes.title}</h4>
			<h5>₩ {itemPrice}</h5>
		</div>
	);
}
export default ShoesItem;
