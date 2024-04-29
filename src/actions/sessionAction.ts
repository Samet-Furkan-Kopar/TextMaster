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


let username = 'furkan kopar';
let isPro = true;

interface LoginFormData {
    username: string;
    password: string;
  }

export const login = async(formData :LoginFormData)=>{
    
    const session = await getSession();
    

    const formUserName ="user"
    const formPassword = "123456";

    // burada bir api işlemi yaptırarak kullanıcı adı ve şifresini kontrol edip sessiona yazdırmalıyız ve ardından ekranda göstermek için bir message döndermeliyiz

    if(formUserName !== formData.username){
        return {error: 'Wrong Credentials'}
    }

    session.userId = '1';
    session.username = username; 
    session.isPro = isPro;
    session.isLoggedIn = true;  

    await session.save();
    // redirect('/');
    return {message: 'Logged in successfully'};
}

export const logout = async () => {
    const session = await getSession();
    session.destroy();
    redirect("/");
  };
  