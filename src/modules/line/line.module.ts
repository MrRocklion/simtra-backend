import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Line } from 'src/database/entities/line.entity';
import { LineController } from './line.controller';
import { lineService } from './line.service';
import { Company } from 'src/database/entities/company.entity';




@Module({
  imports:[DatabaseModule,TypeOrmModule.forFeature([Line,Company])],
  controllers: [LineController],
  providers: [lineService],
  exports:[lineService]
})
export class LineModule {}
