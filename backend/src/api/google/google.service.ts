import { Injectable } from '@nestjs/common';
import axios from 'axios';

const SITEVERIFY_ENDPOINT = 'https://www.google.com/recaptcha/api/siteverify';

@Injectable()
export class GoogleService {
  async verifyToken(token: string) {
    try {
      const params = new URLSearchParams();
      params.append('secret', process.env.RECAPTHA_SECRET_KEY as string);
      params.append('response', token);

      const response = await axios.post(SITEVERIFY_ENDPOINT, params);

      const { success } = response.data;

      if (!success) {
        return false;
      }

      return true;
    } catch (error) {
      return false;
    }
  }
}
