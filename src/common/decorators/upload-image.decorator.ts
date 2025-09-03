import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from '../services/upload.service';

export function UploadImage(fieldName = 'file', destination = './uploads') {
   const uploadService = new UploadService();
   return applyDecorators(
      UseInterceptors(FileInterceptor(fieldName, uploadService.getMulterConfig(destination))),
   );
}