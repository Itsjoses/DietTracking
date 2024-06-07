import { IsNotEmpty } from "class-validator";

export class CreateFoodDto{
    @IsNotEmpty()
    readonly food_name: string;

    @IsNotEmpty()
    readonly description: string;
}