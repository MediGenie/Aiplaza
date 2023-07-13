import React, { useRef } from 'react';
import { columnHeader } from './columnHeader';
import Form from './Form';
import { validate } from './validate';
import initialQuery from './initialQuery';
import CMS from '@core/CMS';

import PartnerShipService from '../../../api/partnership.service';

const searchType = [];

export default function Partnership() {
  const partnershipService = useRef(new PartnerShipService());
  return (
    <CMS
      Form={Form}
      service={partnershipService.current}
      validate={validate}
      header="파트너십"
      listProps={{
        attributes: columnHeader,
        initialQuery: initialQuery,
        searchType: searchType,
      }}
    />
  );
}

export {
  Form as PartnershipForm,
  columnHeader as PartnershipColumnHeader,
  validate as PartnershipValidate,
  initialQuery as PartnershipInitialQuery,
  searchType as PartnershipSearchType,
};
