import { ChangeBmiDto } from './dto/changebmi.dto';
import { ChangeProfileDto } from './dto/changeprofile.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignUpDto } from './dto/signup.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './dto/signin.dto';
@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto) {
    const { username, email, password,gender,dob, tall, weight, plan } = signUpDto;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        dob: new Date(dob),
        tall,
        weight,
        gender,
        plan
      },
    });

    const payload = { sub: user.id, username: user.username };
    return {
      username: user.username,
      jwt: await this.jwtService.signAsync(payload),
    };
  }

  async getMe(req: any){
    const user = await this.prisma.user.findUnique({
      where:{
        id: req.user.sub
      },
      select: {
        username: true,
        email: true,
        dob: true,
        tall: true,
        weight: true,
        gender: true,
        plan: true,
      }
    })
    return user
  }

  async getProfile(req: any){
    const user = await this.prisma.user.findUnique({
      where:{
        id: Number(req.user.sub)
      },
      select: {
        username: true,
        email: true,
        dob: true,
        tall: true,
        weight: true,
        gender: true,
        plan: true,
      }
    })
    return user
  }

  async signIn(signInDto: SignInDto) {
    const {email, password } = signInDto;
    const user = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    const isMatch = await bcrypt.compare(password, user?.password);
    if (!isMatch) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, username: user.username };
    return {
      username: user.username,
      jwt: await this.jwtService.signAsync(payload),
    };
  }

  async changeProfile(changeProfileDto:ChangeProfileDto,req:any){
    const {username, email,dob } = changeProfileDto;
    console.log(req.user);
    
    const user = await this.prisma.user.update({
      where: {
        id: Number(req.user.sub),
      },
      data: {
        username,
        email,
        dob: new Date(dob)
      },
    });

    return user;
  }

  async changeBmi(changeBmiDto:ChangeBmiDto,req:any){
    const {tall, weight,plan } = changeBmiDto;
    const user = await this.prisma.user.update({
      where: {
        id: Number(req.user.sub),
      },
      data: {
        tall,
        weight,
        plan
      },
    });

    return user;
  }

}
