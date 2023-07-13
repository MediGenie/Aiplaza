/* eslint-disable react-hooks/rules-of-hooks */
import qs from 'querystring';
import { useCallback, useMemo, useReducer, useState } from 'react';
import { useLocation } from 'react-router';
import { useAuthContext } from '@core/store/hooks/useAuthContext';

function pageReducer(state, action) {
  switch (action.type) {
    case 'SET_DATA': {
      return {
        totalPage: action.payload.totalPage,
        data: action.payload.data,
      };
    }
    case 'ERROR': {
      return {
        totalPage: -1,
        data: [],
      };
    }
    default:
      return state;
  }
}

export function useTableFetch(service, isEmptyQuery = false) {
  const location = useLocation();
  const page = useMemo(() => {
    const query = qs.parse(
      location.search ? location.search.replace('?', '') : '{}'
    );
    return parseInt(query.page);
  }, [location.search]);
  const [{ data, totalPage }, pageDispatch] = useReducer(pageReducer, {
    totalPage: 0,
    data: [],
  });

  const [loading, setLoading] = useState(false);
  const [defaultModalInfo, setDefaultModalInfo] = useState({
    visible: false,
    headerMessage: '',
    bodyMessage: '',
    onCloseFunc: undefined,
  });

  const [authState] = useAuthContext();

  const loadData = useCallback(
    (force) => {
      if (authState.isLogin) {
        if (
          (loading || (isEmptyQuery === false && location.search === '')) &&
          !force
        ) {
          return;
        }
        setLoading(true);
        service
          .getMany(location.search)
          .then(({ data, totalPages }) => {
            pageDispatch({
              type: 'SET_DATA',
              payload: { totalPage: totalPages, data: data },
            });
            setLoading(false);
          })
          .catch((e) => {
            console.debug('error', e);
            pageDispatch({ type: 'ERROR' });
            setLoading(false);
          });
      }
    },
    [authState.isLogin, loading, location.search, service, isEmptyQuery]
  );
  const orderChangeHandler = useCallback(
    (id, to) => {
      setLoading(true);
      service
        .changeOrder(id, to)
        .then(() => {
          setLoading(false);
        })
        .catch(() => {})
        .finally(() => {
          loadData(true);
        });
    },
    [service, loadData]
  );

  return {
    data,
    totalPage,
    defaultModalInfo,
    setDefaultModalInfo,
    loadData,
    loading,
    current: page,
    orderChangeHandler,
  };
}

export function useTableCheckBox(selectable) {
  if (!selectable) {
    return { tableSelectProps: {} };
  }
  const [check, setCheck] = useState([]);
  const onSelect = useCallback(
    (row, isCheck) => {
      let temp = check.concat();
      if (isCheck) {
        temp.push(row._id);
        temp = temp.filter((v, i) => temp.indexOf(v) === i);
        setCheck(temp);
      } else {
        const index = temp.indexOf(row._id);
        temp.splice(index, 1);
        setCheck(temp);
      }
    },
    [check]
  );
  const onSelectAll = useCallback(
    (isCheck, rows) => {
      let temp = check.concat();
      if (isCheck) {
        rows.forEach((v) => {
          temp.push(v._id);
        });
        temp = temp.filter((v, i) => temp.indexOf(v) === i);
        setCheck(temp);
      } else {
        rows.forEach((v) => {
          const index = temp.indexOf(v._id);
          temp.splice(index, 1);
        });
        setCheck(temp);
      }
    },
    [check]
  );

  const selectClear = useCallback(() => {
    setCheck([]);
  }, []);

  return {
    tableSelectProps: {
      selectRow: {
        mode: 'checkbox',
        clickToSelect: true,
        onSelect,
        onSelectAll,
        selected: check,
        headerColumnStyle: {
          textAlign: 'center',
        },
        selectColumnStyle: { textAlign: 'center' },
      },
    },
    selectClear,
  };
}
