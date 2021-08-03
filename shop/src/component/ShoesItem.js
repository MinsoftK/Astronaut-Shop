/* eslint-disable */
import './ShoesItem.css';
import React, { useState } from 'react';
import ShoesDetail from './ShoesDetail';
import { Link } from 'react-router-dom';

function ShoesItem(props) {
	return (
		<div className="col-md-4">
			<img src={props.shoes.imageUrl} width="100%"></img>
			<h4>{props.shoes.title}</h4>
			<h5>₩ {props.shoes.price}</h5>
		</div>
	);
}

export default ShoesItem;
