"use client";
import { Box, Button } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useAccount } from "wagmi";

export default function Verification() {
  const { address } = useAccount();
  const [token, setToken] = useState<string | null>();
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("http://localhost:8080/verification", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ address, token }),
    });

    const data = await res.json();
    console.log(data);
  };

  return (
    <Box py={64}>
      <ConnectButton />
      <ReCAPTCHA
        ref={recaptchaRef}
        size="normal"
        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string}
        onChange={setToken}
      />
      <Button onClick={handleSubmit}>Submit Verification</Button>
    </Box>
  );
}
