import {Artist} from "@/types/models";
import {Paper, styled} from "@mui/material";
import Image from "next/image";

type Props = {
    artist: Artist;
}

export const ArtistPaper: React.FC<Props> = ({artist}) => {
    return (
        <StyledPaper variant="elevation">
            <Image src={artist.avatar} alt={artist.name} width={40} height={40}/>
            <div>{artist.name}</div>
        </StyledPaper>
    )
}

const StyledPaper = styled(Paper)(() => ({
    width: 120,
    height: 120,
    textAlign: 'center',
}));