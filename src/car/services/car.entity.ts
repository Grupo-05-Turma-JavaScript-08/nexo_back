import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Insurance } from "../../insurance/entities/insurance.entity";
import { User } from "../../user/entities/user.entity";

@Entity({ name: "tb_car" })
export class Car {

    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number

    @ApiProperty()
    @IsNotEmpty()
    @Column({ length: 100, nullable: false })
    model: string

    @ApiProperty()
    @IsNotEmpty()
    @Column({ length: 100, nullable: false })
    licensePlate: string

    @ApiProperty()
    @IsNotEmpty()
    @Column("decimal", { precision: 10, scale: 2 })
    price: number

    @ApiProperty()
    @IsNotEmpty()
    @Column({ length: 200, nullable: false })
    description: string

    @IsNotEmpty()
    @ApiProperty()
    @Column({ type: Date, nullable: false })
    manufacturingYear: Date

    @ApiProperty()
    @Column("decimal", { precision: 10, scale: 2 })
    premiumAmount: number

    @ApiProperty()
    @Column({ length: 100, nullable: false })
        insuranceStatus: string

    @ApiProperty({type: () => Insurance })
    @ManyToOne(() => Insurance, (insurance) => insurance.car, {
        onDelete: "CASCADE"
    })
    
    @JoinColumn({ name: "insurance_id" })
    insurance: Insurance

    @ApiProperty({type: () => User })
    @ManyToOne(() => User, (user) => user.car, {
        onDelete: "CASCADE"
    })

    @JoinColumn({ name: "user_id" })
    user: User
}

