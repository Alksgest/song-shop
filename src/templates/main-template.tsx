import {Box, FormControlLabel, FormGroup, Switch} from "@mui/material";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {HeartWithNumber} from "@/ui/atoms/heart-with-number";

type Props = {
    children: React.ReactNode;
};

export const MainTemplate: React.FC<Props> = ({children}) => {
    return (
        <>
            <Box sx={{flexGrow: 1}}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{mr: 2}}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                            Photos
                        </Typography>
                        <HeartWithNumber number={139}/>
                    </Toolbar>
                </AppBar>
            </Box>
            {children}
        </>
    );
}