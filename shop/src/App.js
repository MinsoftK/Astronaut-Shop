/* eslint-disable */
import { Navbar, Container, Nav } from 'react-bootstrap';
import 'antd/dist/antd.css';
import { Button } from 'antd';
import './App.css';
import './container/ShoesData';

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
						<div className="col-md-4">
							<img
								src="https://cueren.com/wp-content/uploads/2021/03/MQB07-CRES-1.jpg"
								width="100%"></img>
							<h4>상품명</h4>
							<p>상품설명 & 가격</p>
						</div>

						<div className="col-md-4">
							<img
								src="https://cueren.com/wp-content/uploads/2019/10/MBT10-CRES-1.jpg"
								width="100%"></img>
							<h4>상품명</h4>
							<p>상품설명 & 가격</p>
						</div>
						<div className="col-md-4">
							<img
								src="https://cueren.com/wp-content/uploads/2019/10/MLD09-CRBK-1.jpg"
								width="100%"></img>
							<h4>상품명</h4>
							<p>상품설명 & 가격</p>
						</div>
					</div>
				</div>
			</>
			<div class="no-display">화면이 너무 작습니다. </div>
		</div>
	);
}

export default App;
