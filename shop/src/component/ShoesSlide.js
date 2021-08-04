import React from 'react';
import { Carousel } from 'react-bootstrap';

const ShoesSlide = (props) => {
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
							<h5>Astronuat's story</h5>
							<p>We are Free in Universe</p>
						</Carousel.Caption>
					</Carousel.Item>
				);
			})}
		</Carousel>
	);
};
export default ShoesSlide;
