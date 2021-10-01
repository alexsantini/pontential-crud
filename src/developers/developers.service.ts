import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDeveloperDto } from './dto/create-developer.dto';
import { FindDeveloperDto } from './dto/find-developer.dto';
import { UpdateDeveloperDto } from './dto/update-developer.dto';
import { Developer } from './entities/developer.entity';

@Injectable()
export class DevelopersService {

    constructor(
        @InjectRepository(Developer)
        private readonly developerRepository: Repository<Developer>,
    ) {}

    async findAll(findDeveloperDto: FindDeveloperDto){
        const { skip, take, ...where } = findDeveloperDto;
        const developers = await this.developerRepository.find({
            where: where,
            skip: skip,
            take: take,
        });
        if(Object.keys(findDeveloperDto).length && !developers.length){
            throw new NotFoundException(`Developers not found`);
        }
        return developers;
    }

    async findOne(id: number){
        const developer = await this.developerRepository.findOne(id);
        if(!developer){
            throw new NotFoundException(`Developer #${id} not found`);
        }
        return developer;
    }

    async create(createDeveloperDto: CreateDeveloperDto){
        const developer = this.developerRepository.create({
            ...createDeveloperDto,
        });
        return this.developerRepository.save(developer);
    }

    async update(id: number, updateDeveloperDto: UpdateDeveloperDto){
        const developer = await this.developerRepository.preload({
            id: +id,
            ...updateDeveloperDto,
        });
        if(!developer){
            throw new NotFoundException(`Developer #${id} not found`);
        }
        return this.developerRepository.save(developer);
    }

    async remove(id: number){
        const developer = await this.findOne(id);
        return this.developerRepository.remove(developer);
    }
}
