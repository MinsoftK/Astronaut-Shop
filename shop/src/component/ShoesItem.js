/* eslint-disable */
import './ShoesItem.css';
import React, { useState } from 'react';
import ShoesDetail from './ShoesDetail';
import { Link } from 'react-router-dom';

function ShoesItem(props) {
	return (
		<div className="col-md-4">
			<img
				src={
					'https://github.com/MinsoftK/react/blob/main/shop/src/img/cshoes' +
					props.num +
					'.jpg?raw=true'
				}
				width="100%"></img>
			<h4>{props.shoes.title}</h4>
			<h5>₩ {props.shoes.price}</h5>
		</div>
	);
}

export default ShoesItem;
