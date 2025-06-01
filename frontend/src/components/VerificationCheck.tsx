"use client";
import { verifierAddress } from "@/config/verifier";
import { config } from "@/config/wagmi";
import { Box, Button, Heading, Input } from "@chakra-ui/react";
import { useState } from "react";
import { readContract } from "wagmi/actions";
import verifierAbi from "@/config/abi/AddressVerifier.json";

export default function VerificationCheck() {
  const [address, setAddress] = useState<string>();
  const [isVerified, setIsVerified] = useState<boolean>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const verified = await readContract(config, {
      abi: verifierAbi,
      address: verifierAddress,
      functionName: "checkVerified",
      args: [address],
    });
    setIsVerified(verified as boolean);
  };

  return (
    <Box
      py={8}
      px={6}
      my={8}
      mx="auto"
      maxW="lg"
      backgroundColor="gray.100"
      rounded="xl"
      shadow="lg"
    >
      <Heading size="md">Check Wallet</Heading>
      <Box mt={3}>
        Paste a wallet address and check if it belongs to a human
      </Box>
      <Input
        backgroundColor="white"
        mt={2}
        placeholder="0x..."
        onChange={(e) => setAddress(e.target.value)}
      />
      <Button colorScheme="blue" onClick={handleSubmit} mt={3}>
        Check
      </Button>
      {isVerified !== undefined && (
        <Box
          fontSize="lg"
          fontWeight="bold"
          color={isVerified ? "green.500" : "red.500"}
          mt={3}
        >
          {isVerified
            ? "This wallet belongs to a human"
            : "This wallet is not verified"}
        </Box>
      )}
    </Box>
  );
}
