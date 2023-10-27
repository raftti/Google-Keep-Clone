import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ToDosController } from './todos.controller';
import { ToDosService } from './todos.service';
import { ToDo, ToDosSchema } from '../schemas/todos.schema';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ToDo.name, schema: ToDosSchema }]),
    AuthModule,
  ],
  controllers: [ToDosController],
  providers: [ToDosService],
})
export class ToDosModule {}
