import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateCourseCateforyDto {

    @ApiProperty({example: 'Programming'})
    @IsString()
    @IsNotEmpty()
    name: string
}