import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, StreamableFile, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileService } from './file.service';
import { createReadStream } from 'fs';
import { join } from 'path';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { uploadToS3 } from 'utils/aws-s3-upload';

interface File {
  originalname: string;
  mimetype: string;
  buffer: Buffer;
}

interface Photo {
  filepath: string;  // filename.jpeg
  webviewPath?: string;  // base64 format
}

@ApiTags('file') // to categorize in swagger
@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) { }

  // receiving photo in base64
  @Post("/photo")
  async uploadPhoto(@Body('file') photo: Photo) {

    // prepare data
    const fileName = photo.filepath;
    const buffer = Buffer.from(photo.webviewPath, "base64");

    try {

      const accessPath = await uploadToS3({
        Bucket: 'doeat',
        Key: `${fileName}`,
        Body: buffer
      });

      console.log('upload S3 success');

      return {
        filenName: fileName,
        accessPath: accessPath
      }

    } catch (e) {
      throw new HttpException(`Server Error: ${e}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // receiving other files
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: File) {

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

  // temp use, to be deleted
  @Get("/:section/:name")
  getFile(@Param('section') section: string, @Param('name') name: string): StreamableFile {
    const file = createReadStream(join(__dirname, '../../../', 'public', 'images', `${section}`, `${name}`));
    return new StreamableFile(file);
  }

}
