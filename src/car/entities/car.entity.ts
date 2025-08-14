import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Insurance } from "../../insurance/entities/insurance.entity";

@Entity({ name: "tb_car" })
export class Car {

    @PrimaryGeneratedColumn()
    id: number

    @IsNotEmpty()
    @Column({ length: 100, nullable: false })
    name: string

    @IsNotEmpty()
    @Column("decimal", { precision: 10, scale: 2 })
    price: number

    @IsNotEmpty()
    @Column({ length: 200, nullable: false })
    description: string

    @IsNotEmpty()
    @ApiProperty()
    @Column({ type: Date, nullable: false })
    manufacturingYear: Date

    @ManyToOne(() => Insurance, (insurance) => insurance.car, {
        onDelete: "CASCADE"
    })
    
    @JoinColumn({ name: "insurance_id" })
    insurance: Insurance
}

