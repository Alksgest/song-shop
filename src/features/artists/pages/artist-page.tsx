import { Artist } from '@/types/models';
import { styled } from '@mui/material';
import { ArtistPaper } from '@/features/artists/components/artist-paper';
import { SongsBlock } from '@/features/shared/components';

type Props = {
	artist: Artist;
}

export const ArtistPage: React.FC<Props> = ({ artist }) => {
	return (
		<Container>
			<ArtistPaper artist={artist} />
			<SongsBlock artistId={artist?.id} />
		</Container>
	);
};

const Container = styled('div')(() => {
	return {
		display: 'flex',
		padding: '10px',
		alignItems: 'center',
		flexDirection: 'column',
	};
});

