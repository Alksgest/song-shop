import { styled } from '@mui/material';
import Image from 'next/image';
import { ArtistPaper } from '@/features/artists/components/artist-paper';
import { useMemo } from 'react';
import { Artist } from '@/types/models';

export const ArtistNotFoundPage: React.FC = () => {
	const artist: Artist = useMemo(() => {
		return {
			id: '-1',
			name: 'Not Found',
			avatar:
				'https://kindpng.com/picc/m/104-1047042_cryingcat-181-kb-crying-cat-meme-png-transparent.png',
			songsCount: '0',
		};
	}, []);

	return (
		<Container>
			<ArtistPaper artist={artist} />
		</Container>
	);
};

const Container = styled('div')(() => {
	return {
		height: 'calc(100% - 200px)',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'column',
	};
});
