import Head from 'next/head';
import { Inter } from 'next/font/google';
import { ArtistsPage } from '@/features/artists/pages/artists-page';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
	return (
		<>
			<Head>
				<title>Create Next App</title>
				<meta name="description" content="Song shop APP" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main>
				<ArtistsPage />
			</main>
		</>
	);
}
