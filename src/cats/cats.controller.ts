import { Controller, Get, Post, Req, Header, Param, Body, Res } from '@nestjs/common';
import { UsePipes, UseFilters, HttpStatus, HttpException, HttpCode } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';

import { CreateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';
import { ForbiddenException } from './../forbidden.exception';
import { HttpExceptionFilter } from './../http-exception.filter';
import { JoiValidationPipe, ValidationPipe } from './../validation.pipe';
import { AuthGuard } from './../auth.guard';



@Controller('cats')
@UseFilters(HttpExceptionFilter)
export class CatsController {
	constructor(private readonly catsService: CatsService){}
	

	/*@Post()
	@UsePipes(new JoiValidationPipe(new CreateCatDto))
	async create(@Body() createCatDto: CreateCatDto){
		this.catsService.create(createCatDto);
	}*/

	@Post()
	@UsePipes(ValidationPipe)
	async create(@Body() createCatDto: CreateCatDto){
		this.catsService.create(createCatDto);
	}

	/*@Post()
	create(@Res() res){
		res.status(HttpStatus.CREATED).send();
	}*/

	/*@Get(':id')
	findOne(@Param() params) {
	  console.log(params.id);
	  return `This action returns a #${params.id} cat`;
	}*/

	/*@Get(':id')
	findOne(@Param('id') id) {
	  console.log(id);
	  return `This action returns a #${id} cat`;
	}*/

	/*@Get()	
  	findAll(@Req() request) {
	  	console.log(request.query);
	    return 'This action returns all cats';
  	}*/

  	@Get()
  	// @UseGuards(AuthGuard)	
  	async findAll(): Promise<Cat[]> {
	  	return this.catsService.findAll();
  	}

  	/*@Get()	
  	async findAll(@Res() res) {
	  	res.status(HttpStatus.OK).json([{"name":"amir"}]);
  	}*/

  	/**
  	 * need to import RXJS first to use Observable
  	 */
  	/*@Get()	
  	async findAll(@Req() request): Observable<any[]> {
	  	console.log(request.query);
	    return of([]);
  	}*/

  	/*@Get('test*')
  	@HttpCode(201)
  	@Header('Cache-Control', 'none')	
  	test(@Req() request) {
	  	console.log(request.query);
	    return 'This action returns test';
  	}*/

  	/*@Post('error-test')
	erroTest(@Res() res){
		// throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
		throw new ForbiddenException();
	}*/

	@Post('error-test')
	erroTest(@Res() res){
		throw new HttpException('this is custom exception message', HttpStatus.FORBIDDEN);
		// throw new ForbiddenException();
	}
}
