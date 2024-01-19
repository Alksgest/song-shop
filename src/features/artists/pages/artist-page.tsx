import { Artist } from '@/types/models';
import { styled } from '@mui/material';
import { ArtistPaper } from '@/features/artists/components/artist-paper';
import { SongsBlock } from '@/features/shared/components';
import { useAppDispatch } from '@/redux/hooks';
import { useEffect } from 'react';
import { setAppTitle } from '@/redux/reducers/app-settings-reducer';

type Props = {
	artist: Artist;
}

export const ArtistPage: React.FC<Props> = ({ artist }) => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(setAppTitle(artist.name));
	}, [artist.name, dispatch]);

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

