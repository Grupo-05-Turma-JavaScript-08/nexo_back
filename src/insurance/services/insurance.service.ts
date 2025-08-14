import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from "typeorm";
import { Insurance } from "../entities/insurance.entity";

@Injectable()
export class InsuranceService {
    constructor(
        @InjectRepository(Insurance)
        private insuranceRepository: Repository<Insurance>) { }


    async findAll(): Promise<Insurance[]> {
        return await this.insuranceRepository.find({
            relations: {
                car: true
            }
        });
    }


    async findById(id: number): Promise<Insurance> {
        const insurance = await this.insuranceRepository.findOne({
            where: {
                id
            },
            relations: {
                car: true
            }
        });

        if (!insurance)
            throw new HttpException('Produto não encontrado!', HttpStatus.NOT_FOUND);

        return insurance;
    }


    async findAllByNome(nome: string): Promise<Insurance[]> {
        return await this.insuranceRepository.find({
            where: {
                title: ILike(`%${nome}%`)
            },
            relations: {
                car: true
            }
        });
    }
    async create(insurance: Insurance): Promise<Insurance> {

        return await this.insuranceRepository.save(insurance);
    }
    async update(insurance: Insurance): Promise<Insurance> {
        await this.findById(insurance.id)

        return await this.insuranceRepository.save(insurance);
    }
    async delete(id: number): Promise<DeleteResult> {
        await this.findById(id)

        return await this.delete(id)
    }
}