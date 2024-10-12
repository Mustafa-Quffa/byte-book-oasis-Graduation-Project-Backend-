import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config'; // Assuming you're using ConfigService

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, // Token expiration should be handled
      secretOrKey: configService.get<string>('JWT_SECRET'), // Your JWT secret key
    });
  }

  async validate(payload: any) {
    // Attach the payload to the request object, typically the user object
    return { userId: payload.sub, email: payload.email, roles: payload.roles };
  }
}
