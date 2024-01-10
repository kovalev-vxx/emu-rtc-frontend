// import "./custom-reset.css";
import "./index.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Client from "@/routes/root/client.tsx";

import Root from "./routes/root";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnMount: false,
            refetchOnWindowFocus: false,
            retry: 1,
        },
    },
});

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
    },
    {
        path: "/client",
        element: <Client />,
    },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <div>Hello react</div>
            <RouterProvider router={router} />
        </QueryClientProvider>
    </React.StrictMode>
);
