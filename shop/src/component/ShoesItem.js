/* eslint-disable */
import './ShoesItem.css';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

function ShoesItem(props) {
	let history = useHistory();
	let src =
		props.sex === 'womanshoes'
			? '/womanshoes/' + props.shoes.id
			: '/manshoes/' + props.shoes.id;
	let itemPrice = props.shoes.price
		.toString()
		.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
	return (
		<div
			className="col-md-4"
			onClick={() => {
				console.log('src', { src });
				history.push(src);
			}}>
			<img src={props.shoes.imageUrl} width="100%"></img>
			<h4>{props.shoes.title}</h4>
			<h5>₩ {itemPrice}</h5>
		</div>
	);
}
export default ShoesItem;
