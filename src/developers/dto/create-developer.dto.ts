import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsEnum, IsString } from "class-validator";
import { Gender } from "src/common/enum/gender.enum";

export class CreateDeveloperDto {
    @ApiProperty({ description: 'Nome do desenvolvedor' })
    @IsString()
    readonly name: string;

    @ApiProperty({ description: 'Gênero do desenvolvedor' })
    @IsEnum(Gender)
    readonly gender: Gender;

    @ApiProperty({ description: 'Hobby do desenvolvedor' })
    @IsString()
    readonly hobby: string;

    @ApiProperty({ description: 'Data de nascimento do desenvolvedor' })
    @IsDateString()
    readonly birth_date: string;
}
