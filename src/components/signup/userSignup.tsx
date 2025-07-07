import { EuiButton, EuiFieldText, EuiText } from "@elastic/eui";
import React from "react";

export const UserSignup:React.FC=()=>{
    return(
        <>
            <EuiText>Username</EuiText>
            <EuiFieldText placeholder="enter your username"/>
            <EuiText>Email</EuiText>
            <EuiFieldText placeholder="enter your email"/>
            <EuiText>Password</EuiText>
            <EuiFieldText placeholder="enter your password"/>
            <EuiButton>signup</EuiButton>
        </>
    )
}