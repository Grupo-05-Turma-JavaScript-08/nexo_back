import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

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
                            

}

