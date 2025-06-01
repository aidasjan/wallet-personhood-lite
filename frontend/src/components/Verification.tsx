"use client";
import { verifierAddress } from "@/config/verifier";
import { config } from "@/config/wagmi";
import { Box, Button, Heading, useToast } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useAccount } from "wagmi";
import { writeContract } from "wagmi/actions";
import verifierAbi from "@/config/abi/AddressVerifier.json";

export default function Verification() {
  const toast = useToast();
  const { address } = useAccount();
  const [token, setToken] = useState<string | null>();
  const [isLoading, setIsLoading] = useState(false);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/verification`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ address, token }),
        }
      );

      const data = await res.json();
      const signature = data.signature;

      await writeContract(config, {
        abi: verifierAbi,
        address: verifierAddress,
        functionName: "submitVerification",
        args: [signature],
      });

      toast({ status: "success", title: "Verified successfully" });
    } catch (e) {
      console.error(e);
      toast({ status: "error", title: "Verification failed" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      py={16}
      px={6}
      my={8}
      mx="auto"
      maxW="lg"
      backgroundColor="gray.100"
      rounded="xl"
      shadow="lg"
    >
      <Heading>Prove your Personhood</Heading>
      <Box mt={3}>
        Solve a captcha and submit verification to prove that your wallet
        belongs to a human
      </Box>
      <Box fontWeight="bold" mt={6} mb={2}>
        Step 1. Connect your wallet
      </Box>
      <ConnectButton />
      <Box fontWeight="bold" mt={4} mb={2}>
        Step 2. Solve a captcha
      </Box>
      <ReCAPTCHA
        ref={recaptchaRef}
        size="normal"
        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string}
        onChange={setToken}
      />
      <Box fontWeight="bold" mt={4} mb={2}>
        Step 3. Get verified and submit your verification on-chain
      </Box>
      <Button colorScheme="blue" isLoading={isLoading} onClick={handleSubmit}>
        Submit Verification
      </Button>
    </Box>
  );
}
