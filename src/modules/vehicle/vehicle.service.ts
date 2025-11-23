import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { Between, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Vehicle } from 'src/database/entities/vehicle.entity';
import { User } from 'src/database/entities/user.entity';
import { Company } from 'src/database/entities/company.entity';


@Injectable()
export class VehicleService {
    constructor(
        @InjectRepository(Vehicle)
        private readonly vehicleRepository: Repository<Vehicle>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Company)
        private readonly companyRepository: Repository<Company>,
    ) { }


    async create(createVehicle: CreateVehicleDto) {
        const company = await this.companyRepository.findOne({
            where: { id: createVehicle.company_id },
        });

        if (!company) {
            throw new NotFoundException(`The Company with ${createVehicle.company_id} does not exists`);
        }

        let user: User | undefined = undefined;
        if (createVehicle.user_id !== null && createVehicle.user_id !== undefined) {
            const foundUser = await this.userRepository.findOne({
                where: { id: createVehicle.user_id },
            });
            if (!foundUser) {
                throw new NotFoundException(`The User with ${createVehicle.user_id} does not exists`);
            }
            user = foundUser;
        }

        const vehicleData = this.vehicleRepository.create({
            ...createVehicle,
            company: company,
            user: user,
            plate: createVehicle.plate.toUpperCase(),
        });

        const vehicle = await this.vehicleRepository.save(vehicleData);


        return {
            message: 'Vehicle created successfully',
            result: vehicle,
            status: 201,
        };
    }






    async assignVehicleToUser(register: number, user_id: number) {
        const user = await this.userRepository.findOne({ where: { id: user_id, status: true } })
        if (!user) {
            throw new NotFoundException(`User With ID ${user_id}  not found`)
        }
        const vehicle = await this.vehicleRepository.findOne({ where: { status: true, register: register } })
        if (!vehicle) {
            throw new NotFoundException(`Vehicle With Register ${register}  not found`)
        }

        vehicle.user = user;

        await this.vehicleRepository.save(vehicle);
        return {
            message: `Vehicle ${register} successfully assigned to User ${user_id}`,
            result: vehicle,
        };
    }

}
