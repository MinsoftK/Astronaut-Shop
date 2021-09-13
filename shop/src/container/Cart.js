import React, { useEffect, useState, memo, useRef } from 'react';
import { Table, Button } from 'react-bootstrap';
import { Checkbox } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import './Cart.css';

const Cart = memo((props) => {
	let reduxstate = useSelector(
		(state) =>
			//redux안에 있던 모든 state
			state.remainReducer
	);
	let dispatch = useDispatch();

	let [selectPay, setSelectPay] = useState(0); //각각의 상품 가격을 저장하는 state
	let [isselect, setIsSelect] = useState([]); //체크박스가 선택되었는지 저장하는 state
	let [totalPay, setTotalPay] = useState(0); //선택한 상품의 총 결제 금액을 저장
	let [allSelect, setAllSelect] = useState(false); //전체선택 기능
	const checkBoxChange = useRef();
	//처음 렌더링될 때
	useEffect(() => {
		console.log('redux state 가져오기', reduxstate);

		//렌더링될때 상품의 개수만큼 checkbox state를 저장할 obj 생성
		let copybox = [];
		let copypay = [];
		for (let i = 0; i < reduxstate.length; i++) {
			copybox.push(false); //선택 박스 false 초기화
			copypay.push(reduxstate[i].price * reduxstate[i].quan); // 상품 각각의 결제가격 초기화
		}
		console.log(copybox);
		setIsSelect(copybox);
		setSelectPay(copypay);
	}, []);

	//선택된 상품이나 가격이 변할 때, 총 결제금액 렌더링
	useEffect(() => {
		console.log('체크박스 선택 list', isselect);
		console.log('상품 가격 선택 list', selectPay);

		// check된 상품의 체크 표시하기
		// for (let i = 0; i < reduxstate.length; i++) {
		// 	if (isselect[i] === true) {
		// 	}
		// }

		// check 된 상품의 가격을 더하기
		let total = 0;
		for (let i = 0; i < reduxstate.length; i++) {
			if (isselect[i] === true) {
				total += selectPay[i];
			}
		}
		setTotalPay(total);
	}, [isselect, selectPay]);

	//상품 전체 선택
	const onAllChange = (e) => {
		console.log(checkBoxChange);
		checkBoxChange.current.state.checked = e.target.checked;
		console.log(checkBoxChange);
		console.log(e);
		let copy = [...isselect];
		for (let i = 0; i < copy.length; i++) {
			copy[i] = e.target.checked;
		}
		console.log(copy);
		setIsSelect(copy);
		setAllSelect(e.target.checked);
	};

	//체크된 상품의 총 상품금액 업데이트
	const onChange = (e) => {
		console.log(`checked = ${e.target.checked} , i = ${e.target.checkNumber}`);
		//copy의 checkNumber 인덱스 값을 변경해준다.
		let copy = [...isselect];
		copy[e.target.checkNumber] = e.target.checked;
		setIsSelect(copy);
	};
	const onClickBtn = (i) => {
		//상품의 개수가 1보다 크고, 상품이 선택되었을 때만 가격을 변경해준다.
		let pay = [...selectPay];
		pay[i] = reduxstate[i].quan * reduxstate[i].price;
		setSelectPay(pay);
	};
	const onDelete = (i) => {
		let list = [...isselect];
		let pay = [...selectPay];
		list.splice(i, 1);
		pay.splice(i, 1);
		setIsSelect(list);
		setSelectPay(pay);
	};
	return (
		<>
			<Table className="cart-display-item" bordered>
				<thead>
					<tr>
						<th>
							전체선택
							<br />
							<Checkbox ref={checkBoxChange} onChange={onAllChange}></Checkbox>
						</th>
						<th>상품정보</th>
						<th>상품명</th>
						<th>수량</th>
						<th>판매금액</th>
						<th>삭제</th>
					</tr>
				</thead>
				<tbody>
					{reduxstate.map((item, i) => {
						//redux의 상품들 (장바구니에 저장된 상품들)
						let total = item.price * item.quan;
						return (
							<tr key={i}>
								<td>
									<Checkbox
										checkNumber={i}
										item={item}
										onChange={onChange}
									></Checkbox>
								</td>
								<td>
									<img
										style={{ height: '10rem', width: '10rem' }}
										src={item.imageUrl}
										alt="..."
									></img>
								</td>
								<td>{item.name}</td>
								<td>
									<Button
										variant="light"
										onClick={() => {
											dispatch({
												type: '수량감소',
												data: i,
											});
											onClickBtn(i);
										}}
									>
										-
									</Button>
									{' ' + item.quan + ' '}
									<Button
										variant="light"
										onClick={() => {
											console.log('isselect[i]', isselect[i], i);
											dispatch({ type: '수량증가', data: i });
											onClickBtn(i);
										}}
									>
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
											onDelete(i);
										}}
									>
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
					{totalPay.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',') +
						'원'}
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
// redux 훅 사용으로 인한 삭제
// const 함수명 = (state) => {
// 	console.log('state', state);
// 	return {
// 		state: state.remainReducer,
// 		alert: state.alert,
// 	};
// };
// export default connect(함수명)(Cart);
export default Cart;
