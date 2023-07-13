import React, { useRef } from 'react';
import { columnHeader } from './columnHeader';
import Form from './Form';
import { validate } from './validate';
import initialQuery from './initialQuery';
import CMS from '@core/CMS';

import BannerService from '../../../api/banner.service';

const searchType = [];

export default function MainBanner() {
  const mainBannerService = useRef(new BannerService());
  return (
    <CMS
      Form={Form}
      service={mainBannerService.current}
      validate={validate}
      header="배너"
      listProps={{
        attributes: columnHeader,
        initialQuery: initialQuery,
        searchType: searchType,
        create: false,
        deleteable: false,
      }}
    />
  );
}

export {
  Form as MainBannerForm,
  columnHeader as MainBannerColumnHeader,
  validate as MainBannerValidate,
  initialQuery as MainBannerInitialQuery,
  searchType as MainBannerSearchType,
};
