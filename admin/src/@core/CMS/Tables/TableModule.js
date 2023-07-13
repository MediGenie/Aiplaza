/* eslint-disable react/display-name */
import React, { useEffect, useCallback, useMemo } from 'react';

import { useHistory, useLocation } from 'react-router-dom';
import { stringify, parse } from 'query-string';
import BootstrapTable from 'react-bootstrap-table-next';
import PropTypes from 'prop-types';
import { Container } from '@core/components';
import Pagination from './Pagination';
import DefaultModal from '@core/components/Modals';
import { useTableCheckBox, useTableFetch } from './hooks/useTableModule';
import SearchModule from './SearchModule';
import { useCoreContext } from '../useCoreContext';
import Manage from './components/Manage';
import EmptyScreen from './components/EmptyScreen';
import TableFooter from './components/TableFooter';
import TableSortCaret from './components/TableSortCaret';
import OrderChangeButton from './components/OrderChangeButton';
import TableLoading from './components/TableLoading';

function TableModule({
  attributes,
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
  create_label,
}) {
  const history = useHistory();
  const location = useLocation();
  const service = useCoreContext();
  const dataType = service.apiName;

  const {
    loading,
    data,
    loadData,
    totalPage,
    defaultModalInfo,
    setDefaultModalInfo,
    current,
    orderChangeHandler,
  } = useTableFetch(service, isEmptyQuery);

  const { tableSelectProps, selectClear } = useTableCheckBox(selectable);

  const ManageFormatter = useCallback(
    (_, row) => {
      return (
        <Manage
          reload={loadData}
          deletable={deleteable}
          detail={detail}
          edit={edit}
          disabled={disableManage}
          row={row}
        />
      );
    },
    [loadData, deleteable, detail, edit, disableManage]
  );

  const columns = useMemo(() => {
    if (attributes) {
      const modifiedAttributes = attributes.map((item) => {
        return {
          ...item,
          sortCaret: (order) => <TableSortCaret order={order} />,
        };
      });
      if (!disableManage) {
        modifiedAttributes.push({
          dataField: 'actions',
          text: '관리',
          align: 'center',
          headerAlign: 'center',
          events: {
            onClick: (e) => {
              e.stopPropagation();
            },
          },
          formatter: RenderManage
            ? (_, cell) => (
                <RenderManage
                  cell={cell}
                  refresh={loadData}
                  service={service}
                />
              )
            : ManageFormatter,
        });
      }
      if (enableOrderChange) {
        modifiedAttributes.push({
          dataField: 'order',
          text: '순서 변경',
          align: 'center',
          headerAlign: 'center',
          events: {
            onClick: (e) => {
              e.stopPropagation();
            },
          },
          formatter: (_, row, index) => {
            const key = [];

            if (!(current === 1 && index === 0))
              key.push(
                <OrderChangeButton
                  id={row._id}
                  to="prev"
                  onClick={orderChangeHandler}
                />
              );
            if (!(current === totalPage && index === (data?.length || 0) - 1))
              key.push(
                <OrderChangeButton
                  id={row._id}
                  to="next"
                  onClick={orderChangeHandler}
                />
              );
            return <>{key}</>;
          },
        });
      }
      return modifiedAttributes;
    }

    return [];
  }, [
    attributes,
    disableManage,
    enableOrderChange,
    RenderManage,
    ManageFormatter,
    loadData,
    service,
    current,
    orderChangeHandler,
    totalPage,
    data?.length,
  ]);

  const onTableChange = useCallback(
    async (_, { sortField, sortOrder }) => {
      const query = parse(location.search);
      query.sort = [sortField, sortOrder];
      const nextQuery = `/${dataType}?${stringify(query)}`;
      history.push(nextQuery);
    },
    [dataType, history, location.search]
  );

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <Container style={{ maxWidth: '90%' }}>
      {RenderFilter ? (
        <RenderFilter
          setDefaultModalInfo={setDefaultModalInfo}
          dataType={dataType}
          initialQuery={initialQuery}
        />
      ) : (
        <SearchModule
          searchType={searchType}
          setDefaultModalInfo={setDefaultModalInfo}
          dataType={dataType}
          initialQuery={initialQuery}
        />
      )}
      {selectable && RenderSelect && (
        <RenderSelect
          selects={tableSelectProps?.selectRow?.selected || []}
          loading={loading}
          refresh={loadData}
          service={service}
          selectClear={selectClear}
        />
      )}
      <DefaultModal
        bodyMessage={defaultModalInfo.bodyMessage}
        headerMessage={defaultModalInfo.headerMessage}
        isOpen={defaultModalInfo.visible}
        closeFunc={() => {
          setDefaultModalInfo({
            visible: false,
            headerMessage: '',
            bodyMessage: '',
            onCloseFunc: undefined,
          });
        }}
        onCloseEvent={defaultModalInfo.onCloseFunc}
        ButtonMessage="닫기"
      />
      <div style={{ position: 'relative' }}>
        <TableLoading isLoading={loading} />
        {loading === false && (data?.length || 0) === 0 ? (
          <EmptyScreen create={create} />
        ) : (
          <div className="table-responsive-xl">
            <BootstrapTable
              keyField="_id"
              classes="custom-table"
              data={data}
              columns={columns}
              remote={{ sort: true }}
              onTableChange={onTableChange}
              defaultSortDirection="asc"
              rowClasses="custom-tr"
              hover
              id="data-table"
              rowEvents={rowEvents}
              rowStyle={rowStyle}
              selectRow={selectRow}
              {...tableSelectProps}
            />
          </div>
        )}
      </div>
      {(data?.length || 0) > 0 && (
        <>
          <Pagination totalPages={totalPage} apiName={dataType} />
          <TableFooter
            create={create}
            selectable={selectable}
            selected={tableSelectProps?.selectRow?.selected || []}
            refresh={loadData}
            excelExport={enableExportExcel}
            create_label={create_label}
          />
        </>
      )}
    </Container>
  );
}
TableModule.propTypes = {
  attributes: PropTypes.arrayOf(
    PropTypes.shape({
      dataField: PropTypes.string,
      text: PropTypes.string,
      headerAlign: PropTypes.string,
      sort: PropTypes.bool,
      formatter: PropTypes.func,
    })
  ).isRequired,
  create: PropTypes.bool,
  searchType: PropTypes.arrayOf(
    PropTypes.shape({
      dataType: PropTypes.string,
      text: PropTypes.string,
      dropdown: PropTypes.bool,
      dropList: PropTypes.arrayOf(
        PropTypes.shape({
          text: PropTypes.string,
          value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
        })
      ),
    })
  ),
  edit: PropTypes.bool,
  detail: PropTypes.bool,
  deleteable: PropTypes.bool,
  disableManage: PropTypes.bool,
  initialQuery: PropTypes.string,
  selectable: PropTypes.bool,
  RenderFilter: PropTypes.any,
  RenderSelect: PropTypes.any,
  RenderManage: PropTypes.any,
  enableExportExcel: PropTypes.bool,
  enableOrderChange: PropTypes.bool,
  rowEvents: PropTypes.any,
  rowStyle: PropTypes.any,
  selectRow: PropTypes.any,
  isEmptyQuery: PropTypes.bool,
  create_label: PropTypes.string,
};
TableModule.defaultProps = {
  create: false,
  edit: false,
  detail: true,
  deleteable: true,
  disableManage: false,
  searchType: [],
  rowEvents: undefined,
  rowStyle: undefined,
  selectRow: undefined,
  isEmptyQuery: false,
  selectable: false,
  enableExportExcel: false,
  enableOrderChange: false,
  create_label: '등록',
};

export default TableModule;
