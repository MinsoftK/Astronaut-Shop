import React from 'react';
import { Carousel } from 'react-bootstrap';
import styled from 'styled-components';

const Title = styled.h5`
	color: white;
`;
const style = { width: '80%', height: '80%', margin: 'auto' };

const ShoesSlide = (props) => {
	return (
		<Carousel style={style}>
			{props.img.map((url, i) => {
				return (
					<Carousel.Item key={i}>
						<img className="d-block w-100" src={url} alt="{i}slide" />
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
