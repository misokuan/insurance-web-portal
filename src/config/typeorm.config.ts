import { Injectable } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { LoggerOptions } from 'typeorm';

@Injectable()
export class TypeOrmConfig implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) { }

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'user',
      password: 'password',
      database: 'CUSTOMER_BILLING_PORTAL',
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: false,
      logging: true
    };
  }
}

export const typeOrmConfigAsync: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  useClass: TypeOrmConfig,
  inject: [ConfigService]
};