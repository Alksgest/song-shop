import React, { useEffect } from 'react';
import { artistApiClient } from '@/api/artist-api-client';
import { styled } from '@mui/material';
import { ArtistPaper } from '@/features/artists/components/artist-paper';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { refetchArtists, setIsArtistsLoading } from '@/redux/reducers/artists-reducer';
import { setAppTitle } from '@/redux/reducers/app-settings-reducer';

const pageTitle = 'Artists';

export const ArtistsPage: React.FC = () => {
	const dispatch = useAppDispatch();
	const { data, isLoaded, isLoading } = useAppSelector(state => state.artists);

	useEffect(() => {
		dispatch(setAppTitle(pageTitle));
	}, [dispatch]);

	useEffect(() => {
		if (isLoaded) {
			return;
		}

		artistApiClient.getArtistList().then((data) => {
			dispatch(setIsArtistsLoading());
			dispatch(refetchArtists());
		});
	}, [dispatch, isLoaded]);

	if (isLoading && !isLoaded) {
		return <></>;
	}

	return (
		<ArtistsContainer>
			{data.map(el => {
				return (
					<React.Fragment key={el.id}>
						<Link href={`artists/${el.id}`}>
							<ArtistPaper key={el.id} artist={el} />
						</Link>
					</React.Fragment>
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

