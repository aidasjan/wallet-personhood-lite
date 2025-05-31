import { BadRequestException, Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class VerificationService {
  async verify(address: string, token: string) {
    try {
      const url = `https://www.google.com/recaptcha/api/siteverify`;
      const params = new URLSearchParams();
      params.append('secret', process.env.RECAPTHA_SECRET_KEY as string);
      params.append('response', token);

      const response = await axios.post(url, params);

      const { success } = response.data;

      if (!success) {
        throw new BadRequestException('Failed CAPTCHA verification');
      }

      return true;
    } catch (error) {
      throw new BadRequestException('CAPTCHA validation error');
    }
  }
}
