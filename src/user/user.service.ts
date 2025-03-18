import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./user.entity";
import { FilterOperator, paginate, Paginated, PaginateQuery } from "nestjs-paginate";

@Injectable({})
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) { }

  // GET all users
  async findAll(query: PaginateQuery): Promise<Paginated<User>> {
    return paginate(query, this.userRepository, {
      sortableColumns: ['firstName'],
      filterableColumns: {
        firstName: [FilterOperator.ILIKE],
        lastName: [FilterOperator.ILIKE]
      },
      defaultLimit: 6,
    })
  }

  // GET specific user
  async findOne(id: number): Promise<User> {
    return await this.userRepository.findOneOrFail({ where: { id } });
  }

}