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
	let [selectPay, setSelectPay] = useState(0); //선택한 전체 상품 가격
	let [isselect, setIsSelect] = useState([]);
	useEffect(() => {
		console.log('훅을 이용해 redux state 가져오기', state);
		console.log('state', state);

		// setPay(total);
		let copy = [];
		for (let i = 0; i < state.length; i++) {
			copy.push(false);
		}
		setIsSelect(copy);
		console.log('copy', copy);
	}, []);

	//체크박스 체크시 pay에 해당 상품의 total 값을 더해야 한다.
	const onChange = (e) => {
		console.log(`checked = ${e.target.checked} , i = ${e.target.checkNumber}`);

		let copy = [...isselect];
		copy[e.target.checkNumber] = e.target.checked;
		if (e.target.checked === true) {
			console.log('true일 경우에');
			setSelectPay(selectPay + e.target.item.price * e.target.item.quan);
		} else if (e.target.checked === false) {
			console.log('false일 경우에');
			setSelectPay(selectPay - e.target.item.price * e.target.item.quan);
		} else {
			alert('잘못된 선택입니다.');
		}
	};
	return (
		<>
			<Table className="cart-display-item" bordered>
				<thead>
					<tr>
						<th>선택</th>
						<th>상품정보</th>
						<th>상품명</th>
						<th>수량</th>
						<th>판매금액</th>
						<th>삭제</th>
					</tr>
				</thead>
				<tbody>
					{state.map((item, i) => {
						let total = item.price * item.quan;
						return (
							<tr key={i}>
								<td>
									<Checkbox
										checkNumber={i}
										item={item}
										onChange={onChange}></Checkbox>
								</td>
								<td>
									<img
										style={{ width: '250px', height: '250px' }}
										src={item.imageUrl}></img>
								</td>
								<td>{item.name}</td>
								<td>
									<Button
										variant="light"
										onClick={() => {
											dispatch({ type: '수량감소', data: i });
											// if (isselect[i] === true) setPay(pay - item.price);
										}}>
										-
									</Button>
									{' ' + item.quan + ' '}
									<Button
										variant="light"
										onClick={() => {
											dispatch({ type: '수량증가', data: i });
											// if (isselect[i] === true) setPay(pay + item.price);
											// setPay(pay + item.price);
										}}>
										+
									</Button>
								</td>
								<td>
									{total
										.toString()
										.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',') + '원'}
								</td>
								<td>
									<Button
										variant="danger"
										onClick={() => {
											dispatch({ type: '항목삭제', data: i });
											// setPay(pay - item.price * item.quan);
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
					{selectPay
						.toString()
						.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',') + '원'}
				</span>
				<div>
					<Button variant="danger" style={{ marginTop: '20px' }}>
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
