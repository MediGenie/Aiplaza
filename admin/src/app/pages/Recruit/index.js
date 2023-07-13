import React, { useRef } from 'react';
import { columnHeader } from './columnHeader';
import Form from './Form';
import { validate } from './validate';
import initialQuery from './initialQuery';
import CMS from '@core/CMS';

import Filter from './Filter';
import RecruitService from '../../../api/recruit.service';

const searchType = [];

export default function Recruit() {
  const faqService = useRef(new RecruitService());
  return (
    <CMS
      Form={Form}
      service={faqService.current}
      validate={validate}
      header="인재채용"
      listProps={{
        attributes: columnHeader,
        initialQuery: initialQuery,
        searchType: searchType,
        RenderFilter: Filter,
      }}
    />
  );
}

export {
  Form as RecruitForm,
  columnHeader as RecruitColumnHeader,
  validate as RecruitValidate,
  initialQuery as RecruitInitialQuery,
  searchType as RecruitSearchType,
};
