import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { join } from 'path';

@Controller()
export class RenderController {
  private webPath: string;
  private adminPath: string;

  constructor() {
    this.webPath = join(__dirname, '../..', 'public/web/index.html');
    this.adminPath = join(__dirname, '../..', 'public/admin/index.html');
  }

  @Get(['/adm', '/adm/*'])
  renderAdminIndex(@Res() res: Response) {
    return res.sendFile(this.adminPath);
  }

  @Get(['/', '/*'])
  renderClientIndex(@Res() res: Response) {
    return res.sendFile(this.webPath);
  }
}
