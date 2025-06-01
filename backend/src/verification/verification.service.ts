import { BadRequestException, Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import { GoogleService } from 'src/api/google/google.service';

@Injectable()
export class VerificationService {
  constructor(private readonly googleService: GoogleService) {}

  async verify(address: string, token: string) {
    const isTokenValid = await this.googleService.verifyToken(token);
    if (!isTokenValid) {
      throw new BadRequestException('Token is invalid');
    }
    const wallet = new ethers.Wallet(
      process.env.SIGNER_PRIVATE_KEY as string,
    );
    const hashed = ethers.solidityPackedKeccak256(['address'], [address]);
    const arrayified = ethers.getBytes(hashed);
    const signature = await wallet.signMessage(arrayified);
    return signature;
  }
}
