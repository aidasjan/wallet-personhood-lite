import { Module } from '@nestjs/common';
import { VerificationController } from './verification.controller';
import { VerificationService } from './verification.service';
import { GoogleModule } from 'src/api/google/google.module';

@Module({
  imports: [GoogleModule],
  controllers: [VerificationController],
  providers: [VerificationService],
})
export class VerificationModule {}
