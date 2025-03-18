import { User } from 'src/user/user.entity';
import { UserSeed } from './user.seed';
import { Seeder } from '@jorgebodega/typeorm-seeding';
import { DataSource } from 'typeorm';

export default class UserSeeder extends Seeder {
  async run(dataSource: DataSource): Promise<void> {
    const users: User[] = UserSeed.map((data) => {
      const user = new User();
      Object.assign(user, data);
      return user;
    });
    await dataSource.createEntityManager().save<User>(users);
  }
}
