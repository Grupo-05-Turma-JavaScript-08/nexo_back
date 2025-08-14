import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Car } from "../entities/car.entity";
import { DeleteResult, ILike, Repository } from "typeorm";

@Injectable()
export class CarService {
    constructor(
        @InjectRepository(Car)
        private carRepository: Repository<Car>) { }


    async findAll(): Promise<Car[]> {
        return await this.carRepository.find();
    }


    async findById(id: number): Promise<Car> {
        const car = await this.carRepository.findOne({
            where: {
                id
            }
        });

        if (!car)
            throw new HttpException('Produto não encontrado!', HttpStatus.NOT_FOUND);

        return car;
    }


    async findAllByNome(nome: string): Promise<Car[]> {
        return await this.carRepository.find({
            where: {
                name: ILike(`%${nome}%`)
            }
        });
    }
    async create(car: Car): Promise<Car> {

        return await this.carRepository.save(car);
    }
    async update(car: Car): Promise<Car> {
        await this.findById(car.id)

        return await this.carRepository.save(car);
    }
    async delete(id: number): Promise<DeleteResult> {
        await this.findById(id)

        return await this.delete(id)
    }
}