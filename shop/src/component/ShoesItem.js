/* eslint-disable */
import './ShoesItem.css';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

/* component */
import About from '../container/About';

function ShoesItem(props) {
	let history = useHistory();
	let src = '/' + props.sex + '/' + props.shoes.id;

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
