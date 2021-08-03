/* eslint-disable */
import './ShoesItem.css';
import React, { useState } from 'react';
import { Link, Route } from 'react-router-dom';

/* component */
import ShoesDetail from './ShoesDetail';
import Detail from '../container/Detail';

function ShoesItem(props) {
	const onClick = () => {
		<Route exact path="/detail" component={Detail}></Route>;
	};
	return (
		<div className="col-md-4" onClick={onClick}>
			<Link to="/detail">
				<img src={props.shoes.imageUrl} width="100%"></img>
				<h4>{props.shoes.title}</h4>
				<h5>₩ {props.shoes.price}</h5>
			</Link>
		</div>
	);
}

export default ShoesItem;
