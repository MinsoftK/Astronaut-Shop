/* eslint-disable */
import './ShoesItem.css';
import React, { useState } from 'react';
import { Link, Route, Switch } from 'react-router-dom';

/* component */
import About from '../container/About';

function ShoesItem(props) {
	console.log('ShoesItem Props', props.shoes);
	let src = props.shoes.id;
	console.log(src);
	console.log(props.sex);

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
