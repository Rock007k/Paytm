import React, { useState } from "react";
import { Heading } from "../Components/Heading";
import { InputBox } from "../Components/InputBox";
import { SubHeading } from "../Components/SubHeading";
import { BottomWarn } from "../Components/BottomWarning";
import { Button } from "../Components/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function Signup() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();


    return(
        <>
            <div className="w-screen h-screen flex items-center justify-center">
                
            <div className="bg-white shadow-xl rounded-2xl p-6 w-80">
                    <Heading label="Sign up"/>
                    <SubHeading label= "Enter your information to create an account" />
                    <InputBox label="First Name" placeholder="Gautam" onchange={e => setFirstName(e.target.value)}/>
                    {console.log(firstName)}
                    <InputBox label="Last Name" placeholder="Maheshwari" onchange={e => setLastName(e.target.value)}/>
                    <InputBox label="Email" placeholder="xyz@gmail.com" onchange={e => setUsername(e.target.value)}/>
                    <InputBox label="Password" placeholder="123456" onchange={e => setPassword(e.target.value)}/>
                      <div className="pt-3"></div>
                    <Button label={"Sign up"} onclick={async ()=>{
                        const response = await axios.post("http://localhost:3000/api/v1/user/signup",{
                            username,
                            password,
                            firstName,
                            lastName
                        })
                        localStorage.setItem("token", response.data.token); 
                        navigate("/Dashboard");
                    }} />
                    <BottomWarn label={"Already have an account?"} buttontext={"Sign in"} to={"/signin"} />

            </div>
            </div>
        </>

    )
};


export default Signup;
