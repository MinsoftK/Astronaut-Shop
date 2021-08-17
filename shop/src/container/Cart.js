import React from 'react';
import { ButtonGroup } from 'react-bootstrap';
import { Table, Button } from 'react-bootstrap';
import { connect, useDispatch, useSelector } from 'react-redux';
import './Cart.css';
const Cart = (props) => {
	let state = useSelector(
		(state) =>
			//redux안에 있던 모든 state
			state.remainReducer
	);
	let dispatch = useDispatch();
	console.log('훅을 이용해 redux state 가져오기', state);
	return (
		<>
			<Table className="cart-display-item" bordered>
				<thead>
					<tr>
						<th>#</th>
						<th>image</th>
						<th>상품명</th>
						<th>수량</th>
						<th>결제금액</th>
					</tr>
				</thead>
				<tbody>
					{state.map((item, i) => {
						return (
							<tr key={i}>
								<td>{i}</td>
								<td>
									<img src={item.imageUrl}></img>
								</td>
								<td>{item.name}</td>
								<td>
									<Button
										variant="light"
										onClick={() => {
											dispatch({ type: '수량감소', data: i });
										}}>
										-
									</Button>
									{item.remain}
									<Button
										variant="light"
										onClick={() => {
											dispatch({ type: '수량증가', data: i });
										}}>
										+
									</Button>
								</td>
								<td>{item.price}</td>
							</tr>
						);
					})}
				</tbody>
				<tbody>
					<td>총결제금액</td>
					<td>~~~</td>
				</tbody>
			</Table>
			<Button variant="primary" style={{ marginTop: '20px' }}>
				결제
			</Button>
		</>
	);
};
// const 함수명 = (state) => {
// 	console.log('state', state);
// 	return {
// 		state: state.remainReducer,
// 		alert: state.alert,
// 	};
// };
// export default connect(함수명)(Cart);
export default Cart;
