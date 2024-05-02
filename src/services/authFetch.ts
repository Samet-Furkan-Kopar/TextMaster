import { get, post } from './request';
import { BASEURL } from './baseUrl';


export const userRegister = (data: any) => post(`${BASEURL}/auth/user-register`, data);
export const login = (data: any) => post(`${BASEURL}/auth/login`, data);
