import React from 'react';
import { Carousel } from 'react-bootstrap';
import styled from 'styled-components';

const Title = styled.h5`
	color: white;
`;

const ShoesSlide = (props) => {
	return (
		<Carousel>
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
							<Title>Astronuat's story</Title>
							<p>We are Free in Universe</p>
						</Carousel.Caption>
					</Carousel.Item>
				);
			})}
		</Carousel>
	);
};
export default ShoesSlide;
