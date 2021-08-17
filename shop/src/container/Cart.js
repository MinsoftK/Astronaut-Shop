import React, { useEffect, useState, memo } from 'react';
import { Table, Button } from 'react-bootstrap';
import { Checkbox } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import './Cart.css';
const Cart = memo((props) => {
	let state = useSelector(
		(state) =>
			//redux안에 있던 모든 state
			state.remainReducer
	);
	let dispatch = useDispatch();
	let [pay, setPay] = useState(0);
	let total = 0;

	useEffect(() => {
		console.log('훅을 이용해 redux state 가져오기', state);
		console.log('state', state);
		setPay(total);
	}, []);
	const onChange = (e) => {
		console.log(`checked = ${e.target.checked}`);
	};
	return (
		<>
			<Table className="cart-display-item" bordered>
				<thead>
					<tr>
						<th>선택</th>
						<th>상품이미지</th>
						<th>상품명</th>
						<th>수량</th>
						<th>결제금액</th>
						<th>삭제</th>
					</tr>
				</thead>
				<tbody>
					{state.map((item, i) => {
						total += item.price * item.quan;
						return (
							<tr key={i}>
								<td>
									<Checkbox onChange={onChange}></Checkbox>
								</td>
								<td>
									<img
										style={{ width: '250px', height: '250px' }}
										src={item.imageUrl}></img>
								</td>
								<td>{item.name}</td>
								<td>
									<Button
										variant="info"
										onClick={() => {
											dispatch({ type: '수량감소', data: i });
											setPay(pay - item.price);
										}}>
										-
									</Button>
									{' ' + item.quan + ' '}
									<Button
										variant="info"
										onClick={() => {
											dispatch({ type: '수량증가', data: i });
											setPay(pay + item.price);
										}}>
										+
									</Button>
								</td>
								<td>
									{'₩ ' +
										item.price
											.toString()
											.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}
								</td>
								<td>
									<Button
										variant="danger"
										onClick={() => {
											dispatch({ type: '항목삭제', data: i });
											setPay(pay - item.price * item.quan);
										}}>
										X
									</Button>
								</td>
							</tr>
						);
					})}
				</tbody>
			</Table>
			<div className="payment">
				<span>총 결제금액 : </span>
				<span>
					{'₩ ' +
						pay.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',') +
						'원'}
				</span>
				<div>
					<Button variant="primary" style={{ marginTop: '20px' }}>
						결제
					</Button>
				</div>
			</div>
		</>
	);
});
// const 함수명 = (state) => {
// 	console.log('state', state);
// 	return {
// 		state: state.remainReducer,
// 		alert: state.alert,
// 	};
// };
// export default connect(함수명)(Cart);
export default Cart;
