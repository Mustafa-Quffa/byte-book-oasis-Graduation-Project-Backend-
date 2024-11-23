import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
  Query,
} from '@nestjs/common';
import { ApiConsumes, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { existsSync, mkdirSync } from 'fs';

@ApiTags('upload')
@Controller('upload')
export class UploadController {
  @Post('image')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (req, file, callback) => {
          const isBook = req.query.isBook === '1'; // Check the 'isBook' query parameter
          const folder = isBook ? './public/books' : './public/users';

          // Ensure the folder exists, create if it doesn't
          if (!existsSync(folder)) {
            mkdirSync(folder, { recursive: true });
          }

          callback(null, folder); // Set the folder dynamically based on isBook
        },
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `${file.fieldname}-${uniqueSuffix}${ext}`;
          callback(null, filename);
        },
      }),
      fileFilter: (req, file, callback) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
          return callback(new BadRequestException('Only image files are allowed!'), false);
        }
        callback(null, true);
      },
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Image uploaded successfully!' })
  @ApiResponse({ status: 400, description: 'Only image files are allowed!' })
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @Query('isBook') isBook: string,
  ) {
    if (!file) {
      throw new BadRequestException('File is not provided');
    }

    if (isBook !== '0' && isBook !== '1') {
      throw new BadRequestException('Invalid isBook parameter');
    }

    // Set image URL based on 'isBook' value
    const imageUrl = isBook === '1'
      ? `/public/books/${file.filename}`
      : `/public/users/${file.filename}`;

    return {
      message: 'Image uploaded successfully!',
      imageUrl,
    };
  }
}
