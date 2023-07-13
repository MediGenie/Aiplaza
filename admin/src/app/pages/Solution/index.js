import React, { useRef } from 'react';
import { columnHeader } from './columnHeader';
import Form from './Form';
import { validate } from './validate';
import initialQuery from './initialQuery';
import CMS from '@core/CMS';

import SolutionService from '../../../api/solution.service';

const searchType = [];

export default function Solution() {
  const partnershipService = useRef(new SolutionService());
  return (
    <CMS
      Form={Form}
      service={partnershipService.current}
      validate={validate}
      header="솔루션"
      listProps={{
        attributes: columnHeader,
        initialQuery: initialQuery,
        searchType: searchType,
      }}
    />
  );
}

export {
  Form as Solution,
  columnHeader as PartnerColumnHeader,
  validate as PartnerValidate,
  initialQuery as PartnerInitialQuery,
  searchType as PartnerSearchType,
};
