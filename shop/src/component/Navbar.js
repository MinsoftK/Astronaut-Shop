import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Navbar.scss';

const Navigator = () => {
	return (
		<Navbar bg="dark" variant="dark">
			<Container>
				<Navbar.Brand>
					<Link to="/">Astronaut</Link>
				</Navbar.Brand>
				<Nav className="me-auto">
					<Nav.Link>
						<Link to="/menshoes">Men's Shoes</Link>
					</Nav.Link>
					<Nav.Link>
						<Link to="womenshoes">Woman's Shoes</Link>
					</Nav.Link>
					<Nav.Link>
						<Link to="/about">About</Link>
					</Nav.Link>
				</Nav>
			</Container>
		</Navbar>
	);
};
export default Navigator;
