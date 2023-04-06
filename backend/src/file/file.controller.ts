import { Controller, Get, HttpException, HttpStatus, Param, Post, StreamableFile, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileService } from './file.service';
import { createReadStream } from 'fs';
import { join } from 'path';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { uploadToS3 } from 'utils/aws-s3-upload';

@ApiTags('file') // to categorize in swagger
@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}


  @Get("/:section/:name")
  getFile(@Param('section') section: string, @Param('name') name: string ): StreamableFile {
    const file = createReadStream(join(__dirname, '../../../' , 'public' ,'images',`${section}`,`${name}`));
    return new StreamableFile(file);
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file) {

    // change filename
    let fieldName = file.originalname?.split(".")[0].substring(0, file.originalname.length - 1);
    let timestamp = Date.now();
    let ext = file.mimetype?.split("/").pop();
    const fileName = `${fieldName}-${timestamp}.${ext}`;

    try {

      const accessPath = await uploadToS3({
        Bucket: 'doeat',
        Key: `${fileName}`,
        // ContentType: `${file.mimetype}`,
        Body: file.buffer
      });

      return { 
        filenName: fileName,
        accessPath: accessPath
      }

    } catch (e) {
      throw new HttpException(`Server Error: ${e}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


}
