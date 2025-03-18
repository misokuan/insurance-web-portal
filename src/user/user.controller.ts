import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { Paginate, Paginated, PaginateQuery } from 'nestjs-paginate';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // [GET] /users
  @Get()
  async getUsers(@Paginate() query: PaginateQuery): Promise<Paginated<User>> {
    return this.userService.findAll(query);
  }

  // [GET] /users/:id
  @Get(':id')
  async getUser(id: number): Promise<User> {
    return await this.userService.findOne(id);
  }
}
