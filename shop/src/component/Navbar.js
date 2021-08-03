import { Navbar, Container, Nav } from 'react-bootstrap';

const Navigator = () => {
	return (
		<Navbar bg="dark" variant="dark">
			<Container>
				<Navbar.Brand href="#home">Astronaut</Navbar.Brand>
				<Nav className="me-auto">
					<Nav.Link href="#home">Men's Shoes</Nav.Link>
					<Nav.Link href="#features">Woman's Shoes</Nav.Link>
					<Nav.Link href="#pricing">About</Nav.Link>
				</Nav>
			</Container>
		</Navbar>
	);
};
export default Navigator;
