import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { DevelopersService } from './developers.service';
import { Developer } from './entities/developer.entity';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

const createMockRepository = <T = any>(): MockRepository<T> => ({
  findOne: jest.fn(),
  create: jest.fn(),
});

describe('DevelopersService', () => {
  let service: DevelopersService;
  let developerRepository: MockRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DevelopersService,
        { provide: Connection, useValue: {} },
        { provide: getRepositoryToken(Developer), useValue: createMockRepository() },
      ],
    }).compile();

    service = module.get<DevelopersService>(DevelopersService);
    developerRepository = module.get<MockRepository>(getRepositoryToken(Developer));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    describe('when developer with ID exists', () => {
      it('should return the developer object', async () => {
        const developerId = 1;
        const expectedDeveloper = {};

        developerRepository.findOne.mockReturnValue(expectedDeveloper);
        const developer = await service.findOne(developerId);
        expect(developer).toEqual(expectedDeveloper);
      });
    });
    describe('otherwise', () => {
      it('should throw the "NotFoundException"', async () => {
        const developerId = 1;
        developerRepository.findOne.mockReturnValue(undefined);

        try{
          await service.findOne(developerId);
        }
        catch (err){
          expect(err).toBeInstanceOf(NotFoundException);
          expect(err.message).toEqual(`Developer #${developerId} not found`);
        }
      });
    });
  });

});
