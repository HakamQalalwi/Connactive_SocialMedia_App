// SocialMediaEditDialog.js dosyası
import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { useDispatch, useSelector } from "react-redux";
import { setUser } from "state";

const SocialMediaEditDialog = ({ open, handleClose, socialMedia }) => {
    const [socialLink, setSocialLink] = useState("");
    const { _id, twitterLink, linkedinLink } = useSelector((state) => state.user); // Redux mağazasından kullanıcı bilgilerini alın.
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);

    const handleLinkChange = (event) => {
        setSocialLink(event.target.value);
    };

    const handleSave = async () => {
        // Async fonksiyon olmalı.
        const requestOptions = {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                twitterLink: socialMedia === "twitter" ? socialLink : twitterLink,
                linkedinLink: socialMedia === "linkedin" ? socialLink : linkedinLink,
            }),
        };

        const response = await fetch(`http://localhost:3001/users/${_id}/socialMediaLinks`, requestOptions);
        const data = await response.json();
        dispatch(setUser({ user: data })); // Veriyi Redux mağazasına kaydet.

        handleClose();
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>{socialMedia[0].toUpperCase() + socialMedia.slice(1)} Bağlantısını Düzenle</DialogTitle>
            <DialogContent>
                <DialogContentText sx={{ marginBottom: "0.5rem" }}>Lütfen aşağıya yeni {socialMedia} bağlantınızı girin:</DialogContentText>
                <TextField autoFocus margin="dense" id="name" label="Sosyal Medya Linki" type="url" fullWidth value={socialLink} onChange={handleLinkChange} />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>İptal</Button>
                <Button onClick={handleSave}>Kaydet</Button>
            </DialogActions>
        </Dialog>
    );
};

export default SocialMediaEditDialog;
