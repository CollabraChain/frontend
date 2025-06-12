import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { Address } from "viem";
import { base } from "viem/chains";
import L2ResolverAbi from "@/abis/L2ResolverAbi";
import { publicClient } from "@/client";
import { Basename } from "@coinbase/onchainkit/identity";
import { ethers } from "ethers";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const convertChainIdToCoinType = (chainId: number) => {
  // L1 resolvers to addr
  if (chainId === 1) {
    // 1 is mainnet chain id
    return "addr";
  }
  const cointype = (0x80000000 | chainId) >>> 0;
  return cointype.toString(16).toLocaleUpperCase();
};

const convertReverseNodeToBytes = (address: Address, chainId: number) => {
  const addressFormatted = address.toLowerCase();
  const addressNode = ethers.solidityPackedKeccak256(
    [addressFormatted.substring(2)],
    ["string"]
  ); // NOTE: hash it as a string not address
  const chainCoinType = convertChainIdToCoinType(chainId);
  const baseReverseNode = ethers.namehash(
    `${chainCoinType.toLocaleUpperCase()}.reverse`
  );
  const addressReverseNode = ethers.solidityPackedKeccak256(
    ["bytes32", "bytes32"],
    [baseReverseNode, addressNode]
  );
  return addressReverseNode;
};

const BASENAME_L2_RESOLVER_ADDRESS =
  "0xC6d566A56A1aFf6508b41f6c90ff131615583BCD";

export async function getBasename(address: Address) {
  try {
    const addressReverseNode = convertReverseNodeToBytes(address, base.id);
    const basename = await publicClient.readContract({
      abi: L2ResolverAbi,
      address: BASENAME_L2_RESOLVER_ADDRESS,
      functionName: "name",
      args: [addressReverseNode as `0x${string}`],
    });
    if (basename) {
      return basename as Basename;
    }
  } catch (error) {
    // Handle the error accordingly
    console.error("Error resolving Basename:", error);
  }
}
