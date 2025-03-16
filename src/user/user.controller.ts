import { Controller, Get } from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "./user.entity";

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

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