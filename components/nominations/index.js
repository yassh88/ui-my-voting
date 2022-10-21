import styled from "styled-components";
import { Button } from "@web3uikit/core";
// dont export from moralis when using react
import {
  useMoralis,
  useWeb3Contract,
  useMoralisSubscription,
  useMoralisQuery,
} from "react-moralis";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { contractAddresses, abi } from "../../constants";

const Title = styled.h1`
  font-size: 50px;
  color: ${({ theme }) => theme.colors.primary};
`;

export function Nominations() {
  const { Moralis, isWeb3Enabled, chainId: chainIdHex } = useMoralis();
  const chainId = parseInt(chainIdHex);
  // console.log(`ChainId is ${chainId}`)
  const votingAddress =
    chainId in contractAddresses ? contractAddresses[chainId][0] : null;
  const entranceReward = useState(ethers.utils.parseEther("1"));

  useMoralisSubscription("publishVoitingResult", (q) => q, [], {
    onCreate: (data) => console.log("useMoralisSubscription", data),

    onDelete: (data) => console.log("useMoralisSubscription", data),
  });

  const {
    data,
    error,
    isLoading: loading,
  } = useMoralisQuery("publishVoitingResult");
  console.log("useMoralisQuery ", data);

  const {
    runContractFunction: getCandidateList,
    data: enterTxResponse,
    isLoading,
    isFetching,
  } = useWeb3Contract({
    abi: abi,
    contractAddress: votingAddress,
    functionName: "getCandidateList",
    // msgValue: entranceReward,
    params: {},
  });

  const { runContractFunction: getVotingPeriodTime, data: timeTxResponse } =
    useWeb3Contract({
      abi,
      contractAddress: votingAddress,
      functionName: "getVotingPeriodTime",
      params: {},
    });

  const { runContractFunction: getCandidateVote } = useWeb3Contract({
    abi,
    contractAddress: votingAddress,
    functionName: "getCandidateVote",
    params: { name: "Yashwant" },
  });
  const { runContractFunction: voteToCandidate } = useWeb3Contract({
    abi,
    contractAddress: votingAddress,
    functionName: "voteToCandidate",
    params: { candiate: "Yashwant" },
  });
  const getListHandler = async () => {
    const list = await getCandidateList();
    console.log("list", list);
  };
  const getVotingPeriodTimeHandler = async () => {
    const time = (await getVotingPeriodTime()).toString();
    console.log("list", time);
  };
  const getCandidateVoteHandler = async () => {
    const time = (await getCandidateVote()).toString();
    console.log("list", time);
  };
  const voteToCandidateHandler = async () => {
    const time = await voteToCandidate();
    console.log("list", time);
  };
  return (
    <>
      <Button
        onClick={() => getListHandler()}
        text="Get Candidate List"
        theme="primary"
        disabled={isLoading || isFetching}
      />
      <Button
        onClick={() => getVotingPeriodTimeHandler()}
        text="Get TIME"
        theme="primary"
        disabled={isLoading || isFetching}
      />
      <Button
        onClick={() => getCandidateVoteHandler("Yashwant")}
        text="Get Yashwant Vote"
        theme="primary"
        disabled={isLoading || isFetching}
      />
      <Button
        onClick={() => voteToCandidateHandler("Yashwant")}
        text="Vote to Yashwant"
        theme="primary"
        disabled={isLoading || isFetching}
      />
    </>
  );
}
