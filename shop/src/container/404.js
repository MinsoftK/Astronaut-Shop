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
	return (
		<>
			<PageBox>
				<Page>잘못된 페이지입니다! 5초뒤에 메인 페이지로 이동합니다.</Page>
			</PageBox>
		</>
	);
};
export default Notfound;
