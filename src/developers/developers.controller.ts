import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { DevelopersService } from './developers.service';
import { CreateDeveloperDto } from './dto/create-developer.dto';
import { FindDeveloperDto } from './dto/find-developer.dto';
import { UpdateDeveloperDto } from './dto/update-developer.dto';

@ApiTags('Desenvolvedores')
@Controller('developers')
export class DevelopersController {

    constructor(
        private readonly developersService: DevelopersService,
    ){}

    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Desenvolvedor não encontrado' })
    @Get()
    findAll(@Query() findDeveloperDto: FindDeveloperDto){
        return this.developersService.findAll(findDeveloperDto);
    }

    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Desenvolvedor não encontrado' })
    @Get(':id')
    findOne(@Param('id') id: number){
        return this.developersService.findOne(id);
    }

    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Erro de validação dos campos' })
    @Post()
    create(@Body() createDeveloperDto: CreateDeveloperDto){
        return this.developersService.create(createDeveloperDto);
    }

    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Erro de validação dos campos' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Desenvolvedor não encontrado' })
    @Put(':id')
    update(@Param('id') id: number, @Body() updateDeveloperDto: UpdateDeveloperDto){
        return this.developersService.update(id, updateDeveloperDto);
    }

    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Desenvolvedor não encontrado' })
    @Delete(':id')
    remove(@Param('id') id: number){
        return this.developersService.remove(id);
    }
}
