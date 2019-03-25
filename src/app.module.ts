import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SharedModule } from './shared/shared.module';
import { ConfigurationService } from './shared/configuration/configuration.service';
import { Configuration } from './shared/configuration/configuration.enum';
import { from } from 'rxjs';
import { UserModule } from './user/user.module';


@Module({
  imports: [SharedModule,MongooseModule.forRoot(ConfigurationService.connectionString), UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  static host: string;
  static port: string | number;
  static isDev: boolean;

  constructor(private readonly _configurationService: ConfigurationService){
    AppModule.port = AppModule.normalizePort(_configurationService.get(Configuration.PORT));
    AppModule.host = _configurationService.get(Configuration.HOST);
    AppModule.isDev = _configurationService.isDevelopment

  }

  private static normalizePort(param: string | number): string | number{
    const portNumber: string | number = typeof param === 'string' ? parseInt(param, 10):param;
    if(isNaN(portNumber)) return param;
    else if(portNumber >= 0) return portNumber;
  }
}
