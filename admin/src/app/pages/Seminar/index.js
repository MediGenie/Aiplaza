import React, { useRef } from 'react';
import { columnHeader } from './columnHeader';
import Form from './Form';
import { validate } from './validate';
import initialQuery from './initialQuery';
import CMS from '@core/CMS';

import SeminarService from '../../../api/seminar.service';

const searchType = [];

export default function Seminar() {
  const seminarService = useRef(new SeminarService());
  return (
    <CMS
      Form={Form}
      service={seminarService.current}
      validate={validate}
      header="세미나&영상"
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
  Form as SeminarForm,
  columnHeader as SeminarColumnHeader,
  validate as SeminarValidate,
  initialQuery as SeminarInitialQuery,
  searchType as SeminarSearchType,
};
