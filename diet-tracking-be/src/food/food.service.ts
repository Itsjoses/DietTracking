import { DietDiary } from './dto/dietDiary.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateFoodDto } from './dto/createfood.dto';

@Injectable()
export class FoodService {
  constructor(private prisma: PrismaService) {}

  async createFood(createFoodDto: CreateFoodDto, req: any) {
    const { food_name, description } = createFoodDto;
    const userId = req.user.sub; // Assuming req.user contains the user information

    // Create food using Prisma
    const food = await this.prisma.food.create({
      data: {
        user: { connect: { id: userId } },
        food_name,
        description,
      },
    });

    return food;
  }

  async updateFood(id: number, createFoodDto: CreateFoodDto, req: any) {
    const { food_name, description } = createFoodDto;
    // Update the food item
    const updatedFood = await this.prisma.food.update({
      where: {
        id: Number(id),
        userId: req.user.id, // Add condition to match userId
      },
      data: createFoodDto,
  });
  if (!updatedFood) {
    throw new NotFoundException('Food not found');
  }

  return updatedFood;
  }

  async deleteFood(foodId: number,req:any) {
    // Delete the food item from the database
    const deletedFood = await this.prisma.food.delete({
        where: { id: Number(foodId),userId: req.user.id, },
    });
    if (!deletedFood) {
      throw new NotFoundException('Food not found');
    }
    
    return deletedFood;
}

  async createDietDiary(DietDiaryDto: DietDiary, req: any) {
    const { user, food } = DietDiaryDto;

    const dietDiary = await this.prisma.dietDiary.create({
      data: {
        user: { connect: { id: user } }, // Menghubungkan dengan user berdasarkan ID
        food: { connect: { id: food } }, // Menghubungkan dengan food berdasarkan ID
        date: new Date(),
      },
    });
    return dietDiary;
  }
}
