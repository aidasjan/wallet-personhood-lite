import { Body, Controller, Get, Post } from '@nestjs/common';
import { VerificationService } from './verification.service';
import { VerificationRequestDto } from './dto/verification-request.dto';

@Controller('verification')
export class VerificationController {
  constructor(private readonly appService: VerificationService) {}

  @Post()
  verify(@Body() body: VerificationRequestDto) {
    return this.appService.verify(body.address, body.token);
  }
}
