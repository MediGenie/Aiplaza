import React, { useRef } from 'react';
import { columnHeader } from './columnHeader';
import Form from './Form';
import { validate } from './validate';
import initialQuery from './initialQuery';
import CMS from '@core/CMS';

import PromotionService from '../../../api/promotion.service';

const searchType = [];

export default function Promotion() {
  const promotionService = useRef(new PromotionService());
  return (
    <CMS
      Form={Form}
      service={promotionService.current}
      validate={validate}
      header="프로모션"
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
  Form as PromotionForm,
  columnHeader as PromotionColumnHeader,
  validate as PromotionValidate,
  initialQuery as PromotionInitialQuery,
  searchType as PromotionSearchType,
};
