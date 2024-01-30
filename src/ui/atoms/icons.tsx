import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForward from '@mui/icons-material/ArrowForward';
import { styled } from '@mui/material';

export const FilledHeartIcon = styled(FavoriteIcon)(() => {
	return {
		color: 'red',
		cursor: 'pointer',
	};
});

export const EmptyHeartIcon = styled(FavoriteBorderIcon)(() => {
	return {
		color: 'red',
		cursor: 'pointer',
	};
});

export const BackIcon = styled(ArrowBackIcon)(() => {
	return {
		cursor: 'pointer',
	};
});

export const ForwardIcon = styled(ArrowForward)(() => {
	return {
		cursor: 'pointer',
	};
});
