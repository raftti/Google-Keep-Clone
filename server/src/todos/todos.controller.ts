import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { JWTGuard } from 'src/auth/guards/jwt.guard';
import { ToDosService } from './todos.service';
import { CreateToDoDto } from './dto/create-to-do.dto';
import { UpdateToDoDto } from './dto/update-to-do.dto';

@Controller('todo')
export class ToDosController {
  constructor(
    private readonly toDosService: ToDosService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(JWTGuard)
  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllToDos(@Req() req, @Res() res) {
    const token = req.token;

    const user = await this.authService.getUserByTokenData(token);
    const toDos = await this.toDosService.findAll();
    const filteredToDos = toDos.filter(
      (toDo) => toDo.userId === user._id.toString(),
    );

    return res.send(filteredToDos);
  }

  @UseGuards(JWTGuard)
  @Post()
  @HttpCode(HttpStatus.OK)
  async createToDo(@Body() createToDoDto: CreateToDoDto, @Req() req) {
    const user = await this.authService.getUserByTokenData(req.token);

    return await this.toDosService.create({
      ...createToDoDto,
      userId: user._id as string,
    });
  }

  @UseGuards(JWTGuard)
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async updateToDo(
    @Body() updateToDoDto: UpdateToDoDto,
    @Param('id') id: string,
  ) {
    return await this.toDosService.update(updateToDoDto, id);
  }

  @UseGuards(JWTGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async deleteToDo(@Param('id') id: string) {
    return await this.toDosService.delete(id);
  }
}
