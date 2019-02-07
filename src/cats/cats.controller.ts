import { Controller, Get, Post, Req, HttpCode, Header, Param, Body } from '@nestjs/common';
import  { CreateCatDto } from './create-cat.dto';


@Controller('cats')
export class CatsController {

	@Post()
	create(@Body() createCatDto: CreateCatDto){
		console.log(createCatDto)
		return 'This action adds a new cat';
	}

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
  	async findAll(@Req() request): Promise<any[]> {
	  	console.log(request.query);
	    return [];
  	}

  	/**
  	 * need to import RXJS first to use Observable
  	 */
  	/*@Get()	
  	async findAll(@Req() request): Observable<any[]> {
	  	console.log(request.query);
	    return of([]);
  	}*/

  	@Get('test*')
  	@HttpCode(201)
  	@Header('Cache-Control', 'none')	
  	test(@Req() request) {
	  	console.log(request.query);
	    return 'This action returns test';
  	}
}
