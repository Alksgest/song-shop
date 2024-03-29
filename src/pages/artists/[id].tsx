import { GetServerSidePropsContext, Metadata, NextPage } from 'next';
import { ArtistPage } from '@/features/artists/pages';
import { artistApiClient } from '@/api/artist-api-client';
import { Artist } from '@/types/models';
import Head from 'next/head';

type Props = {
	artist: Artist;
};

const Page: NextPage<Props> = ({ artist }) => {
	return (
		<>
			<Head>
				<title>{artist.name}</title>
			</Head>
			<ArtistPage artist={artist} />
		</>
	);
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const id = context.params?.id;
	const artist = await artistApiClient.getArtistById(id as string);

	if (!artist) {
		return {
			redirect: {
				permanent: false,
				destination: '/artists/not-found',
			},
		};
	}

	return { props: { artist: artist || null } };
}

export async function generateMetadata({ artist }: Props): Promise<Metadata> {
	return {
		title: artist.name,
	};
}

export default Page;
