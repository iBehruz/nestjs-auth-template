import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AuthModule } from './authentication/auth.module';
import { UsersModule } from './users/users.module';
import { VersioningType } from '@nestjs/common';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableVersioning({
    type: VersioningType.URI,
  });
  

  const authDoc = new DocumentBuilder().setTitle('User Authentication ')
                      .setDescription("Basic user authentication app.")
                      .setVersion('v1').addBearerAuth()
                      .build();

  const document = SwaggerModule.createDocument(app, authDoc);

  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();


