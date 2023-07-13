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

export default function Filter() {
  const location = useLocation();
  const history = useHistory();
  const onSubmit = useCallback(
    (e) => {
      if (e && e.preventDefault && typeof e.preventDefault === 'function') {
        e.preventDefault();
      }
      const query = parse(location.search);
      query.search = e.target.searchKeyword.value;
      query.page = 1;
      history.push('/service?' + stringify(query));
    },
    [history, location.search],
  );

  return (
    <Form onSubmit={onSubmit}>
      <FormGroup>
        <FormGroup>
          <InputGroup>
            <div className="col-4"></div>
            <input
              type="text"
              name="searchKeyword"
              id="searchKeyword"
              className="col-4 form-control"
              placeholder="서비스명, 서비스제공자를 입력하세요."
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
      </FormGroup>
    </Form>
  );
}
Filter.propTypes = {};
Filter.defaultProps = {};
