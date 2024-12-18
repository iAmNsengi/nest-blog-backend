import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.services';
import { FindOneByGoogleIdProvider } from './find-one-by-google-id.provider';
import { FindOneUserByEmailProvider } from './find-one-user-by-email.provider';
import { CreateUserProvider } from './create-user.provider';
import { UsersCreateManyProvider } from './users-create-many.provider';
import { DataSource } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { CreateUserDTO } from '../dtos/create-user.dto';
import { create } from 'domain';
import exp from 'constants';

describe('UsersService', () => {
  let service: UsersService;
  beforeEach(async () => {
    // Just testing if the createUserProvider has a method to create user and if it fires it on request
    const mockCreateUserProvider: Partial<CreateUserProvider> = {
      createUser: (createUserDTO: CreateUserDTO) =>
        Promise.resolve({
          id: 12,
          firstName: createUserDTO.firstName,
          lastName: createUserDTO.lastName,
          email: createUserDTO.email,
          password: createUserDTO.password
        })
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: DataSource, useValue: {} },
        { provide: getRepositoryToken(User), useValue: {} },
        {
          provide: FindOneByGoogleIdProvider,
          useValue: {}
        },
        {
          provide: FindOneUserByEmailProvider,
          useValue: {}
        },
        {
          provide: CreateUserProvider,
          useValue: {}
        },
        { provide: UsersCreateManyProvider, useValue: {} }
      ],
      imports: []
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  describe('root', () => {
    it('Service should be defined', () => {
      expect(service).toBeDefined();
    });
  });

  describe('CreateUser', () => {
    it('Should be defined', () => {
      expect(service.createUser).toBeDefined();
    });

    it('Should call create user on CreateUserProvider', async () => {
      let user = await service.createUser({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@doe.com',
        password: 'password'
      });
      expect(user.firstName).toEqual('John');
    });
  });
});
