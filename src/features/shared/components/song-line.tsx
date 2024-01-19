import { styled } from '@mui/material';
import { EmptyHeartIcon, FilledHeartIcon } from '@/ui/atoms/icons';
import Image from 'next/image';
import { FavoriteSong } from '@/types/ui';

type Props = {
	song: FavoriteSong;
	displayArtistName?: boolean;
	toggleSong: (artistId: string, songId: string) => void
}

export const SongLine: React.FC<Props> = ({ song, toggleSong, displayArtistName }) => {
	return (
		<Container>
			<CenteredContainer>
				{song.isFavorite ? <FilledHeartIcon onClick={() => toggleSong(song.artistId, song.id)} /> :
					<EmptyHeartIcon onClick={() => toggleSong(song.artistId, song.id)} />}
			</CenteredContainer>
			<Image src={song.cover} alt={song.name} width={60} height={60} />
			<TextContainer>
				<CenteredContainer>
					<div>
						{displayArtistName && (<div>{song.artistName}</div>)}
						<div>{song.name}</div>
					</div>
				</CenteredContainer>
				<CenteredContainer>
					{song.duration}
				</CenteredContainer>
			</TextContainer>
		</Container>
	);
};

const Container = styled('div')(({ theme }) => {
	return {
		display: 'flex',
		width: '500px',
		margin: '5px',
		[theme.breakpoints.down('sm')]: {
			width: "350px",
		},
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