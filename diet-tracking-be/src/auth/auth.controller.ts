import { Body, Controller, Get, HttpCode, Post, Request, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { SignInDto } from './dto/signin.dto';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/signup')
    @UsePipes(ValidationPipe)
    signUp(@Body() signUpDto: SignUpDto): Promise<{ access_token: string }> {
      return this.authService.signUp(signUpDto);
    }

    @Post('/signin')
    @UsePipes(ValidationPipe)
    signIn(@Body() signInDto: SignInDto) {
      return this.authService.signIn(signInDto);
    }

    @Get("/testing")
    @UseGuards(AuthGuard)
    @Get()
    testingApi(@Request() req:any){
      return req.user
    }


}
