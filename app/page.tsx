"use client";

import Form from "./form";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Box } from "@mui/material";

const queryClient = new QueryClient();

export default function Page() {
    return (
        <QueryClientProvider client={queryClient}>
            <Form />
        </QueryClientProvider>
    );
}
