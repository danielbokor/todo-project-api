import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ECDH } from 'crypto';
import { access } from 'fs';
import { UserModel } from '../users/models/user.model';
import { UsersService } from '../users/users.service';
import { jwtConstants, tokenExpiry } from './constants';
import { AccessTokenPayload } from './models/access-token.payload';
import { LoginPayload } from './models/login.payload';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<UserModel> {
    const existentUser = await this.usersService.findOne(email);

    const isMatch = await bcrypt.compare(password, existentUser.password);
    if (!isMatch) {
      throw new BadRequestException('Email/password combination is wrong');
    }
    return existentUser;
  }

  async login(email: string, password: string) {
    const { id } = await this.validateUser(email, password);

    const payload = { id, email };
    return {
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload, {
        expiresIn: tokenExpiry.oneWeek,
        secret: jwtConstants.refreshSecret,
      }),
    };
  }

  async verifyAccessToken(accessToken: string) {
    return this.jwtService.verifyAsync(accessToken);
  }

  async verifyRefreshToken(refreshToken: string) {
    return this.jwtService.verifyAsync(refreshToken, {
      secret: jwtConstants.refreshSecret,
    });
  }

  async refreshAccessToken(refreshToken: string): Promise<AccessTokenPayload> {
    const isMatch = await this.verifyRefreshToken(refreshToken);

    if (!isMatch) {
      throw new BadRequestException('Refresh token is invalid!');
    }

    const decoded = this.jwtService.decode(refreshToken);
    const { id, email } = decoded as { [key: string]: any };

    return {
      accessToken: this.jwtService.sign({ id, email }),
    };
  }
}
