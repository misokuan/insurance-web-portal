import { Controller, Get } from "@nestjs/common";
import { UsersService } from "./users.service";
import { User } from "./user.entity";

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) { }

  // [GET] /users
  @Get()
  async getUsers(): Promise<User[]> {
    return this.userService.findAll();
  }

  // [GET] /users/:id
  @Get(':id')
  async getUser(
    id: number
  ): Promise<User> {
    return await this.userService.findOne(id);
  }
}