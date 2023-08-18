import { ManageAccountsOutlined, EditOutlined, LocationOnOutlined, WorkOutlineOutlined } from "@mui/icons-material";
import { Box, Typography, Divider, useTheme } from "@mui/material";
import UserImage from "components/UserImage";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import SocialMediaEditDialog from "components/SocialMediaEditDialog";

const UserWidget = ({ userId, picturePath }) => {
    const [user, setUser] = useState(null);
    const { palette } = useTheme();
    const navigate = useNavigate();
    const token = useSelector((state) => state.token);
    const dark = palette.neutral.dark;
    const medium = palette.neutral.medium;
    const main = palette.neutral.main;

    const [openTwitterDialog, setOpenTwitterDialog] = useState(false);
    const [openLinkedinDialog, setOpenLinkedinDialog] = useState(false);

    const handleTwitterClickOpen = () => {
        setOpenTwitterDialog(true);
    };

    const handleLinkedinClickOpen = () => {
        setOpenLinkedinDialog(true);
    };

    const handleTwitterClose = () => {
        setOpenTwitterDialog(false);
    };

    const handleLinkedinClose = () => {
        setOpenLinkedinDialog(false);
    };

    const getUser = async () => {
        const response = await fetch(`http://localhost:3001/users/${userId}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setUser(data);
    };

    useEffect(() => {
        getUser();
    }, [user]); // eslint-disable-line react-hooks/exhaustive-deps

    if (!user) {
        return null;
    }

    const { firstName, lastName, location, occupation, viewedProfile, impressions, friends } = user;

    return (
        <WidgetWrapper>
            {/* FIRST ROW */}
            <FlexBetween gap="0.5rem" pb="1.1rem" onClick={() => navigate(`/profile/${userId}`)}>
                <FlexBetween gap="1rem">
                    <UserImage image={picturePath} />
                    <Box>
                        <Typography
                            variant="h4"
                            color={dark}
                            fontWeight="500"
                            sx={{
                                "&:hover": {
                                    color: palette.primary.light,
                                    cursor: "pointer",
                                },
                            }}
                        >
                            {firstName} {lastName}
                        </Typography>
                        <Typography color={medium}>{friends.length} Arkadaş</Typography>
                    </Box>
                </FlexBetween>
                <ManageAccountsOutlined
                    sx={{
                        "&:hover": {
                            color: palette.primary.light,
                            cursor: "pointer",
                        },
                    }}
                />
            </FlexBetween>

            <Divider />

            {/* SECOND ROW */}
            <Box p="1rem 0">
                <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
                    <LocationOnOutlined fontSize="large" sx={{ color: main }} />
                    <Typography color={medium}>{location}</Typography>
                </Box>
                <Box display="flex" alignItems="center" gap="1rem">
                    <WorkOutlineOutlined fontSize="large" sx={{ color: main }} />
                    <Typography color={medium}>{occupation}</Typography>
                </Box>
            </Box>

            <Divider />

            {/* THIRD ROW */}
            <Box p="1rem 0">
                <FlexBetween mb="0.5rem">
                    <Typography color={medium}>Profili Görüntüleyenler</Typography>
                    <Typography color={main} fontWeight="500">
                        {viewedProfile}
                    </Typography>
                </FlexBetween>
                <FlexBetween>
                    <Typography color={medium}>Gönderi Etkileşimi</Typography>
                    <Typography color={main} fontWeight="500">
                        {impressions}
                    </Typography>
                </FlexBetween>
            </Box>

            <Divider />

            {/* FOURTH ROW */}
            <Box p="1rem 0">
                <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
                    Sosyal Ağlar
                </Typography>

                <FlexBetween gap="1rem" mb="0.5rem">
                    <FlexBetween gap="1rem">
                        <a href={user?.twitterLink?.includes("//") ? user.twitterLink : `//${user.twitterLink}`} target="_blank" rel="noopener noreferrer" className="linkInImage">
                            <img src="../assets/twitter.png" alt="twitter" />
                        </a>

                        <Box>
                            <Typography color={main} fontWeight="500">
                                Twitter
                            </Typography>
                            <Typography color={medium}>Sosyal Ağ</Typography>
                        </Box>
                    </FlexBetween>
                    <EditOutlined className="editIcon" onClick={handleTwitterClickOpen} sx={{ color: main }} />
                    <SocialMediaEditDialog open={openTwitterDialog} handleClose={handleTwitterClose} socialMedia="twitter" user={user} />
                </FlexBetween>

                <FlexBetween gap="1rem">
                    <FlexBetween gap="1rem">
                        <a href={user?.linkedinLink?.includes("//") ? user.linkedinLink : `//${user.linkedinLink}`} target="_blank" rel="noopener noreferrer" className="linkInImage">
                            <img src="../assets/linkedin.png" alt="linkedin" />
                        </a>
                        <Box>
                            <Typography color={main} fontWeight="500">
                                Linkedin
                            </Typography>
                            <Typography color={medium}>İletişim Platformu</Typography>
                        </Box>
                    </FlexBetween>
                    <EditOutlined className="editIcon" onClick={handleLinkedinClickOpen} sx={{ color: main }} />
                    <SocialMediaEditDialog open={openLinkedinDialog} handleClose={handleLinkedinClose} socialMedia="linkedin" user={user} />
                </FlexBetween>
            </Box>
        </WidgetWrapper>
    );
};

export default UserWidget;
