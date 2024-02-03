"use server"
import { getToken } from "./getCookie";
export const isAuthenticated = (): boolean  => {
    const token = getToken();
    if (!token) {
        return false;
    }
    return true;
}