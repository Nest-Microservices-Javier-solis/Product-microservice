import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { environment } from './config/envs';


async function bootstrap() {
  console.log(environment.SERVER)
  const logger = new Logger()
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule,
    {
      transport: Transport.NATS,
      options: {
        servers: environment.SERVER,
      }
    }
  );




  await app.listen();

  logger.log(`Servidor Corriendo en el puerto ${3001}`)

}
bootstrap();
