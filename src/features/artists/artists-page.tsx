import {useEffect, useState} from "react";
import {Artist} from "@/types/models";
import {artistApiClient} from "@/api/artist-api-client";
import {Stack} from "@mui/material";
import {ArtistPaper} from "@/features/artists/components/artist-paper";

export const ArtistsPage: React.FC = () => {
    const [artists, setArtists] = useState<Artist[]>([]);

    useEffect(() => {
        artistApiClient.getList().then((data) => {
            setArtists(data);
        });
    }, [])

    return (
        <Stack direction="row" spacing={2}>
            {artists.map(el => {
                return <ArtistPaper key={el.id} artist={el}/>
            })}
        </Stack>
    );
}

