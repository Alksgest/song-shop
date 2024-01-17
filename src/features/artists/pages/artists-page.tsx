import { useEffect, useState } from 'react';
import { Artist } from '@/types/models';
import { artistApiClient } from '@/api/artist-api-client';
import { Stack, styled } from '@mui/material';
import { ArtistPaper } from '@/features/artists/components/artist-paper';
import Link from 'next/link';

export const ArtistsPage: React.FC = () => {
	const [artists, setArtists] = useState<Artist[]>([]);

	useEffect(() => {
		artistApiClient.getArtistList().then((data) => {
			setArtists(data);
		});
	}, []);

	return (
		<ArtistsContainer>
			{artists.map(el => {
				return (
					<>
						<Link href={`artists/${el.id}`}>
							<ArtistPaper key={el.id} artist={el} />
						</Link>
					</>
				);
			})}
		</ArtistsContainer>
	);
};

const ArtistsContainer = styled('div')(() => {
	return {
		display: 'flex',
		padding: '10px',
		gap: '20px',
	};
});

