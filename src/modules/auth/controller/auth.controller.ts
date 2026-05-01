import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { Public } from '../decorators/public.decorator';

@Public()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register')
  async register(@Body() body: any) {
    const { email, password } = body;
    return this.authService.register(email, password);
  }

  @Post('login')
  async login(@Body() body: any) {
    const { email, password } = body;
    const isUserValid = await this.authService.validateUser(email, password);

    if (!isUserValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.authService.login(isUserValid);
  }
}
