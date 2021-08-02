import { Navbar, Container, Nav } from 'react-bootstrap';
import 'antd/dist/antd.css';
import { Button } from 'antd';
import './App.css';

function App() {
	return (
		<div className="App">
			<>
				<Navbar bg="dark" variant="dark">
					<Container>
						<Navbar.Brand href="#home">Navbar</Navbar.Brand>
						<Nav className="me-auto">
							<Nav.Link href="#home">Home</Nav.Link>
							<Nav.Link href="#features">Features</Nav.Link>
							<Nav.Link href="#pricing">Pricing</Nav.Link>
						</Nav>
					</Container>
				</Navbar>
				<br />
				<div className="welcomePage">
					<h1>Hello Astronaut!</h1>
					<p>This is a simple shop for Astronauts</p>
					<Button className="welcomePage__btn" type="primary">
						Primary Button
					</Button>
				</div>
				<div className="container">
					<div className="row">
						<div className="col-md-4">a</div>
						<div className="col-md-4">a</div>
						<div className="col-md-4">a</div>
					</div>
				</div>
			</>
		</div>
	);
}

export default App;
