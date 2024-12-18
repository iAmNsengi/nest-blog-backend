import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.services';

describe('UsersService', () => {
  let service: UsersService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
      imports: []
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  describe('root', () => {
    it('Service should be defined', () => {});
  });
});
