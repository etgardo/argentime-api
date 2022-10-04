import { SetMetadata } from '@nestjs/common';

export const PublicRouteDec = () => SetMetadata('isPublic', true);
