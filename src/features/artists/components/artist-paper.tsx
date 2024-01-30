import { Artist } from '@/types/models';
import { styled, useMediaQuery } from '@mui/material';
import Image from 'next/image';
import { useMemo } from 'react';

type Props = {
	artist?: Artist;
};

const smallImageSize = {
	w: 80,
	h: 80,
};

const bigImageSize = {
	w: 120,
	h: 120,
};

export const ArtistPaper: React.FC<Props> = ({ artist }) => {
	const isMobile = useMediaQuery('(max-width:600px)');

	const imageSize = useMemo(() => {
		if (isMobile) {
			return smallImageSize;
		}

		return bigImageSize;
	}, [isMobile]);

	if (!artist) {
		return <></>;
	}

	return (
		<ArtistContainer>
			<StyledImage src={artist.avatar} alt={artist.name} width={imageSize.w} height={imageSize.h} />
			<NameContainer>{artist.name}</NameContainer>
		</ArtistContainer>
	);
};

const ArtistContainer = styled('div')(({ theme }) => ({
	width: 200,
	height: 200,
	textAlign: 'center',
	padding: '5px',
	cursor: 'pointer',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center',
	'&:hover': {
		background: '#F0FFFF',
	},
	border: 'solid 2px black',
	[theme.breakpoints.down('sm')]: {
		width: 150,
		height: 150,
	},
}));

const NameContainer = styled('div')(() => {
	return {
		paddingTop: '4px',
		fontSize: '24px',
		color: 'black',
	};
});

const StyledImage = styled(Image)(() => {
	return {
		borderRadius: '50%',
	};
});
