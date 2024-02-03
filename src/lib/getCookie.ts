"use server"

import {cookies} from 'next/headers'

export const getToken = (): string | undefined => {
    return cookies().get('token')?.value;
}

export const removeToken = (): void => {
    cookies().delete('token');
}