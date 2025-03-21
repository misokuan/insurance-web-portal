import { User } from 'src/user/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity({ name: 'BILLING_RECORDS' })
export class Billing {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  productCode: number;

  @Column()
  location: string;

  @Column('decimal', { scale: 2 })
  premiumPaid: number;

  @Column({ name: 'userId' })
  userId: number;

  @ManyToOne(() => User, (user) => user.billings)
  @JoinColumn({ name: 'userId' })
  user?: User;
}
