import React, { useRef } from 'react';
import { columnHeader } from './columnHeader';
import Form from './Form';
import { validate } from './validate';
import initialQuery from './initialQuery';
import CMS from '@core/CMS';
import Filter from './Filter';
import BoardService from '../../../api/board.service';

const searchType = [];

export default function Board() {
  const boardService = useRef(new BoardService());
  return (
    <CMS
      Form={Form}
      service={boardService.current}
      validate={validate}
      header="공지사항 관리"
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
  Form as PartnerForm,
  columnHeader as BoardColumnHeader,
  validate as BoardValidate,
  initialQuery as BoardInitialQuery,
  searchType as BoardSearchType,
};
