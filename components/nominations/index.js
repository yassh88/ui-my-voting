import styled from "styled-components";
import { Form } from "@web3uikit/core";
// dont export from moralis when using react
import { useMoralis, useWeb3Contract } from "react-moralis";
import { useEffect, useState } from "react";
import { useNotification } from "web3uikit";
import { ethers } from "ethers";
import { contractAddresses, abi } from "../constants";

const Title = styled.h1`
  font-size: 50px;
  color: ${({ theme }) => theme.colors.primary};
`;

export function Nominations() {
  const { Moralis, isWeb3Enabled, chainId: chainIdHex } = useMoralis();
  return (
    <Form
      buttonConfig={{
        text: "Submit",
        theme: "primary",
      }}
      data={[
        {
          key: "Candiate1",
          name: "Candiate1",
          type: "text",
          validation: {
            required: true,
          },
          value: "",
        },
        {
          key: "Candiate2",
          name: "Candiate2",
          type: "text",
          validation: {
            required: true,
          },
          value: "",
        },
      ]}
      onSubmit={function noRefCheck(data) {
        console.log("VAlues", data);
      }}
      title="Send Nominees"
    />
  );
}
