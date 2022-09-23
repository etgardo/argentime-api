import { PartialType } from '@nestjs/mapped-types';
import { CreateSuscriberDto } from './create-suscriber.dto';

export class UpdateSuscriberDto extends PartialType(CreateSuscriberDto) {}
