import React, { useRef } from 'react';
import { columnHeader } from './columnHeader';
import Form from './Form';
import { validate } from './validate';
import initialQuery from './initialQuery';
import CMS from '@core/CMS';

import NewsService from '../../../api/news.service';

const searchType = [];

export default function News() {
  const newsService = useRef(new NewsService());
  return (
    <CMS
      Form={Form}
      service={newsService.current}
      validate={validate}
      header="보도자료"
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
  Form as NewsForm,
  columnHeader as NewsColumnHeader,
  validate as NewsValidate,
  initialQuery as NewsInitialQuery,
  searchType as NewsSearchType,
};
