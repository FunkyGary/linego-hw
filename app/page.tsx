"use client";

import React, { useRef } from "react";
import { TextField, Typography, Box, Button } from "@mui/material";
import ValidatedTextField from "./components/ValidatedTextField";
import {
    flightValidator,
    nameValidator,
    phoneValidator,
    IDValidator,
} from "./utils/valudatir";

export default function ValidationTextFields() {
    const formValid = useRef({
        name: false,
        flight: false,
        phone: false,
        ID: false,
    });

    const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(e.currentTarget.elements.notes.value);
        if (Object.values(formValid.current).every((isValid) => isValid)) {
            alert("Form is valid! Submitting the form...");
        } else {
            alert("Form is invalid! Please check the fields...");
        }
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                "& .MuiTextField-root": { m: 1, maxWidth: "350px" },
            }}
            noValidate
        >
            <div>
                <Typography variant="h6" gutterBottom>
                    送機資訊
                </Typography>
                <TextField
                    required
                    label="下車機場"
                    disabled
                    defaultValue="桃園國際機場 第一航廈"
                />
                <ValidatedTextField
                    label="航班編號"
                    validator={flightValidator}
                    onChange={(isValid) => (formValid.current.flight = isValid)}
                    name="flight"
                />
                <Typography variant="h6" gutterBottom>
                    旅客資訊
                </Typography>
                <ValidatedTextField
                    label="姓名"
                    validator={nameValidator}
                    onChange={(isValid) => (formValid.current.name = isValid)}
                    name="name"
                />
                <ValidatedTextField
                    label="電話"
                    validator={phoneValidator}
                    onChange={(isValid) => (formValid.current.phone = isValid)}
                    name="phone"
                />
                <ValidatedTextField
                    label="身份字號/護照編號"
                    validator={IDValidator}
                    onChange={(isValid) => (formValid.current.ID = isValid)}
                    name="ID"
                />
                <TextField label="乘車備註" multiline rows={4} name="notes" />
            </div>
            <Button variant="contained" color="primary" type="submit">
                Submit
            </Button>
        </Box>
    );
}
