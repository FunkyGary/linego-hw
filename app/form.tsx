"use client";

import React, { useEffect, useState, useCallback } from "react";
import { TextField, Typography, Box, Button, Drawer } from "@mui/material";
import ValidatedTextField from "./components/ValidatedTextField";
import BottomDrawer from "./components/BottomDrawer";
import {
    flightValidator,
    nameValidator,
    phoneValidator,
    IDValidator,
} from "./utils/validator";

interface FormContext {
    name: string;
    flight: string;
    phone: string;
    ID: string;
}

interface FormValid {
    name: boolean;
    flight: boolean;
    phone: boolean;
    ID: boolean;
}

export default function Form(): JSX.Element {
    const [formValid, setFormValid] = useState<FormValid>({
        name: false,
        flight: false,
        phone: false,
        ID: false,
    });
    const [formContext, setFormContext] = useState<FormContext>({
        name: "",
        flight: "",
        phone: "",
        ID: "",
    });
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
    const [openDrawer, setOpenDrawer] = useState(false);

    useEffect(() => {
        setIsSubmitDisabled(
            !Object.values(formValid).every((isValid) => isValid)
        );
    }, [formValid]);

    const toggleDrawer = useCallback((newOpen: boolean) => {
        setOpenDrawer(newOpen);
    }, []);

    const handleSubmit = useCallback(
        (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            toggleDrawer(true);
        },
        [toggleDrawer]
    );

    const handleFieldChange = useCallback(
        (field: keyof FormContext, isValid: boolean, newValue: string) => {
            setFormValid((prevFormValid) => ({
                ...prevFormValid,
                [field]: isValid,
            }));
            setFormContext((prevFormContext) => ({
                ...prevFormContext,
                [field]: newValue,
            }));
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
                onChange={(isValid, newValue) =>
                    handleFieldChange("flight", isValid, newValue)
                }
                className="my-2"
                value={formContext.flight}
            />
            <Typography variant="subtitle1" gutterBottom className="my-2">
                旅客資訊
            </Typography>
            <ValidatedTextField
                label="姓名"
                validator={nameValidator}
                onChange={(isValid, newValue) =>
                    handleFieldChange("name", isValid, newValue)
                }
                autoComplete="name"
                className="my-2"
                value={formContext.name}
            />
            <ValidatedTextField
                label="電話"
                validator={phoneValidator}
                autoComplete="tel"
                className="my-2"
                onChange={(isValid, newValue) =>
                    handleFieldChange("phone", isValid, newValue)
                }
                value={formContext.phone}
            />
            <ValidatedTextField
                label="身份字號/護照編號"
                validator={IDValidator}
                className="my-2"
                onChange={(isValid, newValue) =>
                    handleFieldChange("ID", isValid, newValue)
                }
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
                    flight={formContext.flight}
                    toggleDrawer={toggleDrawer}
                />
            </Drawer>
        </Box>
    );
}
