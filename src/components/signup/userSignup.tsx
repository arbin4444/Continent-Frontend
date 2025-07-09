import { EuiButton, EuiFieldText, EuiFlexGroup, EuiText } from "@elastic/eui";
import React from "react";

export const UserSignup: React.FC = () => {
  return (
    <>
    <div>
      <EuiFlexGroup direction="column">
        <EuiText>Username</EuiText>
        <EuiFieldText placeholder="enter your username" />
        <EuiText>Email</EuiText>
        <EuiFieldText placeholder="enter your email" />
        <EuiText>Password</EuiText>
        <EuiFieldText placeholder="enter your password" />
        <div>

        <EuiButton>signup</EuiButton>
        </div>
      </EuiFlexGroup>
      </div>
    </>
  );
};
