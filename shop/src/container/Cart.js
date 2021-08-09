import React from 'react';
import { Table } from 'react-bootstrap';
import { connect } from 'react-redux';

const Cart = (props) => {
	return (
		<>
			<Table striped bordered hover>
				<thead>
					<tr>
						<th>#</th>
						<th>상품명</th>
						<th>수량</th>
						<th>변경</th>
					</tr>
				</thead>
				<tbody>
					{props.state.map((item, i) => {
						return (
							<tr key={i}>
								<td>{item.id}</td>
								<td>{item.name}</td>
								<td>{item.remain}</td>

								<td>
									<button
										onClick={() => {
											props.dispatch({ type: '수량증가' });
										}}>
										+
									</button>
									<button
										onClick={() => {
											props.dispatch({ type: '수량감소' });
										}}>
										-
									</button>
								</td>
							</tr>
						);
					})}
				</tbody>
			</Table>
			{props.alert ? (
				<div className="my-alert2">
					<p>지금 구매하면 할인</p>
					<button
						onClick={() => {
							props.dispatch({ type: '알림닫기' });
						}}>
						닫기
					</button>
				</div>
			) : null}
		</>
	);
};
const 함수명 = (state) => {
	console.log('state', state);
	return {
		state: state.remainReducer,
		alert: state.alert,
	};
};
export default connect(함수명)(Cart);
// export default Cart;
