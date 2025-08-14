import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Car } from "../entities/car.entity";
import { DeleteResult, ILike, Repository } from "typeorm";
import { InsuranceService } from "../../insurance/services/insurance.service";
import { Insurance } from "../../insurance/entities/insurance.entity";

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
        
        const insurance = await this.insuranceService.findById(car.insurance.id);
        
        car.premiumAmount = this.calculatePremiumValue(car, insurance);

        await this.insuranceService.findById(car.insurance.id);

        return await this.carRepository.save(car);
    }
    async update(car: Car): Promise<Car> {

        if (!car.insurance) 
            throw new HttpException('Seguro não informado', HttpStatus.NOT_FOUND);

        if (!car.insurance.id) 
            throw new HttpException('Seguro não encontrado!', HttpStatus.NOT_FOUND);

        const insurance = await this.insuranceService.findById(car.insurance.id);
        
        car.premiumAmount = this.calculatePremiumValue(car, insurance);

        await this.findById(car.id)

        await this.insuranceService.findById(car.insurance.id);

        return await this.carRepository.save(car);
    }
    async delete(id: number): Promise<DeleteResult> {

        await this.findById(id)

        return await this.delete(id)
    }

    private calculatePremiumValue(car: Car, insurance: Insurance): number {
        const today = new Date();
        const purchaseDate = new Date(car.manufacturingYear);

        const totalMonths = (today.getFullYear() - purchaseDate.getFullYear()) * 12 + (today.getMonth() - purchaseDate.getMonth());

        let insuranceValue = car.price;

        const porcentVaule = insurance.porcentInsurance;

        let premiumValue = (insuranceValue * porcentVaule) / 100

        if (totalMonths > 120) {
            premiumValue *= 0.8;
            car.insuranceStatus = 'Carro Antigo';
        } else {
            car.insuranceStatus = 'Carro Atual';
        }

        return premiumValue
    }
}
