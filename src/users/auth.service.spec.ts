import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { UsersDBService } from './usersDb.service';
import { User } from './users.entity';

describe('authservice', () => {
  let authService: AuthService;

  const mockUser: Omit<User, 'id'> = {
    name: 'Mauricio',
    createdAt: '01-01-2024',
    password: '123456',
    email: 'mauricio@gmail.com',
    isAdmin: true,
  };

  beforeEach(async () => {
    const mockUsersService: Partial<UsersDBService> = {
      getUserByEmail: () => Promise.resolve(undefined),
      saveUser: (user: Omit<User, 'id'>): Promise<User> =>
        Promise.resolve({
          ...user,
          isAdmin: true,
          id: '1234fs-234sd-24csfd-34sdfg     ',
        }),
    };

    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        JwtService,
        {
          provide: UsersDBService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  it('Creando instancia de AuthService', async () => {
    expect(authService).toBeDefined();
  });

  it('singup() Creando un nuevo usuario e incriptando el password', async () => {
    const user = await authService.singUp(mockUser);
    expect(user).toBeDefined();
    expect(user.password).not.toEqual(mockUser.password)
  });
});
