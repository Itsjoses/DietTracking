import { Module } from '@nestjs/common';
import { FoodController } from './food.controller';
import { FoodService } from './food.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [FoodController],
  providers: [FoodService,PrismaService],
})
export class FoodModule {}
