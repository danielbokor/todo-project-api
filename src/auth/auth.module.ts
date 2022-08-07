import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { jwtConstants, tokenExpiry } from './constants';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: tokenExpiry.oneMinute }, //TODO: increase the expiry time
    }),
  ],
  providers: [AuthService, UsersService, AuthResolver],
  exports: [AuthService],
})
export class AuthModule {}
