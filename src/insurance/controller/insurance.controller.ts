import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { InsuranceService } from "../services/insurance.service";
import { Insurance } from "../entities/insurance.entity";
import { JwtAuthGuard } from "../../auth/guard/jwt-auth.guard";

@UseGuards(JwtAuthGuard)
@Controller('/plano')
export class InsuranceController {
     constructor(private readonly insuranceService: InsuranceService) { }
    
        @Get()
        @HttpCode(HttpStatus.OK)
        findAll(): Promise<Insurance[]> {
            return this.insuranceService.findAll();
        }
    
        @Get('/:id')
        @HttpCode(HttpStatus.OK)
        findById(@Param('id', ParseIntPipe) id: number): Promise<Insurance> {
            return this.insuranceService.findById(id);
        }
        @Get('/nome/:nome')
        @HttpCode(HttpStatus.OK)
        findByAllNome(@Param('nome')nome: string):Promise<Insurance[]>{
            return this.insuranceService.findAllByNome(nome);
        }
        @Post()
        @HttpCode(HttpStatus.CREATED)
        create(@Body() insurance: Insurance): Promise<Insurance>{
            return this.insuranceService.create(insurance);
        }
        @Put()
        @HttpCode(HttpStatus.OK)
        update(@Body()insurance: Insurance): Promise<Insurance> {
            return this.insuranceService.update(insurance);
        }
    
        @Delete('/:id')
        @HttpCode(HttpStatus.NO_CONTENT)
        delete(@Param('id', ParseIntPipe) id: number) {
            return this.insuranceService.delete(id);
        }
    
}