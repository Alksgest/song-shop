import { Artist } from '@/types/models';
import { styled } from '@mui/material';
import Image from 'next/image';

type Props = {
	artist?: Artist;
}

export const ArtistPaper: React.FC<Props> = ({ artist }) => {
	if (!artist) {
		return <></>;
	}

	return (
		<ArtistContainer>
			<StyledImage src={artist.avatar} alt={artist.name} width={120} height={120} />
			<NameContainer>{artist.name}</NameContainer>
		</ArtistContainer>
	);
};

const ArtistContainer = styled('div')(() => ({
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
	background: 'white',
	border: 'solid 2px black',
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
		// borderRadius: "2px",
		// border: "solid 2px black"
	};
});