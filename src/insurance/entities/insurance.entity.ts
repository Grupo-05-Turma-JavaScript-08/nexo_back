import { IsNotEmpty } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Car } from "../../car/entities/car.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity({ name: "tb_insurance" })
export class Insurance {

    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number

    @ApiProperty()
    @IsNotEmpty()
    @Column({ length: 100, nullable: false })
    description: string

    @ApiProperty()
    @IsNotEmpty()
    @Column({ length: 100, nullable: false })
    title: string

    @ApiProperty()
    @IsNotEmpty()
    @Column()
    porcentInsurance: number

    @ApiProperty()
    @OneToMany(() => Car, (car) => car.insurance)
    car: Car[]
}
