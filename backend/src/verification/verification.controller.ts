import { Body, Controller, Post } from '@nestjs/common';
import { VerificationService } from './verification.service';
import { VerificationRequestDto } from './dto/verification-request.dto';

@Controller('verification')
export class VerificationController {
  constructor(private readonly appService: VerificationService) {}

  @Post()
  async verify(@Body() body: VerificationRequestDto) {
    const signature = await this.appService.verify(body.address, body.token);
    return { signature };
  }
}
