import styled from 'styled-components';

export const OtpWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	.input {
        cursor:pointer;
		height: 3rem;
		width: 3rem;
		border: 1px solid rgba(205, 191, 222, 0.7);
		border-radius: 8px;
		background: transparent;
		text-align: center;
		font-size: 1.5rem;
		padding: 0;
		margin: 0;
		font-weight: 600;
		color: #ffffff;
		caret-color: transparent;
	}
	textarea:focus,
	input:focus {
		outline: 1px solid #ffffff;
	}
`;
