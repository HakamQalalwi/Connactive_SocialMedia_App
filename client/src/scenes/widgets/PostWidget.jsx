import { ChatBubbleOutlineOutlined, FavoriteBorderOutlined, FavoriteOutlined, ShareOutlined, SendOutlined } from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme, InputBase } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setPost } from "state";

const PostWidget = ({ postId, postUserId, name, description, location, picturePath, userPicturePath, likes, comments, pdfPath, videoPath }) => {
    const [isComments, setIsComments] = useState(false);
    const [commentText, setCommentText] = useState("");
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);
    const loggedInUserId = useSelector((state) => state.user._id);
    const isLiked = likes && Boolean(likes[loggedInUserId]);
    const likeCount = likes ? Object.keys(likes).length : 0;

    const { palette } = useTheme();

    const main = palette.neutral.main;
    const primary = palette.primary.main;

    const commentCount = comments ? comments.length : 0;

    const patchLike = async () => {
        const response = await fetch(`http://localhost:3001/posts/${postId}/like`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId: loggedInUserId }),
        });
        const updatedPost = await response.json();
        dispatch(setPost({ post: updatedPost }));
    };

    const handleAddComment = async () => {
        const response = await fetch(`http://localhost:3001/posts/${postId}/comments`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ comment: commentText, userId: loggedInUserId }),
        });
        const updatedPost = await response.json();
        dispatch(setPost({ post: updatedPost }));
        setCommentText(""); // Reset the comment text
    };

    return (
        <WidgetWrapper m="2rem 0">
            <Friend friendId={postUserId} name={name} subtitle={location} userPicturePath={userPicturePath} />
            <Typography color={main} sx={{ mt: "1rem" }}>
                {description}
            </Typography>
            {picturePath && <img width="100%" height="auto" alt="post" style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }} src={`http://localhost:3001/assets/${picturePath}`} />}
            {pdfPath && (
                <Box sx={{ display: "flex", flexDirection: "column", mt: "0.5rem" }}>
                    <embed src={`http://localhost:3001/assets/${pdfPath}`} type="application/pdf" width="100%" height="500px" />
                </Box>
            )}
            {videoPath && (
                <Box mt="1rem">
                    <video width="100%" controls>
                        <source src={`http://localhost:3001/assets/${videoPath}`} type="video/mp4" />
                        Tarayıcınız video etiketini desteklememektedir.
                    </video>
                </Box>
            )}
            <FlexBetween mt="0.25rem">
                <FlexBetween gap="1rem">
                    <FlexBetween gap="0.3rem">
                        <IconButton onClick={patchLike}>{isLiked ? <FavoriteOutlined sx={{ color: primary }} /> : <FavoriteBorderOutlined />}</IconButton>
                        <Typography>{likeCount}</Typography>
                    </FlexBetween>
                    <FlexBetween gap="0.3rem">
                        <IconButton onClick={() => setIsComments(!isComments)}>
                            <ChatBubbleOutlineOutlined />
                        </IconButton>
                        <Typography>{commentCount}</Typography>
                    </FlexBetween>
                </FlexBetween>
                <IconButton>
                    <ShareOutlined />
                </IconButton>
            </FlexBetween>
            {isComments && (
                <Box mt="0.5rem">
                    {comments.map((comment, i) => (
                        <Box key={`${comment._id}-${i}`}>
                            <Divider />
                            <FlexBetween alignItems="center" style={{ justifyContent: "flex-start" }}>
                                <Link to={`/profile/${comment.userId}`}>
                                    <img src={`http://localhost:3001/assets/${comment.userPicturePath}`} alt="User" style={{ borderRadius: "50%", width: "32px", height: "32px" }} />
                                </Link>
                                <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>{comment.comment}</Typography>
                            </FlexBetween>
                        </Box>
                    ))}
                    <Divider />
                </Box>
            )}

            <Box mt="0.5rem">
                <FlexBetween alignItems="center">
                    <InputBase
                        fullWidth
                        placeholder="Yorum yaz..."
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        sx={{
                            height: "3rem",
                            width: "100%",
                            backgroundColor: palette.neutral.light,
                            borderRadius: "2rem",
                            padding: "1rem 2rem",
                        }}
                    />
                    <IconButton onClick={handleAddComment} disabled={!commentText.trim()}>
                        <SendOutlined />
                    </IconButton>
                </FlexBetween>
            </Box>
        </WidgetWrapper>
    );
};

export default PostWidget;
