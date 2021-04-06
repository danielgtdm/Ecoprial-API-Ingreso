import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
import { ConnectionOptions } from 'typeorm';
import { Configuration } from '../config/config.keys';

export const databaseProviders = [
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    async useFactory(config: ConfigService) {
      return {
        type: 'mysql',
        host: config.get(Configuration.HOST),
        username: config.get(Configuration.USERNAME),
        port: 3306,
        database: config.get(Configuration.DATABASE),
        password: config.get(Configuration.PASSWORD),
        logging: 'all',
        logger: 'file',
        entities: [__dirname + '/../**/*.entity.{js,ts}'],
        subscribers: [__dirname + '/../**/*.subscriber.{js,ts}'],
        migrations: [__dirname + '/migrations/*.{ts,js}'],
        synchronize: true,
      } as ConnectionOptions;
    },
  }),
];
