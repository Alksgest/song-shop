import { NextPage } from 'next';
import { FavoriteSongsListPage } from '@/features/songs/pages';
import Head from 'next/head';

const Page: NextPage = () => {
	return (
		<>
			<Head>
				<title>Favorites</title>
			</Head>
			<FavoriteSongsListPage />
		</>
	);
};

export default Page;
