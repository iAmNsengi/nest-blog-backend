import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.services';
import { CreateUserProvider } from './create-user.provider';
import { MailService } from 'src/mail/providers/mail.service';
import { HashingProvider } from 'src/auth/providers/hashing.provider';

describe('CreateUserProvider', () => {
  let service: UsersService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateUserProvider,
        {
          provide: MailService,
          useValue: {}
        },
        { provide: HashingProvider, useValue: {} }
      ],
      imports: []
    }).compile();
  });

  describe('CreateUser', () => {
    it('Should be defined', () => {});
  });
});
