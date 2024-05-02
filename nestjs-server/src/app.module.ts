// app.module.ts
import { Module } from '@nestjs/common';
import { AuthModule } from './auth.module'; // Import the AuthModule

@Module({
  imports: [AuthModule], // Include the AuthModule here
})
export class AppModule {}
