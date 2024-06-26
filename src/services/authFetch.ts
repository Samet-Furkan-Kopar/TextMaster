import { get, post, googlePost } from './request';
import { BASEURL } from './baseUrl';


export const userRegister = (data: any) => post(`${BASEURL}/auth/user-register`, data);
export const login = (data: any) => post(`${BASEURL}/auth/login`, data);
export const googleLogin = () => googlePost(`${BASEURL}/google-login`);
