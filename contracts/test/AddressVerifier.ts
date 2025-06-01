import { expect } from "chai";
import { ethers } from "hardhat";

describe("AddressVerifier", () => {
  let contract: any;
  let trustedSigner: any;
  let user: any;

  beforeEach(async () => {
    const [signer, other] = await ethers.getSigners();
    trustedSigner = signer;
    user = other;

    const Verifier = await ethers.getContractFactory("AddressVerifier");
    contract = await Verifier.deploy(trustedSigner.address);
    await contract.waitForDeployment();
  });

  it("verifies address with valid signature", async () => {
    const addressToVerify = user.address;

    const hashed = ethers.solidityPackedKeccak256(
      ["address"],
      [addressToVerify]
    );
    const arrayified = ethers.getBytes(hashed);
    const signature = await trustedSigner.signMessage(arrayified);

    const tx = await contract
      .connect(user)
      .submitVerification(signature);
    await tx.wait();

    const isVerified = await contract.checkVerified(addressToVerify);
    expect(isVerified).to.be.true;
  });

  it("rejects signature from wrong signer", async () => {
    const addressToVerify = user.address;
    const invalidSignature = await user.signMessage(addressToVerify);

    await expect(
      contract
        .connect(user)
        .submitVerification(invalidSignature)
    ).to.be.revertedWith("Invalid signature");
  });

  it("prevents re-verification", async () => {
    const addressToVerify = user.address;

    const hashed = ethers.solidityPackedKeccak256(
      ["address"],
      [addressToVerify]
    );
    const arrayified = ethers.getBytes(hashed);
    const signature = await trustedSigner.signMessage(arrayified);

    await contract.connect(user).submitVerification(signature);

    await expect(
      contract.connect(user).submitVerification(signature)
    ).to.be.revertedWith("Address already verified");
  });
});
