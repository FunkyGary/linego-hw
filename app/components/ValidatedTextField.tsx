"use client";
import { useState, ChangeEvent } from "react";
import { TextField } from "@mui/material";

interface Props {
    label: string;
    validator: (value: string) => string | false;
    onChange: (isValid: boolean, newValue: string) => void;
    autoComplete?: string;
    className?: string;
    value: string;
}

export default function ValidatedTextField({
    label,
    validator,
    onChange,
    autoComplete,
    className,
    value,
}: Props) {
    const [error, setError] = useState<string | false>(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        const errorMessage = validator(newValue);
        setError(errorMessage);
        onChange(!errorMessage, newValue);
    };

    return (
        <TextField
            label={label}
            value={value}
            onChange={handleChange}
            error={!!error}
            helperText={error}
            required
            autoComplete={autoComplete}
            className={className}
        />
    );
}
