import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PhotosController } from './photos/photos.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
  ],
  controllers: [AppController, PhotosController],
  providers: [AppService],
})
export class AppModule {}
