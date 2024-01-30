import { NextPage } from 'next';
import { ArtistsPage } from '@/features/artists/pages/artists-page';
import Head from 'next/head';

const Page: NextPage = () => {
	return (
		<>
			<Head>
				<title>Artists</title>
			</Head>
			<ArtistsPage />
		</>
	);
};

export default Page;
