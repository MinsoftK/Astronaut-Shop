/* eslint-disable */
import React from 'react';

function ShoesItem(props) {
	return (
		<div className="col-md-4">
			{console.log('test', props)}
			<img src={'./img/cshoes' + props.num + 'jpg'} width="100%"></img>
			<h4>{props.shoes.title}</h4>
			<h5>가격:{props.shoes.price}</h5>
			<h5
				onClick={() => {
					setModal(!modal);
				}}>
				상세설명
			</h5>
		</div>
	);
}

export default ShoesItem;
