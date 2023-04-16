import { Injectable, Logger } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
@Injectable()
export class ConfigService implements TypeOrmOptionsFactory {
  private readonly envConfig: { [key: string]: string };
  private readonly logger = new Logger('Config');

  constructor() {
    try {
      this.envConfig = dotenv.parse(fs.readFileSync('.env'));
    } catch (e) {
      this.envConfig = process.env;
    }
    process.env = Object.assign(process.env, this.envConfig);
  }
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_POST, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABSE,
      schema: 'reach',
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: false,
      logging: false,
    };
  }
}
