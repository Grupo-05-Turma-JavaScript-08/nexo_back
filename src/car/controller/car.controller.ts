import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { CarService } from "../services/car.service";
import { Car } from "../entities/car.entity";
import { JwtAuthGuard } from "../../auth/guard/jwt-auth.guard";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@UseGuards(JwtAuthGuard)
@ApiTags('car')
@ApiBearerAuth()
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

    @Get('/placa_do_carro/:placa')
    @HttpCode(HttpStatus.OK)
    findBylicensePlate(@Param('placa') licensePlate: string): Promise<Car> {
        return this.carService.findBylicensePlate(licensePlate);
    }

    @Get('/modelo/:modelo')
    @HttpCode(HttpStatus.OK)
    findByAllModel(@Param('modelo')model: string):Promise<Car[]>{
        return this.carService.findAllByModel(model);
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
