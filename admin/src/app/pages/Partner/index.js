import React, { useRef } from 'react';
import { columnHeader } from './columnHeader';
import Form from './Form';
import { validate } from './validate';
import initialQuery from './initialQuery';
import CMS from '@core/CMS';

import PartnerService from '../../../api/partner.service';

const searchType = [];

export default function Partner() {
  const partnerService = useRef(new PartnerService());
  return (
    <CMS
      Form={Form}
      service={partnerService.current}
      validate={validate}
      header="파트너사 로고"
      listProps={{
        attributes: columnHeader,
        initialQuery: initialQuery,
        searchType: searchType,
        enableOrderChange: true,
      }}
    />
  );
}

export {
  Form as PartnerForm,
  columnHeader as PartnerColumnHeader,
  validate as PartnerValidate,
  initialQuery as PartnerInitialQuery,
  searchType as PartnerSearchType,
};
