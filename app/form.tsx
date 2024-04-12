"use client";

import React, { useEffect, useState, useCallback } from "react";
import { TextField, Typography, Box, Button } from "@mui/material";
import ValidatedTextField from "./components/ValidatedTextField";
import BottomDrawer from "./components/BottomDrawer";
import Drawer from "@mui/material/Drawer";
import {
    flightValidator,
    nameValidator,
    phoneValidator,
    IDValidator,
} from "./utils/valudatir";

export default function Form() {
    const [formValid, setFormValid] = useState({
        name: false,
        flight: false,
        phone: false,
        ID: false,
    });
    const [formContext, setFormContext] = useState({
        name: "",
        flight: "",
        phone: "",
        ID: "",
    });
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
    const [openDrawer, setOpenDrawer] = useState(false);

    useEffect(() => {
        if (Object.values(formValid).every((isValid) => isValid)) {
            setIsSubmitDisabled(false);
        } else {
            setIsSubmitDisabled(true);
        }
    }, [formValid]);

    const toggleDrawer = useCallback((newOpen: boolean) => {
        setOpen(newOpen);
    }, []);

    const handleSubmit = useCallback(
        (e: React.SyntheticEvent<HTMLFormElement>) => {
            e.preventDefault();
            toggleDrawer(true);
        },
        []
    );

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
            }}
            noValidate
            className="mx-4 max-w-screen-sm"
        >
            <Typography
                variant="h6"
                gutterBottom
                align="center"
                className="my-1"
            >
                送機行程
            </Typography>
            <Typography variant="subtitle1" gutterBottom className="my-2">
                送機計畫
            </Typography>
            <TextField
                required
                label="下車機場"
                disabled
                defaultValue="桃園國際機場 第一航廈"
                className="my-2"
            />
            <ValidatedTextField
                label="航班編號"
                validator={flightValidator}
                onChange={(isValid, newValue) => {
                    setFormValid({ ...formValid, flight: isValid });
                    setFormContext({ ...formContext, flight: newValue });
                }}
                className="my-2"
                value={formContext.flight}
            />
            <Typography variant="subtitle1" gutterBottom className="my-2">
                旅客資訊
            </Typography>
            <ValidatedTextField
                label="姓名"
                validator={nameValidator}
                onChange={(isValid, newValue) => {
                    setFormValid({ ...formValid, name: isValid });
                    setFormContext({ ...formContext, name: newValue });
                }}
                autoComplete="name"
                className="my-2"
                value={formContext.name}
            />
            <ValidatedTextField
                label="電話"
                validator={phoneValidator}
                autoComplete="tel"
                className="my-2"
                onChange={(isValid, newValue) => {
                    setFormValid({ ...formValid, phone: isValid });
                    setFormContext({ ...formContext, phone: newValue });
                }}
                value={formContext.phone}
            />
            <ValidatedTextField
                label="身份字號/護照編號"
                validator={IDValidator}
                className="my-2"
                onChange={(isValid, newValue) => {
                    setFormValid({ ...formValid, ID: isValid });
                    setFormContext({ ...formContext, ID: newValue });
                }}
                value={formContext.ID}
            />
            <TextField
                label="乘車備註"
                multiline
                rows={4}
                name="notes"
                className="my-2"
            />
            <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={isSubmitDisabled}
                className="my-2"
            >
                Submit
            </Button>
            <Drawer
                open={openDrawer}
                onClose={() => toggleDrawer(false)}
                anchor="bottom"
            >
                <BottomDrawer
                    flight={`${formContext.flight}`}
                    toggleDrawer={toggleDrawer}
                />
            </Drawer>
        </Box>
    );
}
