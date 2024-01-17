import { Song } from '@/types/models';
import { styled } from '@mui/material';
import { EmptyHeartIcon, FilledHeartIcon } from '@/ui/atoms/icons';
import Image from 'next/image';

type Props = {
	song: Song;
	isFavorite: boolean;
	toggleSong: (artistId: string, songId: string) => void
}

export const SongLine: React.FC<Props> = ({ song, isFavorite, toggleSong }) => {

	return (
		<Container>
			<CenteredContainer>
				{isFavorite ? <FilledHeartIcon onClick={() => toggleSong(song.artistId, song.id)} /> :
					<EmptyHeartIcon onClick={() => toggleSong(song.artistId, song.id)} />}
			</CenteredContainer>
			<Image src={song.cover} alt={song.name} width={60} height={60} />
			<TextContainer>
				<CenteredContainer>
					{song.name}
				</CenteredContainer>
				<CenteredContainer>
					{song.duration}
				</CenteredContainer>
			</TextContainer>
		</Container>
	);
};

const Container = styled('div')(() => {
	return {
		display: 'flex',
		width: '500px',
		margin: '5px',
	};
});

const CenteredContainer = styled('div')(() => {
	return {
		display: 'flex',
		alignItems: 'center',
		padding: '5px',
	};
});

const TextContainer = styled('div')(() => {
	return {
		display: 'flex',
		alignItems: 'center',
		width: '100%',
		justifyContent: 'space-between',
	};
});