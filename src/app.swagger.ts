import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import { appTexts, configVars } from '@_constants';

export const initSwagger = (app: INestApplication) => {
  const swaggerConfig = new DocumentBuilder()
    .setTitle(appTexts.API_TITLE)
    .addBearerAuth()
    .setDescription(appTexts.API_DESCRIPTION)
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup(configVars.API_DOCS_URI, app, document);
};
