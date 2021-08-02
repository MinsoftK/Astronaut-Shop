import React, { useState } from 'react';

const Modal = () => {
	return <div></div>;
};

const ShoesItem = (props) => {
	let [modal, setModal] = useState(false);
	return (
		<div className="col-md-4">
			<img src={props.imageUrl} width="100%"></img>
			<h4>{props.title}</h4>
			<p>가격:{props.price}</p>
			<h5
				onClick={() => {
					setModal(!modal);
				}}>
				상세설명
			</h5>
			{modal ? <Modal des={props.des}></Modal> : null}
		</div>
	);
};

export default ShoesItem;
