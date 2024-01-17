import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import {styled} from "@mui/material";


export const FilledHeartIcon = styled(FavoriteIcon)(() => {
    return {
        color: "red"
    }
})

export const EmptyHeartIcon = styled(FavoriteBorderIcon)(() => {
    return {
        color: "red"
    }
})