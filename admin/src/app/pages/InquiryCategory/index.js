import React, { useRef } from 'react';
import { columnHeader } from './columnHeader';
import Form from './Form';
import { validate } from './validate';
import initialQuery from './initialQuery';
import CMS from '@core/CMS';

import InquiryCategoryService from '../../../api/inquiry-category.service';

const searchType = [];

export default function InquiryCategory() {
  const inquiryCategoryService = useRef(new InquiryCategoryService());
  return (
    <CMS
      Form={Form}
      service={inquiryCategoryService.current}
      validate={validate}
      header="문의분야"
      listProps={{
        attributes: columnHeader,
        initialQuery: initialQuery,
        searchType: searchType,
      }}
    />
  );
}

export {
  Form as InquiryCategoryForm,
  columnHeader as InquiryCategoryColumnHeader,
  validate as InquiryCategoryValidate,
  initialQuery as InquiryCategoryInitialQuery,
  searchType as InquiryCategorySearchType,
};
