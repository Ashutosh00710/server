import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostModule } from './post/post.module';

@Module({
  imports: [
    PostModule,
    MongooseModule.forRoot(
      'mongodb+srv://ashutosh:3r9UYyPW43Z2dYLA@cluster0.szosu.mongodb.net/resources?retryWrites=true&w=majority',
      { useNewUrlParser: true, useUnifiedTopology: true },
    ),
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
