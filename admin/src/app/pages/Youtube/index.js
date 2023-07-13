import React, { useRef } from 'react';
import { columnHeader } from './columnHeader';
import Form from './Form';
import { validate } from './validate';
import initialQuery from './initialQuery';
import CMS from '@core/CMS';

import YoutubeService from '../../../api/youtube.service';

const searchType = [];

export default function Staff() {
  const youtubeService = useRef(new YoutubeService());
  return (
    <CMS
      Form={Form}
      service={youtubeService.current}
      validate={validate}
      header="유튜브"
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
  Form as StaffForm,
  columnHeader as staffColumnHeader,
  validate as staffValidate,
  initialQuery as staffInitialQuery,
  searchType as staffSearchType,
};
