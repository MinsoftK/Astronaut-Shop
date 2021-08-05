/* eslint-disable */
import './ShoesItem.css';
import React, { useState } from 'react';
import { Link, Route, Switch } from 'react-router-dom';

/* component */
import Detail from '../container/About';

function ShoesItem(props) {
	return (
		<div className="col-md-4">
			<Link to="/about/man/0">
				<img src={props.shoes.imageUrl} width="100%"></img>
				<h4>{props.shoes.title}</h4>
				<h5>₩ {props.shoes.price}</h5>
			</Link>
		</div>
	);
}

export default ShoesItem;
