import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Line } from 'src/database/entities/line.entity';
import { Repository } from 'typeorm';
import { CreateLineDto } from './dto/create-line.dto';
import { Company } from 'src/database/entities/company.entity';

@Injectable()
export class lineService {
  constructor(
    @InjectRepository(Line)
    private readonly lineRepository: Repository<Line>,

    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {}

   async createLine(createLineDto: CreateLineDto) {
    const company =  await this.companyRepository.findOne({where:{id:createLineDto.company_id,status:true}})

    if(!company){
      throw new NotFoundException(`Company with ID ${createLineDto.company_id} does not exists`)
    }
    const createLine = await this.lineRepository.create({
      name:createLineDto.name,
      code:createLineDto.code,
      description:createLineDto.description,
      company:company
    });
    const savedLine = await this.lineRepository.save(createLine);
    return{
      result:savedLine,
      message: 'Line created successfully'
    }

   }
  

 
}
