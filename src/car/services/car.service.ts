import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Car } from "../entities/car.entity";
import { DeleteResult, ILike, Repository } from "typeorm";
import { InsuranceService } from "../../insurance/services/insurance.service";

@Injectable()
export class CarService {
    constructor(
        @InjectRepository(Car)
        private carRepository: Repository<Car>,
        private insuranceService: InsuranceService) { }


    async findAll(): Promise<Car[]> {
        return await this.carRepository.find({
            relations: {
                insurance: true
            }
        });
    }


    async findById(id: number): Promise<Car> {
        const car = await this.carRepository.findOne({
            where: {
                id
            },
            relations: {
                insurance: true
            }
        });

        if (!car)
            throw new HttpException('Carro não encontrado!', HttpStatus.NOT_FOUND);

        return car;
    }
    async findAllByNome(nome: string): Promise<Car[]> {
        return await this.carRepository.find({
            where: {
                name: ILike(`%${nome}%`)
            },
            relations: {
                insurance: true
            }
        });
    }
    async create(car: Car): Promise<Car> {

        if (!car.insurance)
             throw new HttpException('Seguro não informado', HttpStatus.NOT_FOUND);
            
        if (!car.insurance.id) 
            throw new HttpException('Seguro não encontrado!', HttpStatus.NOT_FOUND);

        await this.insuranceService.findById(car.insurance.id)

        return await this.carRepository.save(car);
    }
    async update(car: Car): Promise<Car> {

        if (!car.insurance) 
            throw new HttpException('Seguro não informado', HttpStatus.NOT_FOUND);

        if (!car.insurance.id) 
            throw new HttpException('Seguro não encontrado!', HttpStatus.NOT_FOUND);

        await this.findById(car.id)

        await this.insuranceService.findById(car.insurance.id)

        return await this.carRepository.save(car);
    }
    async delete(id: number): Promise<DeleteResult> {

        await this.findById(id)

        return await this.delete(id)
    }
}
