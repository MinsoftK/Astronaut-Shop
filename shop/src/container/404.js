import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

let PageBox = styled.div`
	height: 80vh;
	display: flex;
	justify-content: center;
	align-item: center;
`;

let Page = styled.div`
	font-size: 1.5rem;
	margin: auto;
`;

const Notfound = () => {
	let [count, setCount] = useState(5);
	let history = useHistory();

	useEffect(() => {
		let Count = () => {
			setTimeout(() => {
				setCount(count - 1);
			}, 1000);
		};
		let clearTime = () => {
			clearTimeout(Count);
		};
		//count가 0보다 클때
		count > 0 && Count();
		if (count === 0) {
			history.push('/');
		}
		//반복되는 Timer 해제
		//Timer가 비동기로 처리된 뒤 마운트 해제될 때, cleartimeout 요청
		return clearTime();
	}, [count]);

	return (
		<>
			<PageBox>
				<Page>
					잘못된 페이지입니다! {count}초뒤에 메인 페이지로 이동합니다.
				</Page>
			</PageBox>
		</>
	);
};
export default Notfound;
