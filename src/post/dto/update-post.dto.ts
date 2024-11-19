import { IsString, Length } from "class-validator"

export class UpdatePostDto {
    @Length(5,100)
    @IsString()
    title:string
    @Length(5,100)
    @IsString()
    content:string
}
