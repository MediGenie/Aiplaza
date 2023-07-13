import React, { useCallback, useMemo, useState } from 'react';
import {
  Button,
  Form,
  FormGroup,
  InputGroup,
  UncontrolledTooltip,
} from 'reactstrap';
import { useHistory, useLocation } from 'react-router-dom';
import { parse, stringify } from 'query-string';
import { Menu, Dropdown } from 'antd';

const FieldNameMap = {
  user_id: '이메일',
  name: '이름',
};

export default function Filter() {
  const location = useLocation();
  const history = useHistory();
  const [search_attr, setSearch_attr] = useState('user_id');
  const [search, setSearch] = useState('');
  const currentFilter = useMemo(() => {
    const query = parse(location.search) || {};
    const search_attr = query.search_attr || '';

    if (search_attr === '') {
      return '이메일';
    }

    return FieldNameMap[search_attr] || '알수없음';
  }, [location.search]);
  const onSelect = useCallback(
    (value) => {
      const query = parse(location.search);
      setSearch_attr(value);
      query.search_attr = value;
      query.search = search;
      query.page = 1;
      if (query.search_attr === '') {
        delete query.search_attr;
      }
      const selectedFilter = query.search_attr
        ? `&search_attr=${query.search_attr}`
        : '';
      const searchQuery = query.search ? `&search=${query.search}` : '';
      history.push(`/staff?page=${query.page}${searchQuery}${selectedFilter}`);
    },
    [history, location.search, search],
  );
  const onSubmit = useCallback(
    (e) => {
      if (e && e.preventDefault && typeof e.preventDefault === 'function') {
        e.preventDefault();
      }
      const query = parse(location.search);
      query.search = e.target.searchKeyword.value;
      query.search_attr = search_attr;
      query.page = 1;
      setSearch(query.search);
      history.push('/staff?' + stringify(query));
    },
    [history, location.search, search_attr],
  );

  return (
    <Form onSubmit={onSubmit}>
      <FormGroup>
        <InputGroup>
          <div className="col-4">
            <Dropdown
              className="float-right"
              overlay={
                <Menu>
                  {Object.entries(FieldNameMap).map(([key, value]) => (
                    <>
                      <Menu.Divider />
                      <Menu.Item
                        key={key}
                        onClick={() => {
                          onSelect(key);
                        }}
                      >
                        {value}
                      </Menu.Item>
                    </>
                  ))}
                </Menu>
              }
              trigger={['click']}
            >
              <Button>{currentFilter}</Button>
            </Dropdown>
          </div>
          <input
            type="text"
            name="searchKeyword"
            id="searchKeyword"
            className="col-4 form-control"
            placeholder="검색어를 입력하세요."
          />
          <Button
            type="submit"
            color="windows"
            className="mx-1"
            id="search-button"
          >
            <i className="fa fa-fw fa-search" aria-hidden="true"></i>
            <UncontrolledTooltip target="search-button">
              검색
            </UncontrolledTooltip>
          </Button>
        </InputGroup>
      </FormGroup>
    </Form>
  );
}
Filter.propTypes = {};
Filter.defaultProps = {};
