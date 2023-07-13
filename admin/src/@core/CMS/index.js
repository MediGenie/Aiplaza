import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import List from './List';
import Create from './Create';
import Detail from './Detail';
import Edit from './Edit';
import BaseService from '../../api/base.service';
import { CoreContext } from './useCoreContext';

export default function Router({
  Form,
  validate,
  service,
  header,
  listProps,
  children,
}) {
  const apiName = useMemo(() => {
    return service.apiName;
  }, [service]);
  const ListProps = useMemo(() => {
    return Object.assign(
      {
        attributes: [],
        create: true,
        searchType: undefined,
        edit: true,
        detail: true,
        deleteable: true,
        disableManage: false,
        initialQuery: '',
        selectable: false,
        RenderFilter: undefined,
        RenderSelect: undefined,
        RenderManage: undefined,
        enableExportExcel: false,
        enableOrderChange: false,
        rowEvents: undefined,
        rowStyle: undefined,
        selectRow: undefined,
        subHeader: undefined,
        header,
        create_label: '등록',
      },
      listProps
    );
  }, [header, listProps]);

  return (
    <CoreContext.Provider value={service}>
      <Switch>
        <Route
          path={`/${apiName}`}
          render={() => <List {...ListProps} />}
          exact
        />
        {ListProps.create && (
          <Route
            path={`/${apiName}/create`}
            render={() => (
              <Create
                apiName={apiName}
                Form={Form}
                validate={validate.create}
                header={header}
              />
            )}
            exact
          />
        )}
        {ListProps.edit && (
          <Route
            path={`/${apiName}/:_id/edit`}
            render={() => (
              <Edit
                Form={Form}
                validate={validate.update}
                header={header}
                service={service}
              />
            )}
            exact
          />
        )}
        {ListProps.detail && (
          <Route
            path={`/${apiName}/:_id`}
            render={() => (
              <Detail
                Form={Form}
                edit={ListProps.edit}
                header={header}
                service={service}
              />
            )}
            exact
          />
        )}
        {children}
      </Switch>
    </CoreContext.Provider>
  );
}

// eslint-disable-next-line no-unused-vars
const { header, ...listProps } = List.propTypes;

Router.propTypes = {
  Form: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
  service: PropTypes.instanceOf(BaseService).isRequired,
  validate: PropTypes.shape({
    update: PropTypes.func,
    create: PropTypes.func,
  }),
  header: PropTypes.string,
  children: PropTypes.any,
  listProps: PropTypes.shape(listProps),
};
Router.defaultProps = {
  create: false,
  edit: false,
  detail: true,
  deleteable: true,
  validate: {
    update: () => ({ valid: true, message: '' }),
    create: () => ({ valid: true, message: '' }),
  },
  header: '',
  disableManage: false,
  selectable: false,
  csvDownloadAble: false,
  changeCurationAble: false,
  children: null,
};
