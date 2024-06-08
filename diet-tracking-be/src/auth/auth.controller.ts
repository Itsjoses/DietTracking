import { Body, Controller, Get, HttpCode, Post, Request, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { SignInDto } from './dto/signin.dto';
import { AuthGuard } from './auth.guard';
import { ChangeProfileDto } from './dto/changeprofile.dto';
import { ChangeBmiDto } from './dto/changebmi.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/signup')
    @UsePipes(ValidationPipe)
    signUp(@Body() signUpDto: SignUpDto) {
      return this.authService.signUp(signUpDto);
    }

    @Post('/signin')
    @UsePipes(ValidationPipe)
    signIn(@Body() signInDto: SignInDto) {
      return this.authService.signIn(signInDto);
    }

    @UseGuards(AuthGuard)
    @Get('/profile')
    @UsePipes(ValidationPipe)
    getProfile(@Request() req:any) {
      return this.authService.getProfile(req);
    }

    @UseGuards(AuthGuard)
    @Post('/changeprofile')
    @UsePipes(ValidationPipe)
    changeProfile(@Body() changeProfileDto:ChangeProfileDto,@Request() req:any) {
      return this.authService.changeProfile(changeProfileDto,req);
    }

    @UseGuards(AuthGuard)
    @Post('/changebmi')
    @UsePipes(ValidationPipe)
    changeBmi(@Body() changeBmiDto:ChangeBmiDto,@Request() req:any) {
      return this.authService.changeBmi(changeBmiDto,req);
    }

    @UseGuards(AuthGuard)
    @Get('/getBmi')
    @UsePipes(ValidationPipe)
    getTotalBMI(@Request() req:any) {
      return this.authService.getTotalBMI(req);
    }

    @Get("/me")
    @UseGuards(AuthGuard)
    @Get()
    testingApi(@Request() req:any){
      return this.authService.getMe(req)
    }


}
