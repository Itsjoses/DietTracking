import { DietDiary } from './dto/dietDiary.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateFoodDto } from './dto/createfood.dto';
import { CreateCategoryDto } from './dto/createCategory.dto';
import { HistoryDietDto } from './dto/historyDiet.dto';
import { SearchFoodDto } from './dto/searchFood.dto';
import { log } from 'console';
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

  async deleteDietFood(foodId: number, req: any) {
    log
    // Delete the food item from the database
    const deletedFood = await this.prisma.dietDiary.delete({
      where: { id: Number(foodId), userId: req.user.id },
    });
    if (!deletedFood) {
      throw new NotFoundException('Food not found');
    }

    return deletedFood;
  }

  async findFood( req: any) {
    const findFood = await this.prisma.food.findMany({
        where: {
            userId: Number(req.user.sub)
        },
        select: {
            id: true,
            food_name: true,
            description: true,
            calories: true,
        }
    });
    return findFood;
}


async searchFood(searchFoodDto: SearchFoodDto, req: any) {
  const {food_name} = searchFoodDto
  console.log(food_name);
  
  const findFood = await this.prisma.food.findMany({
      where: {
          userId: Number(req.user.sub),
          food_name: { contains: food_name }
      },
      select: {
          id: true,
          food_name: true,
          description: true,
          calories: true,
      }
  });
  return findFood;
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
    for (const cat of allCategory) {
      await this.prisma.category.create({
        data: {
          category_name: cat,
        },
      });
    }
  }

  async viewDietDiary(req:any){

    const allDietDiary = await this.prisma.dietDiary.findMany({
      where:{
        userId: Number(req.user.sub),
      },
      include: {
        category: true,
      },
    })

    return allDietDiary
  }

  async viewHistoryCategory(historyDietDto: HistoryDietDto,req:any){
    const {category_id} = historyDietDto
    const dietHistoryCategory = await this.prisma.dietDiary.findMany({
      where:{
        userId: Number(req.user.sub),
        categoryId: Number(category_id)
      },
      orderBy: {
        date: 'desc' // Order by date in descending order
      }
    })

    return dietHistoryCategory
  }
}
