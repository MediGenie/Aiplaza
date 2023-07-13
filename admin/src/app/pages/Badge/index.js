import React, { useRef } from 'react';
import { columnHeader } from './columnHeader';
import Form from './Form';
import { validate } from './validate';
import initialQuery from './initialQuery';
import CMS from '@core/CMS';

import BadgeService from '../../../api/badge.service';

const searchType = [];

export default function Badge() {
  const badgeService = useRef(new BadgeService());
  return (
    <CMS
      Form={Form}
      service={badgeService.current}
      validate={validate}
      header="AWS 배지"
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
  Form as BadgeForm,
  columnHeader as BadgeColumnHeader,
  validate as BadgeValidate,
  initialQuery as BadgeInitialQuery,
  searchType as BadgeSearchType,
};
