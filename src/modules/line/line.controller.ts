import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { lineService } from './line.service';
import { CreateLineDto } from './dto/create-line.dto';

@Controller('line')
export class LineController {
  constructor(private readonly lineService: lineService) {}


  @Post()
  create(@Body() createLine: CreateLineDto){
      return this.lineService.createLine(createLine);
  }
}
