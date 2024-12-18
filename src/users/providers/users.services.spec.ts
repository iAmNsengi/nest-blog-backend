import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.services';
import { FindOneByGoogleIdProvider } from './find-one-by-google-id.provider';
import { FindOneUserByEmailProvider } from './find-one-user-by-email.provider';
import { CreateUserProvider } from './create-user.provider';
import { UsersCreateManyProvider } from './users-create-many.provider';

describe('UsersService', () => {
  let service: UsersService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
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
    it('Service should be defined', () => {});
  });
});
