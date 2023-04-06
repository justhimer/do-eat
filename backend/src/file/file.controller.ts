import { Controller, Get, Param, StreamableFile } from '@nestjs/common';
import { FileService } from './file.service';
import { createReadStream } from 'fs';
import { join } from 'path';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('file') // to categorize in swagger
@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}


  @Get("/:section/:name")
  getFile(@Param('section') section: string, @Param('name') name: string ): StreamableFile {
    const file = createReadStream(join(__dirname, '../../../' , 'public' ,'images',`${section}`,`${name}`));
    return new StreamableFile(file);
  }
}
