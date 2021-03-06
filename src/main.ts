import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './shared/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const hostDomain = AppModule.isDev ? `${AppModule.host}:${AppModule.port}` : AppModule.host;
  const swaggerOption = new DocumentBuilder()
    .setTitle('Nest App')
    .setDescription('API Documentation')
    .setVersion('1.0')
    .setHost(hostDomain.split('//')[1])
    .setSchemes(AppModule.isDev ? 'http' : 'https')
    .setBasePath('/api')
    .addBearerAuth('Authorization','header')
    .build();

  const swaggerDoc = SwaggerModule.createDocument(app, swaggerOption);
  
  app.use('/swagger-docs/api', (req, res) =>{
      res.send(swaggerDoc);
  });
    
  SwaggerModule.setup('/swagger-docs', app, null,{
    swaggerUrl: `${hostDomain}/swagger-docs/api`,
    explorer: true,
    swaggerOptions: {
        docExpansion: 'list',
        filter: true,
        showRequestDuration: true, 
      }
  });
        
  app.setGlobalPrefix('api');
  app.useGlobalFilters(new HttpExceptionFilter())

  await app.listen(AppModule.port);
}
bootstrap();
