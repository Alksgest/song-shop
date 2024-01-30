import { CircularProgress, styled } from '@mui/material';

type Props = {
	children: React.ReactNode;
	isLoading: boolean;
};

export const CommonLoader: React.FC<Props> = ({ children, isLoading }) => {
	if (isLoading) {
		return (
			<Container>
				<CircularProgress />
			</Container>
		);
	}

	return children;
};

const Container = styled('div')(() => {
	return {
		padding: '10px',
	};
});
