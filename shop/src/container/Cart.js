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

	let [selectPay, setSelectPay] = useState(0); //선택한 전체 상품 가격을 저장하는 state
	let [isselect, setIsSelect] = useState([]); //체크박스가 선택되었는지 저장하는 state

	//처음 렌더링될 때
	useEffect(() => {
		console.log('훅을 이용해 redux state 가져오기', state);
		console.log('state', state);

		//렌더링될때 상품의 개수만큼 checkbox state를 저장할 obj 생성
		let copy = [];
		for (let i = 0; i < state.length; i++) copy.push(false);
		setIsSelect(copy);
	}, []);

	//체크박스 체크시 state에 따라 총 상품금액 결정
	const onChange = (e) => {
		console.log(`checked = ${e.target.checked} , i = ${e.target.checkNumber}`);
		let copy = [...isselect];
		//copy의 checkNumber 인덱스 값을 변경해준다.
		copy[e.target.checkNumber] = e.target.checked;

		if (e.target.checked === true) {
			//체크박스가 체크되었을때 해당 상품 총 금액을 더해준다.
			setSelectPay(selectPay + e.target.item.price * e.target.item.quan);
		} else if (e.target.checked === false) {
			//체크박스가 체크되었을때 해당 상품 총 금액을 빼준다.
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
						//redux의 상품들 (장바구니에 저장된 상품들)
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
										style={{ width: '220px', height: '220px' }}
										src={item.imageUrl}></img>
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
									{' ' + item.quan + ' '}
									<Button
										variant="light"
										onClick={() => {
											dispatch({ type: '수량증가', data: i });
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
