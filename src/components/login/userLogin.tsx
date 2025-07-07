import { EuiButton, EuiFieldText, EuiText } from "@elastic/eui"
import React from "react"

export const UserLogin:React.FC=()=>{
    return(
        <>
            <EuiText>Username</EuiText>
            <EuiFieldText placeholder="enter your username"/>
            <EuiText>Password</EuiText>
            <EuiFieldText placeholder="enter your password"/>
            <EuiButton fill={true}>login</EuiButton>

        </>
    )
}