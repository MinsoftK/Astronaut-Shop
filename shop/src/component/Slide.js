import React from 'react';
import { Carousel } from 'react-bootstrap';

const Slide = (props) => {
	return (
		<Carousel variant="dark">
			{props.img.map((url) => {
				return (
					<Carousel.Item>
						<img
							className="d-block w-100"
							src={url}
							alt="First slide"
							width="100%"
							height="100%"
						/>
						<Carousel.Caption>
							<h5>First slide label</h5>
							<p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
						</Carousel.Caption>
					</Carousel.Item>
				);
			})}
		</Carousel>
	);
};
export default Slide;
