import {
  DynamicModule,
  InjectionToken,
  Module,
  OptionalFactoryDependency,
} from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { IamportService } from './iamport.service';
import { IAMPORT_OPTIONS } from './constants';

interface Options {
  imp_key: string;
  imp_secret: string;
}
@Module({
  imports: [HttpModule],
  providers: [IamportService],
  exports: [IamportService],
})
export class IamportModule {
  static forRoot(opts: {
    imports?: any[];
    useFactory: (...args: any[]) => Options;
    inject: (InjectionToken | OptionalFactoryDependency)[];
  }): DynamicModule {
    return {
      module: IamportModule,
      imports: opts.imports,
      providers: [
        {
          provide: IAMPORT_OPTIONS,
          useFactory: opts.useFactory,
          inject: opts.inject,
        },
      ],
    };
  }
}
