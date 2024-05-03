import { SessionOptions } from "iron-session";


export interface SessionData {
    userId? : string;
    username? : string;
    isPro?:boolean
    isLoggedIn: boolean;
    image_url?: string;
    email?: string;
}

export const defaultSession: SessionData = {
    isLoggedIn: false
}

export const sessionOptions: SessionOptions ={
    password: process.env.SECRET_KEY!,
    cookieName: 'auth-session',
    cookieOptions:{
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production'
    }
}