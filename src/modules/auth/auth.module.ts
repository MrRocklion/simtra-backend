import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from 'src/common/strategies/jwt.strategy';
import { UsersModule } from '../users/users.module';
import { MailsModule } from 'src/shared/mails/mails.module';
import { AppConfigModule } from 'src/config/config.module';




@Module({
  imports: [
    AppConfigModule,
    UsersModule,
    MailsModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
