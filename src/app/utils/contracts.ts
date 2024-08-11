import { chain } from "../chain";
import { client } from "../client";
import { getContract } from "thirdweb";
import { contractABI } from "./contractABI";

const rewardTokenContractAddress = "0x8Bf271Bb50cf66B7e60e813b3E190B416EC29c8D";
const UserManagementAddress = "0xecebe520CD5f67b5E16B3eB6Cf445b5ea4a889bD";
const AttentionTokenAddress = "0x4ef2A3d4585Fc7839B3B62DA7acE039C83848779";

export const contract = getContract({
    client: client,
    chain: chain,
    address: rewardTokenContractAddress, 
    abi: contractABI,
});

export const UserManagementContract = getContract({
    client: client,
    chain: chain,
    address: UserManagementAddress, 
    abi: contractABI,
});

export const AttentionToken = getContract({
    client: client,
    chain: chain,
    address: AttentionTokenAddress, 
    abi: contractABI,
});


