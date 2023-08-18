import { EditOutlined, DeleteOutlined, AttachFileOutlined, ImageOutlined, MoreHorizOutlined, VideocamOutlined } from "@mui/icons-material";
import { Box, Divider, Typography, InputBase, useTheme, Button, IconButton, useMediaQuery } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Dropzone from "react-dropzone";
import UserImage from "components/UserImage";
import WidgetWrapper from "components/WidgetWrapper";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";

const MyPostWidget = ({ picturePath }) => {
    const dispatch = useDispatch();
    const [isImage, setIsImage] = useState(false);
    const [image, setImage] = useState(null);
    const [isVideo, setIsVideo] = useState(null);
    const [video, setVideo] = useState(null);
    const [post, setPost] = useState("");
    const { palette } = useTheme();
    const { _id } = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const mediumMain = palette.neutral.mediumMain;
    const medium = palette.neutral.medium;
    const [isFile, setIsFile] = useState(false);
    const [file, setFile] = useState(null);
    const [showAlert, setShowAlert] = useState(false);
    const [fileError, setFileError] = useState("");

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowAlert(false);
            setFileError("");
        }, 5000);

        return () => clearTimeout(timer);
    }, [showAlert]);

    const handleImageUpload = (acceptedFiles) => {
        const selectedFile = acceptedFiles[0];
        const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
        if (selectedFile && allowedTypes.includes(selectedFile.type)) {
            setImage(selectedFile);
            setShowAlert(false);
            setFileError("");
        } else {
            setImage(null);
            setShowAlert(true);
            setFileError("Yalnızca JPG, JPEG veya PNG formatında resim yükleyebilirsiniz.");
        }
    };

    const handleFileUpload = (acceptedFiles) => {
        const selectedFile = acceptedFiles[0];
        const allowedTypes = ["application/pdf"];
        if (selectedFile && allowedTypes.includes(selectedFile.type)) {
            setFile(selectedFile);
            setShowAlert(false);
            setFileError("");
        } else {
            setFile(null);
            setShowAlert(true);
            setFileError("Yalnızca PDF formatında dosya yükleyebilirsiniz.");
        }
    };

    const handleVideoUpload = (acceptedFiles) => {
        const selectedFile = acceptedFiles[0];
        const allowedTypes = ["video/mp4"];
        if (selectedFile && allowedTypes.includes(selectedFile.type)) {
            setVideo(selectedFile);
            setShowAlert(false);
            setFileError("");
        } else {
            setVideo(null);
            setShowAlert(true);
            setFileError("Yalnızca MP4 formatında video yükleyebilirsiniz.");
        }
    };

    const handlePost = async () => {
        let whichFile = "";
        const formData = new FormData();
        formData.append("userId", _id);
        formData.append("description", post);
        if (image) {
            formData.append("picture", image);
            formData.append("picturePath", image.name);
        }
        if (file) {
            formData.append("pdf", file);
            formData.append("pdfPath", file.name);
            whichFile = "/pdf";
        }
        if (video) {
            formData.append("video", video);
            formData.append("videoPath", video.name);
            whichFile = "/video";
        }

        const response = await fetch(`http://localhost:3001/posts${whichFile}`, {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
            body: formData,
        });
        const posts = await response.json();
        dispatch(setPosts({ posts }));
        setImage(null);
        setFile(null);
        setVideo(null);
        setPost("");
    };

    return (
        <WidgetWrapper>
            <FlexBetween gap="1.5rem">
                <UserImage image={picturePath} />
                <InputBase
                    placeholder="Aklındakileri paylaş..."
                    onChange={(e) => setPost(e.target.value)}
                    value={post}
                    sx={{
                        width: "100%",
                        backgroundColor: palette.neutral.light,
                        borderRadius: "2rem",
                        padding: "1rem 2rem",
                    }}
                />
            </FlexBetween>
            {isImage && (
                <Box border={`1px solid ${medium}`} borderRadius="5px" mt="1rem" p="1rem">
                    <Dropzone acceptedFiles=".jpg,.jpeg,.png" multiple={false} onDrop={handleImageUpload}>
                        {({ getRootProps, getInputProps }) => (
                            <FlexBetween>
                                <Box {...getRootProps()} border={`2px dashed ${palette.primary.main}`} p="1rem" width="100%" sx={{ "&:hover": { cursor: "pointer" } }}>
                                    <input {...getInputProps()} />
                                    {!image ? (
                                        <p>Resim yüklemek için tıklayın veya resmi sürükleyin.</p>
                                    ) : (
                                        <FlexBetween>
                                            <Typography>{image.name}</Typography>
                                            <EditOutlined />
                                        </FlexBetween>
                                    )}
                                </Box>
                                {image && (
                                    <IconButton onClick={() => setImage(null)} sx={{ width: "15%" }}>
                                        <DeleteOutlined />
                                    </IconButton>
                                )}
                            </FlexBetween>
                        )}
                    </Dropzone>
                </Box>
            )}
            {isFile && (
                <Box border={`1px solid ${medium}`} borderRadius="5px" mt="1rem" p="1rem">
                    <Dropzone acceptedFiles=".pdf" multiple={false} onDrop={handleFileUpload}>
                        {({ getRootProps, getInputProps }) => (
                            <FlexBetween>
                                <Box {...getRootProps()} border={`2px dashed ${palette.primary.main}`} p="1rem" width="100%" sx={{ "&:hover": { cursor: "pointer" } }}>
                                    <input {...getInputProps()} />
                                    {!file ? (
                                        <p>PDF yüklemek için tıklayın veya dosyayı sürükleyin.</p>
                                    ) : (
                                        <FlexBetween>
                                            <Typography>{file.name}</Typography>
                                            <EditOutlined />
                                        </FlexBetween>
                                    )}
                                </Box>
                                {file && (
                                    <IconButton onClick={() => setFile(null)} sx={{ width: "15%" }}>
                                        <DeleteOutlined />
                                    </IconButton>
                                )}
                            </FlexBetween>
                        )}
                    </Dropzone>
                </Box>
            )}
            {isVideo && (
                <Box border={`1px solid ${medium}`} borderRadius="5px" mt="1rem" p="1rem">
                    <Dropzone acceptedFiles=".mp4" multiple={false} onDrop={handleVideoUpload}>
                        {({ getRootProps, getInputProps }) => (
                            <FlexBetween>
                                <Box {...getRootProps()} border={`2px dashed ${palette.primary.main}`} p="1rem" width="100%" sx={{ "&:hover": { cursor: "pointer" } }}>
                                    <input {...getInputProps()} />
                                    {!video ? (
                                        <p>Video yüklemek için tıklayın veya videoyu sürükleyin.</p>
                                    ) : (
                                        <FlexBetween>
                                            <Typography>{video.name}</Typography>
                                            <EditOutlined />
                                        </FlexBetween>
                                    )}
                                </Box>
                                {video && (
                                    <IconButton onClick={() => setVideo(null)} sx={{ width: "15%" }}>
                                        <DeleteOutlined />
                                    </IconButton>
                                )}
                            </FlexBetween>
                        )}
                    </Dropzone>
                </Box>
            )}

            <Divider sx={{ margin: "1.25rem 0" }} />

            <FlexBetween>
                <FlexBetween
                    gap="0.25rem"
                    onClick={() => {
                        setIsImage(!isImage);
                        setIsFile(false);
                        setIsVideo(false);
                    }}
                >
                    <ImageOutlined sx={{ color: mediumMain }} />
                    <Typography color={mediumMain} sx={{ "&:hover": { cursor: "pointer", color: medium } }}>
                        Fotoğraf
                    </Typography>
                </FlexBetween>

                {isNonMobileScreens ? (
                    <>
                        <FlexBetween
                            gap="0.25rem"
                            onClick={() => {
                                setIsVideo(!isVideo);
                                setIsImage(false);
                                setIsFile(false);
                            }}
                        >
                            <VideocamOutlined sx={{ color: mediumMain }} />
                            <Typography color={mediumMain} sx={{ "&:hover": { cursor: "pointer", color: medium } }}>
                                Video
                            </Typography>
                        </FlexBetween>

                        <FlexBetween
                            gap="0.25rem"
                            onClick={() => {
                                setIsFile(!isFile);
                                setIsImage(false);
                                setIsVideo(false);
                            }}
                        >
                            <AttachFileOutlined sx={{ color: mediumMain }} />
                            <Typography color={mediumMain} sx={{ "&:hover": { cursor: "pointer", color: medium } }}>
                                Dosya
                            </Typography>
                        </FlexBetween>
                    </>
                ) : (
                    <FlexBetween gap="0.25rem">
                        <MoreHorizOutlined sx={{ color: mediumMain }} />
                    </FlexBetween>
                )}

                <Button
                    disabled={!post}
                    onClick={handlePost}
                    sx={{
                        color: palette.background.alt,
                        backgroundColor: palette.primary.main,
                        borderRadius: "3rem",
                    }}
                >
                    PAYLAŞ
                </Button>
            </FlexBetween>
            {showAlert && (
                <Typography variant="body2" color="error" sx={{ marginTop: "0.5rem" }}>
                    {fileError}
                </Typography>
            )}
        </WidgetWrapper>
    );
};

export default MyPostWidget;
