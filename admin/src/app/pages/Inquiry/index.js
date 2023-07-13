import React, { useRef } from 'react';
import { columnHeader } from './columnHeader';
import Form from './Form';
import { validate } from './validate';
import initialQuery from './initialQuery';
import CMS from '@core/CMS';

import Filter from './Filter';
import InquiryService from '../../../api/inquiry.service';

const searchType = [];

export default function Inquiry() {
  const inquiryService = useRef(new InquiryService());
  return (
    <CMS
      Form={Form}
      service={inquiryService.current}
      validate={validate}
      header="문의"
      listProps={{
        attributes: columnHeader,
        initialQuery: initialQuery,
        searchType: searchType,
        RenderFilter: Filter,
        create: false,
        edit: false,
      }}
    />
  );
}

export {
  Form as InquiryForm,
  columnHeader as InquiryColumnHeader,
  validate as InquiryValidate,
  initialQuery as InquiryInitialQuery,
  searchType as InquirySearchType,
};
