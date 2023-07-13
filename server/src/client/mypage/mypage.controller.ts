import { FileInterceptor } from '@nestjs/platform-express';
import {
  Body,
  Get,
  Patch,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  AccountDocument,
  AccountType,
} from 'src/database/schema/account.schema';
import { ClientController } from 'src/decorators/client-controller.decorator';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { ClientJwtGuard } from '../guards/client-jwt.guard';
import { PatchMyInfoDto } from './dto/patch-myInfo-dto';
import { PatchPasswordDto } from './dto/patch-password-dto';
import { MypageService } from './mypage.service';
import { memoryStorage } from 'multer';
import { PatchServiceInfoDto } from './dto/patch-service-info-dto';
import { AccessableUserType } from 'src/decorators/accessable-user-type.decorator';
import { UserTypeGuard } from '../guards/user-type.guard';
import { GetPaymentListDto } from './dto/get-payment-list-dto';
import { PatchReviewDto } from './dto/patch-review-dto';
import { PatchOrderCancel } from './dto/patch-order-cancel.dto';
import { PatchProviderServiceInfoDto } from './dto/patch-provider-service-info-dto';
import { GetServiceListDto } from './dto/get-service-list-dto';

@ClientController('mypage')
export class MypageController {
  constructor(private readonly mypageService: MypageService) {}

  @Get()
  @UseGuards(ClientJwtGuard)
  async getMyInfo(@CurrentUser() user: AccountDocument) {
    return this.mypageService.getMyInfo(user._id.toString());
  }

  @Patch('change-password')
  @UseGuards(ClientJwtGuard)
  changePassword(
    @CurrentUser() user: AccountDocument,
    @Body() body: PatchPasswordDto,
  ) {
    return this.mypageService.changePassword(user._id.toString(), body);
  }

  @Get('get-service-info')
  @UseGuards(ClientJwtGuard)
  async getServiceInfo(@CurrentUser() user: AccountDocument) {
    return this.mypageService.getServiceInfo(user._id.toString());
  }

  @Patch('change-service-info')
  @UseGuards(ClientJwtGuard)
  @UseInterceptors(
    FileInterceptor('biz_regist_cert_file', {
      storage: memoryStorage(),
    }),
  )
  patchServiceInfo(
    @CurrentUser() user: AccountDocument,
    @Body() body: PatchServiceInfoDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.mypageService.patchServiceInfo(user._id.toString(), body, file);
  }

  @Patch()
  @UseGuards(ClientJwtGuard)
  patchMyInfo(
    @CurrentUser() user: AccountDocument,
    @Body() body: PatchMyInfoDto,
  ) {
    return this.mypageService.patchMyInfo(user._id.toString(), body);
  }

  @Get('payment')
  @AccessableUserType(AccountType.CONSUMER)
  @UseGuards(ClientJwtGuard, UserTypeGuard)
  getPaymentList(
    @CurrentUser() user: AccountDocument,
    @Query() data: GetPaymentListDto,
  ) {
    return this.mypageService.getPaymentList(
      user._id.toString(),
      data.page,
      data.order,
    );
  }

  @Patch('order-cancel')
  @AccessableUserType(AccountType.CONSUMER)
  @UseGuards(ClientJwtGuard, UserTypeGuard)
  orderCancel(@Body() data: PatchOrderCancel) {
    return this.mypageService.orderCancel(data.id, data.refundReason);
  }

  @Patch('review')
  @AccessableUserType(AccountType.CONSUMER)
  @UseGuards(ClientJwtGuard, UserTypeGuard)
  patchReview(@Body() body: PatchReviewDto) {
    return this.mypageService.patchReview(
      body.paymentId,
      body.ratingValue,
      body.review,
    );
  }

  @Get('get-provider-service-info')
  @UseGuards(ClientJwtGuard)
  async getProviderServiceInfo(@CurrentUser() user: AccountDocument) {
    return this.mypageService.getProviderServiceInfo(user._id.toString());
  }

  @Patch('change-provider-service-info')
  @UseGuards(ClientJwtGuard)
  patchProviderServiceInfo(
    @CurrentUser() user: AccountDocument,
    @Body() body: PatchProviderServiceInfoDto,
  ) {
    return this.mypageService.patchProviderServiceInfo(
      user._id.toString(),
      body,
    );
  }

  @Get('service')
  @AccessableUserType(AccountType.PROVIDER)
  @UseGuards(ClientJwtGuard, UserTypeGuard)
  getServiceList(
    @CurrentUser() user: AccountDocument,
    @Query() data: GetServiceListDto,
  ) {
    return this.mypageService.getServiceList(user._id.toString(), data.page);
  }

  @Get('withdraw')
  @AccessableUserType(AccountType.PROVIDER)
  @UseGuards(ClientJwtGuard, UserTypeGuard)
  getWithDrawList(
    @CurrentUser() user: AccountDocument,
    @Query() data: GetServiceListDto,
  ) {
    return this.mypageService.getWithDrawList(user._id.toString(), data.page);
  }
}
