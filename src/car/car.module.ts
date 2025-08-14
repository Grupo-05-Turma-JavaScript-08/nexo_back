import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Car } from "./entities/car.entity";
import { CarService } from "./services/car.service";
import { carController } from "./controller/car.controller";
import { InsuranceModule } from "../insurance/insurance.module";

@Module({
imports: [TypeOrmModule.forFeature([Car]), InsuranceModule],
providers: [ CarService ],
controllers: [ carController ],
exports: [ ],
})
export class CarModule {}