import { ChangeBmiDto } from './dto/changebmi.dto';
import { ChangeProfileDto } from './dto/changeprofile.dto';
import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
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

  async getTotalBMI(req: any) {
    const user = await this.prisma.user.findUnique({
      where: {
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
    });
  
    if (!user) {
      throw new NotFoundException('User not found');
    }
  
    // Calculate age
    const dob = new Date(user.dob);
    const ageDifMs = Date.now() - dob.getTime();
    const ageDate = new Date(ageDifMs); // miliseconds from epoch
    const age = Math.abs(ageDate.getUTCFullYear() - 1970);
  
    // Calculate BMR
    let BMR;
    if (user.gender === 'male') {
      BMR = 88.362 + (13.397 * user.weight) + (4.799 * user.tall) - (5.677 * age);
    } else {
      BMR = 447.593 + (9.247 * user.weight) + (3.098 * user.tall) - (4.330 * age);
    }
  
    // Activity level multiplier (assuming sedentary here, you may want to make this dynamic)
    const activityMultiplier = 1.2;
    const TDEE = BMR * activityMultiplier;
  
    // Plan based caloric deficit calculation
    let dailyCaloricDeficit;
    switch (user.plan) {
      case 1:
        dailyCaloricDeficit = (20 * 7700) / (5 * 30); // 5 months approx 150 days
        break;
      case 2:
        dailyCaloricDeficit = (10 * 7700) / (3 * 30); // 3 months approx 90 days
        break;
      case 3:
        dailyCaloricDeficit = (5 * 7700) / (1.3 * 30); // 1.3 months approx 39 days
        break;
      default:
        throw new BadRequestException('Invalid plan');
    }
  
    const dailyCaloricIntake = TDEE ;
  
    return {
      username: user.username,
      email: user.email,
      dailyCaloricIntake: Math.floor(dailyCaloricIntake),
    };
  }

}
