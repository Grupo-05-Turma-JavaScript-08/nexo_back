import { IsNotEmpty } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Car } from "../../car/entities/car.entity";

@Entity({ name: "tb_insurance" })
export class Insurance {

    @PrimaryGeneratedColumn()
    id: number

    @IsNotEmpty()
    @Column({ length: 100, nullable: false })
    description: string

    @IsNotEmpty()
    @Column({ length: 100, nullable: false })
    title: string

    @IsNotEmpty()
    @Column("decimal", { precision: 10, scale: 2 })
    premiumAmount: number

    @IsNotEmpty()
    @Column({ type: "boolean", nullable: false })
    insuranceStatus: boolean

    @OneToMany(() => Car, (car) => car.insurance)
    car: Car[]
}
