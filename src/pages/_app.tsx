import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { AppWrapper } from '@/features/app/app-wrapper';
import favicon from '../../public/favicon.ico';
import Head from 'next/head';

const title = 'Song shop!';
const description = 'Test application';
const catUrl = 'https://www.publicdomainpictures.net/pictures/160000/velka/mignon-petit-chaton.jpg';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<title>Song Shop!</title>

				<meta property="og:type" content="website" />
				<meta property="site_name" content="songshop" />
				<meta property="og:site_name" content="songshop" />

				<meta property="image" content={catUrl} />
				<meta property="og:image" content={catUrl} />
				<meta name="twitter:image" content={catUrl} />

				<meta property="title" content={title} />
				<meta property="og:title" content={title} />
				<meta name="twitter:title" content={title} />

				<meta property="description" content={description} />
				<meta property="og:description" content={description} />
				<meta name="twitter:description" content={description} />
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="description" content={description} />

				<meta name="robots" content="noindex" />

				<meta
					name="keywords"
					content="song, songs, shop, artists, artist"
				/>

				<link rel="shortcut icon" href={favicon.src} />
				<link rel="preconnect" href="//www.google-analytics.com" />
			</Head>
			<AppWrapper>
				<Component {...pageProps} />
			</AppWrapper>
		</>
	);
}
