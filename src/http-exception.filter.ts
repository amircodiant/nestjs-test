import { HttpException, ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {

    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = exception.getStatus();
    const message = exception.getResponse();

    response
      .status(status)
      .json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        message: message,
        path: request.url
      });
  }
}