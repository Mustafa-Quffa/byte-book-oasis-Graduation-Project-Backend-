import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { BookModule } from './book/book.module';
import { UserBooksModule } from './user_books/user_books.module';
import { NationalityModule } from './nationalities/nationalities.module';
import { GenresModule } from './genres/genres.module';
import { BookGenresModule } from './book_genres/book_genres.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forRoot({
        isGlobal: true, // Makes the configuration available globally
      })],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [join(__dirname, '**', '*.entity.{ts,js}')],
        synchronize: true,
      }),
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        transport: {
          host: configService.get('MAIL_HOST'), // Example: 'smtp.mailtrap.io'
          port: configService.get('MAIL_PORT'), // Example: 2525
          auth: {
            user: configService.get('MAIL_USER'),
            pass: configService.get('MAIL_PASS'),
          },
        },
        defaults: {
          from: '"No Reply" <thecosen434@gmail.com>', // Default sender
        },
        template: {
          dir: join(__dirname, 'templates'), // Directory for your email templates
          adapter: new HandlebarsAdapter(), // Use Handlebars for templating
          options: {
            strict: true,
          },
        },
      }),
    }),
    UserModule,
    BookModule,
    UserBooksModule,
    NationalityModule,
    GenresModule,
    BookGenresModule,
    AdminModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
