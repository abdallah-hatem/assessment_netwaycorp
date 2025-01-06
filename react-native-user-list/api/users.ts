import { request } from "./request";

export const GET_USERS = (params?: any) => request<any>("get", `https://jsonplaceholder.typicode.com/users`, params);
