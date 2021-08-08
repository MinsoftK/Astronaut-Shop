/* eslint-disable */
import './ShoesItem.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function ShoesItem(props) {
	console.log(props);
	let src =
		props.sex === 'womanshoes'
			? '/womanshoes/' + props.shoes.id
			: '/manshoes/' + props.shoes.id;
	return (
		<div className="col-md-4">
			<Link to={src}>
				<img src={props.shoes.imageUrl} width="100%"></img>
				<h4>{props.shoes.title}</h4>
				<h5>₩ {props.shoes.price}</h5>
			</Link>
		</div>
	);
}
export default ShoesItem;
