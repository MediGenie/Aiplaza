import React, { useRef } from 'react';
import { columnHeader } from './columnHeader';
import Form from './Form';
import { validate } from './validate';
import initialQuery from './initialQuery';
import CMS from '@core/CMS';

import Filter from './Filter';
import CustomerstoryDownloadService from '../../../api/customer-story-download.service';

const searchType = [];

export default function CustomerStoryDownload() {
  const customerStoryDownloadService = useRef(
    new CustomerstoryDownloadService()
  );
  return (
    <CMS
      Form={Form}
      service={customerStoryDownloadService.current}
      validate={validate}
      header="고객사례 다운로드"
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
  Form as CustomerStoryDownloadForm,
  columnHeader as CustomerStoryDownloadColumnHeader,
  validate as CustomerStoryDownloadValidate,
  initialQuery as CustomerStoryDownloadInitialQuery,
  searchType as CustomerStoryDownloadSearchType,
};
