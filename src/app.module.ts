import { Module } from '@nestjs/common';
import { BillingModule } from './billing/billing.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: 5432,
      username: 'user',
      password: 'password',
      database: 'CUSTOMER_BILLING_PORTAL',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    BillingModule,
    UserModule
  ],
})
export class AppModule {}
