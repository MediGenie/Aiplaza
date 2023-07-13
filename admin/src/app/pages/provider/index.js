import React, { useRef } from 'react';
import { columnHeader } from './columnHeader';
import Form from './Form';
import { validate } from './validate';
import initialQuery from './initialQuery';
import CMS from '@core/CMS';
import Filter from './Filter';
import ProviderService from '../../../api/provider.service';

const searchType = [];

export default function Provider() {
  const providerService = useRef(new ProviderService());
  return (
    <CMS
      Form={Form}
      service={providerService.current}
      validate={validate}
      header="서비스 제공자 관리"
      listProps={{
        attributes: columnHeader,
        initialQuery: initialQuery,
        searchType: searchType,
        RenderFilter: Filter,
        edit: true,
        create: false,
      }}
    />
  );
}

export {
  Form as ProviderForm,
  columnHeader as ProviderColumnHeader,
  validate as ProviderValidate,
  initialQuery as ProviderInitialQuery,
  searchType as ProviderSearchType,
};
