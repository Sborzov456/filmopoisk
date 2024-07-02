import { ApiClient } from "@/shared/api/ApiClient";

type LoginPayload = {
    username: string;
    password: string;
}
type Token = string;

export const login = async ({username, password}: LoginPayload) => {
    const response = await ApiClient.post({
        url: 'login',
        body: {username, password},
    })
    
    return response.data.token as Token
}
