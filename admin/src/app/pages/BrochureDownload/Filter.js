import React, { useCallback } from 'react';
import {
  Button,
  Form,
  FormGroup,
  InputGroup,
  UncontrolledTooltip,
} from 'reactstrap';
import { useHistory, useLocation } from 'react-router-dom';
import { parse, stringify } from 'query-string';
import { useCoreContext } from '../../../@core/CMS/useCoreContext';

export default function Filter() {
  const location = useLocation();
  const history = useHistory();
  const context = useCoreContext();
  const onSubmit = useCallback(
    (e) => {
      if (e && e.preventDefault && typeof e.preventDefault === 'function') {
        e.preventDefault();
      }
      const query = parse(location.search);
      query.search = e.target.searchKeyword.value;
      query.page = 1;
      history.push(`/${context.apiName}?` + stringify(query));
    },
    [context.apiName, history, location.search]
  );

  return (
    <Form onSubmit={onSubmit}>
      <FormGroup>
        <InputGroup>
          <div className="col-4"></div>
          <input
            type="text"
            name="searchKeyword"
            id="searchKeyword"
            className="col-4 form-control"
            placeholder="사례명을 입력하세요."
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
