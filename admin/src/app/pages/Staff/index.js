import React, { useRef } from 'react';
import { columnHeader } from './columnHeader';
import { validate } from './validate';
import Form from './Form';
import initialQuery from './initialQuery';
import CMS from '@core/CMS';
import Filter from './Filter';
import StaffService from '../../../api/staff.service';

const searchType = [];

export default function Staff() {
  const administratorService = useRef(new StaffService());
  return (
    <CMS
      Form={Form}
      service={administratorService.current}
      validate={validate}
      header="관리자 계정 관리"
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
