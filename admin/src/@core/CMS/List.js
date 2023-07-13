import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Container } from '@core/components';
import { useHistory, useLocation } from 'react-router-dom';
import TableModule from './Tables/TableModule';
import { HeaderMain } from '@core/routes/components/HeaderMain';
import { useCoreContext } from './useCoreContext';

function List({
  attributes,
  header,
  subHeader,
  create,
  searchType,
  edit,
  detail,
  deleteable,
  disableManage,
  initialQuery,
  selectable,
  RenderFilter,
  RenderSelect,
  RenderManage,
  enableExportExcel,
  enableOrderChange,
  rowEvents,
  rowStyle,
  selectRow,
  isEmptyQuery,
  create_label = '등록',
}) {
  const history = useHistory();
  const location = useLocation();
  const context = useCoreContext();

  useEffect(() => {
    if (!location.search && initialQuery) {
      history.replace(`/${context.apiName}?${initialQuery}`);
    }
  }, [location, history, initialQuery, context.apiName]);

  return (
    <>
      <Container className="list-container">
        <HeaderMain
          title={`${header} 목록`}
          subTitle={subHeader}
          className="mb-4 mt-2"
        />
        <TableModule
          attributes={attributes}
          create={create}
          searchType={searchType}
          edit={edit}
          detail={detail}
          disableManage={disableManage}
          initialQuery={initialQuery}
          deleteable={deleteable}
          selectable={selectable}
          RenderFilter={RenderFilter}
          RenderSelect={RenderSelect}
          RenderManage={RenderManage}
          enableExportExcel={enableExportExcel}
          enableOrderChange={enableOrderChange}
          rowEvents={rowEvents}
          rowStyle={rowStyle}
          selectRow={selectRow}
          isEmptyQuery={isEmptyQuery}
          create_label={create_label}
        />
      </Container>
    </>
  );
}

List.propTypes = {
  ...TableModule.propTypes,
  header: PropTypes.string.isRequired,
  subTitle: PropTypes.string,
};
List.defaultProps = {
  subTitle: undefined,
};

export default List;
