"use client"
import {  login, logout } from "@/actions/sessionAction";
import React from "react";


interface UserCredentials {
    username: string;
    password: string;
}

const Deneme =  () => {
    // const session =  getSession(); 

    const obj: UserCredentials = {
        username: "user",
        password: "123456",
    };

    
    const submit = async () => {
        console.log("submit");
        const response = await login(obj);
        console.log(response);
    };
    const handleLogout = async () => {
        await logout();
    };
    return (
        <div className=" flex gap-x-5">
            <button onClick={submit}>giriş yap</button>

            <button onClick={handleLogout}>logout</button>

        </div>
    );
};

export default Deneme;
