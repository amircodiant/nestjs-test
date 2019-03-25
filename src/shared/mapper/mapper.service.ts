import 'automapper-ts/dist/automapper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MapperService {
    
    mapper: AutoMapperJs.AutoMapper;

    constructor(){
        this.mapper = automapper;
        this.intializeMapper();
    }

    private intializeMapper(){
        this.mapper.initialize(MapperService.configure);
    }

    private static configure(config :AutoMapperJs.IConfiguration): void {
        config
            .createMap('User','UserVm')
            .forSourceMember('_id', opts => opts.ignore())
            .forSourceMember('password', opts => opts.ignore()); 
    }
}