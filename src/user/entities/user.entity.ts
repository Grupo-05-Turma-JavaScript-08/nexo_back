import { IsEmail, IsNotEmpty, MinLength } from "class-validator"
import { Admin, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Car } from "../../car/entities/car.entity"
import { ApiProperty } from "@nestjs/swagger"

@Entity({ name: "tb_user" })
export class User {

    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number

    @ApiProperty({ example: 'YOUR NAME' })
    @IsNotEmpty()
    @Column({ length: 255, nullable: false })
    name: string

    @ApiProperty({ example: 'email@email.com.br' })
    @IsEmail()
    @IsNotEmpty()
    @Column({ length: 255, nullable: false })
    username: string

    @ApiProperty({ example: "MinhaSenhaF0rte!" })
    @MinLength(8)
    @IsNotEmpty()
    @Column({ length: 255, nullable: false })
    password: string

    @ApiProperty({ example: ' -' })
    @Column({ length: 5000 })
    photoUrl: string

    @ApiProperty()
    @Column({ default: false }) 
    admin: boolean

    @ApiProperty()
    @OneToMany(() => Car, (car) => car.user)
    car: Car[]

}