import styled from 'styled-components';

export const Board = styled.div`
	background-color: ${(props) => props.theme.boardColor};
	width: 100%;
	height: 500px;
	border-radius: 20px;
	padding: 40px;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;
