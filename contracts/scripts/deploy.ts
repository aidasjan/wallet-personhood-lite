import hre from "hardhat";
import AddressVerifier from "../ignition/modules/AddressVerifier";

async function main() {
  const { verifier } = await hre.ignition.deploy(AddressVerifier);
  const verifierAddress = await verifier.getAddress();
  console.log(`Verifier: ${verifierAddress}`);
}

main().catch(console.error);
