import { Repository } from 'typeorm';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { UserService } from './user.service';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

export type MockType<T> = {
  [P in keyof T]?: jest.Mock<{}>;
};

// @ts-ignore
export const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(
  () => {
    jest.fn((entity) => entity);
  },
);

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;
  let userRepository: MockType<Repository<User>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();
    userService = module.get<UserService>(UserService);
    userRepository = module.get(getRepositoryToken(User));
    userController = module.get<UserController>(UserController);
  });

  it('should find a user', async () => {
    const user: User = {
      id: 1,
      firstName: 'Alina',
      lastName: 'Johnson',
      email: 'al@gmail.com',
      photo: '',
    };
    jest.spyOn(userService, 'findOne').mockImplementation(() => {
      return Promise.resolve(user);
    });
    expect(await userController.getUser(1)).toBe(user);
  });
});
