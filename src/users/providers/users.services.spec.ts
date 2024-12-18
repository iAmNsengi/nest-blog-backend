import { Test, TestingModule } from '@nestjs/testing';

describe('UsersService', () => {
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({}).compile();
  });

  describe('root', () => {
    it('Service should be defined', () => {});
  });
});
