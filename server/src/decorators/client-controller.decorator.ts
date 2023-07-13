import { ControllerOptions, Controller } from '@nestjs/common';

export const ClientController = (path: string | string[]) => {
  const PREFIX = 'apis/c/';
  const opts: ControllerOptions = {};
  opts.path =
    typeof path === 'string'
      ? `${PREFIX}${path}`
      : path.map((v) => `${PREFIX}${v}`);
  return Controller(opts);
};
