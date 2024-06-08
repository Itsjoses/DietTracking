import { DietDiary } from './dto/dietDiary.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateFoodDto } from './dto/createfood.dto';
import { CreateCategoryDto } from './dto/createCategory.dto';

@Injectable()
export class FoodService {
  constructor(private prisma: PrismaService) {}

  async createFood(createFoodDto: CreateFoodDto, req: any) {
    const { food_name, description, calories } = createFoodDto;
    const userId = req.user.sub; // Assuming req.user contains the user information

    // Create food using Prisma
    const food = await this.prisma.food.create({
      data: {
        user: { connect: { id: userId } },
        food_name,
        description,
        calories,
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

  async deleteFood(foodId: number, req: any) {
    // Delete the food item from the database
    const deletedFood = await this.prisma.food.delete({
      where: { id: Number(foodId), userId: req.user.id },
    });
    if (!deletedFood) {
      throw new NotFoundException('Food not found');
    }

    return deletedFood;
  }

  async findFood(req: any){
    const findFood = await this.prisma.food.findMany({
      where:{userId: Number(req.user.sub) },
      select:{
        id: true,
        food_name: true,
        description: true,
        calories: true,
      }
    })
    return findFood
  }

  async createDietDiary(DietDiaryDto: DietDiary, req: any) {
    const { food_id,category } = DietDiaryDto;
    const food = await this.prisma.food.findUnique({
      where: {
        id: food_id,
      },
    });
    const dietDiary = await this.prisma.dietDiary.create({
      data: {
        user: { connect: { id: Number(req.user.sub) } }, // Menghubungkan dengan user berdasarkan ID
        category: { connect: { id: category } }, // Menghubungkan dengan user berdasarkan ID
        food_name: food.food_name,
        description: food.description,
        calories: food.calories,
        date: new Date(),
      },
    });
    return dietDiary;
  }

  async createCategory() {
    const allCategory = ['Breakfast','Lunch','Dinner']
    const allData = allCategory.map(async (cat) => {
      await this.prisma.category.create({
        data: {
          category_name: cat,
        },
      });
    })
    return allData;
  }
}
