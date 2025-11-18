import React, { useState } from "react";
import { Heading } from "../Components/Heading";
import { InputBox } from "../Components/InputBox";
import { SubHeading } from "../Components/SubHeading";
import { Button } from "../Components/Button";
import { BottomWarn } from "../Components/BottomWarning";

function Signin() {
    return(
        <>
            <div className="w-screen h-screen flex items-center justify-center">
                
            <div className="bg-white shadow-xl rounded-2xl p-6 w-80">
                    <Heading label="Sign in"/>
                    <SubHeading label= "Enter your information to login into your account" />
                    <InputBox label="Email" placeholder="Gautam"/>
                    <InputBox label="Password" placeholder="123456"/>
                      <div className="pt-3"></div>
                    <Button label="Sign in" onclick={async ()=>{
                        const response = await axios.post("http://localhost:3000/api/v1/user/signin",{
                            username,
                            password
                        })
                        localStorage.setItem("token", response.data.token); 
                    }}/>
                    <BottomWarn label="Create a new account?" buttontext={"Sign up"} to={"/signup"} />

                    
            </div>
            </div>
        </>

    )
};

export default Signin;
