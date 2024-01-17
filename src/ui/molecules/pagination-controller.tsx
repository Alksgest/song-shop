import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { keyframes } from '@emotion/react';
import { styled } from '@mui/material';
import { useMemo } from 'react';

type Props = {
	currentPage: number;
	setPage: (value: number) => void;
};

export const PaginationController: React.FC<Props> = ({ currentPage, setPage }) => {
	const isLeftArrowDisabled = useMemo(() => {
		return currentPage <= 1;
	}, [currentPage]);

	return (
		<Flexbox>
			<PaginationSelectorBox disabled={isLeftArrowDisabled}
														 onClick={() => !isLeftArrowDisabled && setPage(currentPage - 1)}>
				<CenteredDiv>
					<ArrowBackIcon />
				</CenteredDiv>
			</PaginationSelectorBox>
			<PaginationSelectorBox disabled>
				<CenteredDiv>{currentPage}</CenteredDiv>
			</PaginationSelectorBox>
			<PaginationSelectorBox disabled={false} onClick={() => setPage(currentPage + 1)}>
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

const colorGradient = keyframes`
    from {
        background: 'white';
    }
    to {
        background: 'lightGray';
    }
`;

const CenteredDiv = styled('div')(() => {
	return {
		position: 'absolute',
		top: '50%',
		left: '50%',
		fontWeight: 'bold',
		transform: 'translate(-50%, -50%)',
	};
});

const PaginationSelectorBox = styled('div')<{ disabled: boolean }>(({ disabled }) => {
		return {
			position: 'relative',
			width: '2rem',
			height: '2rem',
			cursor: 'pointer',
			disabled: disabled,

			'&:hover': {
				animation: '${colorGradient} 1s',
				animationFillMode: 'forwards',
			},
		};
	},
);

