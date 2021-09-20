import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostModule } from './post/post.module';
import { UsersModule } from './users/users.module';
import { Ctx } from './users/interfaces/context';
import { decode } from './users/utils/jwt.utils';
import { AudioGateway } from './audio.gateway';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    PostModule,
    UsersModule,
    MongooseModule.forRoot(
      'mongodb+srv://ashutosh:3r9UYyPW43Z2dYLA@cluster0.szosu.mongodb.net/resources?retryWrites=true&w=majority',
      { useNewUrlParser: true, useUnifiedTopology: true },
    ),
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      context: ({ req, res }: Ctx) => {
        const token = req.cookies.token;
        const user = decode(token);
        if (user) req.user = user;
        return { req, res };
      },
    }),
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, AudioGateway],
})
export class AppModule {}
