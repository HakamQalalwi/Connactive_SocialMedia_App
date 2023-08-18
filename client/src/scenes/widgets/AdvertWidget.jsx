import { Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";

const AdvertWidget = () => {
    const { palette } = useTheme();
    const dark = palette.neutral.dark;
    const main = palette.neutral.main;
    const medium = palette.neutral.medium;

    return (
        <WidgetWrapper>
            <FlexBetween>
                <Typography color={dark} variant="h5" fontWeight="500">
                    Sponsorlu
                </Typography>
                <Typography color={medium}>Reklam</Typography>
            </FlexBetween>
            <img width="100%" height="auto" alt="advert" src="http://localhost:3001/assets/info4.jpeg" style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }} />
            <FlexBetween>
                <Typography color={main}>Deneme</Typography>
                <Typography color={medium}>deneme.com</Typography>
            </FlexBetween>
            <Typography color={medium} m="0.5rem 0">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi modi fugit aliquam quos quod! Veniam excepturi similique amet commodi minus aliquid temporibus atque tenetur ea, totam, dolor neque unde perspiciatis!
            </Typography>
        </WidgetWrapper>
    );
};

export default AdvertWidget;
