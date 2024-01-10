import axios from "axios";

export const baseURL: string = import.meta.env.VITE_APP_API_URL || "";

export const http = axios.create({
    baseURL: baseURL,
    withCredentials: false,
    headers: {
        "Content-Type": "application/json",
        accept: "application/json",
    },
});
