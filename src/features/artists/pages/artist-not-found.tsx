import { styled } from '@mui/material';
import Image from 'next/image';

export const ArtistNotFoundPage: React.FC = () => {
	return (<Container>
		<Image src="https://kindpng.com/picc/m/104-1047042_cryingcat-181-kb-crying-cat-meme-png-transparent.png" width={200} height={200} alt="Cryingcat"	/>
		<div>
			Artist is not found :(
		</div>
	</Container>);
};

const Container = styled('div')(() => {
	return {
		width: '100%',
		height: '100%',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'column'
	};
});