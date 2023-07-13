import React, { useRef } from 'react';
import { columnHeader } from './columnHeader';
import Form from './Form';
import initialQuery from './initialQuery';
import CMS from '@core/CMS';
import Filter from './Filter';
import ServiceService from '../../../api/service.service';

const searchType = [];

export default function Service() {
  const serviceService = useRef(new ServiceService());
  return (
    <CMS
      Form={Form}
      service={serviceService.current}
      header="서비스 관리"
      listProps={{
        attributes: columnHeader,
        initialQuery: initialQuery,
        searchType: searchType,
        RenderFilter: Filter,
        edit: false,
        create: false,
        delete: true,
      }}
    />
  );
}

export {
  Form as ServiceForm,
  columnHeader as ServiceColumnHeader,
  initialQuery as ServiceInitialQuery,
  searchType as ServiceSearchType,
};
