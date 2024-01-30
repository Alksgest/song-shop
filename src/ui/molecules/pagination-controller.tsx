import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { styled } from '@mui/material';

type Props = {
	currentPage: number;
	setPage: (page: number) => void;
	hasNext: boolean;
	hasPrev: boolean;
};

export const PaginationController: React.FC<Props> = ({
	currentPage,
	setPage,
	hasNext,
	hasPrev,
}) => {
	return (
		<Flexbox>
			<PaginationSelectorBox onClick={() => hasPrev && setPage(currentPage - 1)}>
				<CenteredDiv>
					<ArrowBackIcon />
				</CenteredDiv>
			</PaginationSelectorBox>
			<PaginationSelectorBox>
				<CenteredDiv>{currentPage}</CenteredDiv>
			</PaginationSelectorBox>
			<PaginationSelectorBox onClick={() => hasNext && setPage(currentPage + 1)}>
				<CenteredDiv>
					<ArrowForwardIcon />
				</CenteredDiv>
			</PaginationSelectorBox>
		</Flexbox>
	);
};

const Flexbox = styled('div')(() => {
	return {
		padding: '1rem',
		display: 'flex',
		justifyContent: 'center',
	};
});

const CenteredDiv = styled('div')(() => {
	return {
		position: 'absolute',
		top: '50%',
		left: '50%',
		fontWeight: 'bold',
		transform: 'translate(-50%, -50%)',
	};
});

const PaginationSelectorBox = styled('div')(() => {
	return {
		position: 'relative',
		width: '2rem',
		height: '2rem',
		cursor: 'pointer',
	};
});
