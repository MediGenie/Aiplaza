import React, { useRef } from 'react';
import { columnHeader } from './columnHeader';
import Form from './Form';
import { validate } from './validate';
import initialQuery from './initialQuery';
import CMS from '@core/CMS';

import Filter from './Filter';
import FaqService from '../../../api/faq.service';

const searchType = [];

export default function Staff() {
  const faqService = useRef(new FaqService());
  return (
    <CMS
      Form={Form}
      service={faqService.current}
      validate={validate}
      header="FAQ"
      listProps={{
        attributes: columnHeader,
        initialQuery: initialQuery,
        searchType: searchType,
        RenderFilter: Filter,
        detail: true,
        edit: true,
      }}
    />
  );
}

export {
  Form as StaffForm,
  columnHeader as staffColumnHeader,
  validate as staffValidate,
  initialQuery as staffInitialQuery,
  searchType as staffSearchType,
};
