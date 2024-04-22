import { Module } from '@nestjs/common';
import { HashPasswordService } from './hashPassword.service';
@Module({
  providers: [HashPasswordService],
})
export class HashPasswordModule {}
