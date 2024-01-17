import {GetServerSidePropsContext, NextPage} from "next";
import {ArtistPage} from "@/features/artists/pages";
import {artistApiClient} from "@/api/artist-api-client";
import {Artist} from "@/types/models";

type Props = {
    artist: Artist;
}

const Page: NextPage<Props> = ({artist}) => {
    return <ArtistPage artist={artist}/>
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const id = context.params?.id
    const artist = await artistApiClient.getArtistById(id as string);
    return {props: {artist}}
}

export default Page;

