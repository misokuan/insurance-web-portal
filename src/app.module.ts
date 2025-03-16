import { Module } from '@nestjs/common';
import { BillingModule } from './billing/billing.module';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRoot({
        type: 'postgres',
        host: 'localhost',
        port: parseInt(process.env.POSTGRES_PORT || "5434"),
        username: "user",
        password: "password",
        database: 'CUSTOMER_BILLING_PORTAL',
        entities: [__dirname + '**/*.entity.ts'],
        synchronize: false,
        autoLoadEntities: true,
    }),
    BillingModule,
    UserModule
  ],
})
export class AppModule {}
