import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerModule } from 'nestjs-pino';
import { HealthModule } from './modules/health/health.module';
import { PaymentModule } from './modules/payment/payment.module';
import { OrdersModule } from './modules/orders/orders.module';
import { AuthModule } from './modules/auth/auth.module';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongod: MongoMemoryServer;
@Module({
  imports: [
    // 3. ConfigModule with Environment Validation
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    // 11. Request Logging via Pino
    LoggerModule.forRoot({
      pinoHttp: {
        transport: {
          target: 'pino-pretty',
          options: {
            singleLine: true,
          },
        },
      },
    }),

    // 2. MongoDB Connection
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        let uri = configService.get<string>('MONGODB_URI', 'mongodb://localhost:27017/datahubgh');
        if (uri.includes('localhost') || uri.includes('127.0.0.1')) {
          mongod = await MongoMemoryServer.create();
          uri = mongod.getUri();
        }
        return {
          uri,
          serverSelectionTimeoutMS: 2000,
        };
      },
      inject: [ConfigService],
    }),

    // 13. Health Check Module
    HealthModule,
    PaymentModule,
    OrdersModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
