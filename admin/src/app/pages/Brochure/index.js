import React, { useRef } from 'react';
import { columnHeader } from './columnHeader';
import Form from './Form';
import { validate } from './validate';
import initialQuery from './initialQuery';
import CMS from '@core/CMS';

import BrochureService from '../../../api/brochure.service';

const searchType = [];

export default function Brochure() {
  const brochureService = useRef(new BrochureService());
  return (
    <CMS
      Form={Form}
      service={brochureService.current}
      validate={validate}
      header="소개자료"
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
  Form as BrochureForm,
  columnHeader as BrochureColumnHeader,
  validate as BrochureValidate,
  initialQuery as BrochureInitialQuery,
  searchType as BrochureSearchType,
};
