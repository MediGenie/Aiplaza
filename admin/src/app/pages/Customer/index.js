import React, { useRef } from 'react';
import { columnHeader } from './columnHeader';
import Form from './Form';
import { validate } from './validate';
import initialQuery from './initialQuery';
import CMS from '@core/CMS';
import Filter from './Filter';
import CustomerService from '../../../api/customer.service';

const searchType = [];

export default function Provider() {
  const customerService = useRef(new CustomerService());
  return (
    <CMS
      Form={Form}
      service={customerService.current}
      validate={validate}
      header="일반회원 관리"
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
  Form as CustomerForm,
  columnHeader as CustomerColumnHeader,
  validate as CustomerValidate,
  initialQuery as CustomerInitialQuery,
  searchType as CustomerSearchType,
};
