import {styled} from "@mui/material";
import {FilledHeartIcon} from "@/ui/atoms/icons";

type Props = {
    number: number;
}

export const HeartWithNumber: React.FC<Props> = ({number}) => {
    return (
        <Container>
            <FilledHeartIcon/>
            <NumberContainer>
                {number}
            </NumberContainer>
        </Container>
    )
}

const Container = styled("div")(() => {
    return {
        position: "relative",
        display: "inline-block"
    }
})

const NumberContainer = styled("div")(() => {
    return {
        position: "absolute",
        bottom: 0,
        right: -4,
        background: "black",
        borderRadius: "50%",
        width: "15px",
        height: "15px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "10px",
    }
})