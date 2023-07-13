import React, { useRef } from 'react';
import { columnHeader } from './columnHeader';
import Form from './Form';
import { validate } from './validate';
import initialQuery from './initialQuery';
import CMS from '@core/CMS';

import Filter from './Filter';
import BrochureDownloadService from '../../../api/brochure-download.service';

const searchType = [];

export default function BrochureDownload() {
  const brochureDownloadService = useRef(new BrochureDownloadService());
  return (
    <CMS
      Form={Form}
      service={brochureDownloadService.current}
      validate={validate}
      header="소개자료 다운로드"
      listProps={{
        attributes: columnHeader,
        initialQuery: initialQuery,
        searchType: searchType,
        RenderFilter: Filter,
        create: false,
        edit: false,
        deleteable: false,
      }}
    />
  );
}

export {
  Form as BrochureDownloadForm,
  columnHeader as BrochureDownloadColumnHeader,
  validate as BrochureDownloadValidate,
  initialQuery as BrochureDownloadInitialQuery,
  searchType as BrochureDownloadSearchType,
};
