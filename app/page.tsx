"use client";

import Form from "./form/page";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function Page() {
    return (
        <QueryClientProvider client={queryClient}>
            <Form />
        </QueryClientProvider>
    );
}
