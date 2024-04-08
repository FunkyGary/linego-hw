"use client";
import { useState, ChangeEvent } from "react";
import { TextField } from "@mui/material";

interface Props {
    label: string;
    validator: (value: string) => string | false;
    onChange: (isValid: boolean) => void;
    name: string;
}

export default function ValidatedTextField({
    label,
    validator,
    onChange,
    name,
}: Props) {
    const [value, setValue] = useState<string>("");
    const [error, setError] = useState<string | false>(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        const errorMessage = validator(newValue);
        setValue(newValue);
        setError(errorMessage);
        onChange(!errorMessage);
    };

    return (
        <TextField
            label={label}
            value={value}
            onChange={handleChange}
            error={!!error}
            helperText={error}
            required
            name={name}
        />
    );
}
