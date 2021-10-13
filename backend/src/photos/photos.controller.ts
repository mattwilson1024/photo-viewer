import { Controller, Get, Query, Res, Response } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createReadStream, promises as fspromises } from 'fs';
import { resolve } from 'path';
import * as sharp from 'sharp';

const { readFile, readdir } = fspromises;

@Controller('photos')
export class PhotosController {
  constructor(private configSerivce: ConfigService) {}

  @Get()
  async findAll(): Promise<string[]> {
    const photosRootDir = this.configSerivce.get<string>(`PHOTOS_ROOT_DIR`);
    const files = await (await this.getAllFilesRecursively(photosRootDir));
    const validFiles = files.filter(path => !path.endsWith(`.DS_Store`));
    return validFiles;
  }


  @Get('thumbnail')
  async thumbnail(@Query(`path`) path: string, @Res() res: Response) {
    if (!path.toLowerCase().endsWith(`.jpg`)) { throw new Error('JPGs only, sorry')}

    const img = await sharp(path)
      .resize(200, 200);
    img.pipe(res as any);
  }

  @Get('original')
  async phooriginalto(@Query(`path`) path: string, @Res() res: Response) {
    const file = createReadStream(path);
    file.pipe(res as any);  
  }

  private async getAllFilesRecursively(dir: string): Promise<string[]> {
    const directoryEntries = await readdir(dir, { withFileTypes: true });
    const files = await Promise.all(directoryEntries.map(directoryEntry => {
      const res = resolve(dir, directoryEntry.name);
      return directoryEntry.isDirectory() ? this.getAllFilesRecursively(res) : [res];
    }));
    return Array.prototype.concat(...files);
  }
}
