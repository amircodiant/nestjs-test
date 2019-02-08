import { Controller, Get, Post, Req, HttpCode, Header, Param, Body, Res, HttpStatus } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';



@Controller('cats')
export class CatsController {
	constructor(private readonly catsService: CatsService){}
	

	@Post()
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
}
