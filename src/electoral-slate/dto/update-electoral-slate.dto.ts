import { PartialType } from '@nestjs/mapped-types';

import { CreateElectoralSlateDto } from './create-electoral-slate.dto';

export class UpdateElectoralSlateDto extends PartialType(CreateElectoralSlateDto) {}
