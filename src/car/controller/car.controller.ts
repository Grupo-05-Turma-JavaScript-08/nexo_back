import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { CarService } from "../services/car.service";
import { Car } from "../entities/car.entity";

@Controller('/carro')
export class carController {
    constructor(private readonly carService: CarService) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Car[]> {
        return this.carService.findAll();
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id', ParseIntPipe) id: number): Promise<Car> {
        return this.carService.findById(id);
    }
    @Get('/nome/:nome')
    @HttpCode(HttpStatus.OK)
    findByAllNome(@Param('nome')nome: string):Promise<Car[]>{
        return this.carService.findAllByNome(nome);
    }
    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() car: Car): Promise<Car> {
        return this.carService.create(car);
    }
    @Put()
    @HttpCode(HttpStatus.OK)
    update(@Body() car: Car): Promise<Car> {
        return this.carService.update(car);
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.carService.delete(id);
    }
}
