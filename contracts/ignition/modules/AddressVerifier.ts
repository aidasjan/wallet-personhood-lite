import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const AddressVerifierModule = buildModule("AddressVerifierModule", (m) => {
  const trustedSigner = m.getAccount(0);
  const verifier = m.contract("AddressVerifier", [trustedSigner]);

  return { verifier };
});

export default AddressVerifierModule;