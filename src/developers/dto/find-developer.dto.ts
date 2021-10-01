import { ApiPropertyOptional, PartialType } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsPositive } from "class-validator";
import { CreateDeveloperDto } from "./create-developer.dto";

export class FindDeveloperDto extends PartialType(CreateDeveloperDto) {
    @ApiPropertyOptional({ description: 'Paginação - quantidade de saltos' })
    @IsOptional()
    @IsPositive()
    skip: number;

    @ApiPropertyOptional({ description: 'Paginação - quantidade por página' })
    @IsOptional()
    @IsPositive()
    take: number;
}
