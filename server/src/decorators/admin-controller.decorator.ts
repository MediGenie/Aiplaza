import { ControllerOptions, Controller } from '@nestjs/common';

export const AdminController = (path: string | string[]) => {
  const PREFIX = 'apis/a/';
  const opts: ControllerOptions = {};
  opts.path =
    typeof path === 'string'
      ? `${PREFIX}${path}`
      : path.map((v) => `${PREFIX}${v}`);
  return Controller(opts);
};
