import { Controller, Post, Get, Patch, Body } from '@nestjs/common';
import {  ApiOperation, ApiCreatedResponse } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from 'src/database/entities/user.entity';
import { UserService } from './user.service';
@Controller('user')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo usuario' })
  @ApiCreatedResponse({ type: User })
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }
}
