import React, { useRef } from 'react';
import { columnHeader } from './columnHeader';
import Form from './Form';
import { validate } from './validate';
import initialQuery from './initialQuery';
import CMS from '@core/CMS';
import CustomerstoryService from '../../../api/customer-story.service';

const searchType = [];

export default function CustomerStory() {
  const customerStoryService = useRef(new CustomerstoryService());
  return (
    <CMS
      Form={Form}
      service={customerStoryService.current}
      validate={validate}
      header="고객사례"
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
  Form as CustomerStoryForm,
  columnHeader as CustomerStoryColumnHeader,
  validate as CustomerStoryValidate,
  initialQuery as CustomerStoryInitialQuery,
  searchType as CustomerStorySearchType,
};
