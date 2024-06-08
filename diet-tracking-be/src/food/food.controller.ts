import { AuthGuard } from 'src/auth/auth.guard';
import { CreateFoodDto } from './dto/createfood.dto';
import { FoodService } from './food.service';
import { Body, Controller, Delete, Get, HttpCode, Param, Post, Req, Request, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { DietDiary } from './dto/dietDiary.dto';
import { CreateCategoryDto } from './dto/createCategory.dto';
import { HistoryDietDto } from './dto/historyDiet.dto';
import { SearchFoodDto } from './dto/searchFood.dto';

@Controller('food')
export class FoodController {
    constructor(private foodService: FoodService) {}

    @UseGuards(AuthGuard)
    @Post('/createfood')
    createFood(@Body() createFoodDto: CreateFoodDto,@Request() req:any) {
      return this.foodService.createFood(createFoodDto,req)
    }

    @UseGuards(AuthGuard)
    @Post('/updatefood/:id')
    async updateFood(@Param('id') id: number, @Body() createFoodDto: CreateFoodDto,@Request() req:any) {
        return this.foodService.updateFood(id,createFoodDto,req)
    }
    
    @UseGuards(AuthGuard)
    @Delete('/deletefood/:id')
    async deleteFood(@Param('id') id: number,@Request() req:any){
        return this.foodService.deleteFood(id,req)
    }

    @UseGuards(AuthGuard)
    @Get('/findfood')
    async findFood(@Request() req:any){
        return this.foodService.findFood(req)
    }

    @UseGuards(AuthGuard)
    @Post('/searchfood')
    async searchFood(@Body() searchFoodDto:SearchFoodDto,@Request() req:any){
        return this.foodService.searchFood(searchFoodDto,req)
    }

    @UseGuards(AuthGuard)
    @Get('/viewdietdiary')
    viewDietDiary(@Request() req:any){
      return this.foodService.viewDietDiary(req)
    }


    @UseGuards(AuthGuard)
    @Post('/createdietdiary')
    createDietDiary(@Body() dietDiary: DietDiary,@Request() req:any) {
      return this.foodService.createDietDiary(dietDiary,req)
    }

    @Get('/createcategory')
    crateCategory(){
      return this.foodService.createCategory()
    }

    @UseGuards(AuthGuard)
    @Post('/viewHistory')
    viewHistoryCategory(@Body() data: HistoryDietDto,@Request() req:any) {
      console.log(data);
      
      return this.foodService.viewHistoryCategory(data,req)
    }

    @UseGuards(AuthGuard)
    @Delete('/deletedietfood/:id')
    async deleteDietFood(@Param('id') id: number,@Request() req:any){
        return this.foodService.deleteDietFood(id,req)
    }

}
