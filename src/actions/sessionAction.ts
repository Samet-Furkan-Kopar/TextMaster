"use server"
import { sessionOptions, SessionData, defaultSession } from "@/lib/session";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const getSession = async()=>{
    const session = await getIronSession<SessionData>(cookies(), sessionOptions)
    if (!session.isLoggedIn) {
        session.isLoggedIn = defaultSession.isLoggedIn
    }
    return session;
}

interface LoginFormData {
    email: string;
    password: string;
    _id?: string;
    username?: string;
    image_url?: string;
    isPro?: boolean;
  }

export const loginSession = async(formData :LoginFormData)=>{
    const session = await getSession();

    session.userId = formData._id;
    session.username = formData.username;
    session.isPro = isPro;
    session.isLoggedIn = true;  
    session.image_url = formData.image_url;
    session.email = formData.email;

    await session.save();
    // redirect('/');
}

export const logout = async () => {
    const session = await getSession();
    session.destroy();
    redirect("/");
  };
  