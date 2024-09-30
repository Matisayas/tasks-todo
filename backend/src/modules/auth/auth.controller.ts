import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GetAuthPayload } from './decorators';
import { IsPublicResource } from './decorators/is-public-resource.decorator';
import { AuthPayloadDTO } from './dto/auth-payload.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @IsPublicResource()
  async login(@Body() loginDto: LoginDto) {
    const response = await this.authService.login(loginDto);
    return response;
  }

  @Get('profile')
  profile(@GetAuthPayload() user: AuthPayloadDTO) {
    return user;
  }
}
