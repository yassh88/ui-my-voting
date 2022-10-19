import styled from "styled-components";
import { ConnectButton } from "@web3uikit/web3";
import { Nominations } from "../components/nominations";

const Title = styled.h1`
  font-size: 50px;
  color: ${({ theme }) => theme.colors.primary};
`;

export default function Home() {
  return (
    <>
      <Title>Voting Dapp</Title>
      <ConnectButton moralisAuth={false} />
      <Nominations />
    </>
  );
}
