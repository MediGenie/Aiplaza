import React, { useCallback, useMemo, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Button, Container, Row } from 'reactstrap';
import qs from 'query-string';

function PaginationItem({ to, current, onClick: _onClick }) {
  const history = useHistory();
  const location = useLocation();

  const classname = useMemo(() => {
    return to === current ? 'mx-1' : 'mx-1 cell-button';
  }, [current, to]);

  const onClick = useCallback(() => {
    _onClick && _onClick(to);
    // const query = qs.parse(location.search);
    // query.page = to;
    // const nextQuery = `/${apiName}?${qs.stringify(query)}`;
    // history.push(nextQuery);
  }, [_onClick, to]);

  return (
    <Button
      color="primary"
      className={classname}
      disabled={to === current}
      onClick={onClick}
    >
      {to}
    </Button>
  );
}

function PrevButton({ to, onClick: _onClick }) {
  const history = useHistory();
  const location = useLocation();

  const onClick = useCallback(() => {
    _onClick && _onClick(to);
    // const query = qs.parse(location.search);
    // query.page = to;
    // const nextQuery = `/${apiName}?${qs.stringify(query)}`;
    // history.push(nextQuery);
  }, [_onClick, to]);

  return (
    <Button color="secondary" className="mx-1" onClick={onClick}>
      <i className="fa fa-angle-double-left" />
    </Button>
  );
}
function NextButton({ to, onClick: _onClick }) {
  const history = useHistory();
  const location = useLocation();

  const onClick = useCallback(() => {
    _onClick && _onClick(to);
    // const query = qs.parse(location.search);
    // query.page = to;
    // const nextQuery = `/${apiName}?${qs.stringify(query)}`;
    // history.push(nextQuery);
  }, [_onClick, to]);

  return (
    <Button color="secondary" className="mx-1" onClick={onClick}>
      <i className="fa fa-angle-double-right" />
    </Button>
  );
}

const PAGE_BLOCK = 10;

export function PaginationPresent({ totalPages, currentPage, onClick }) {
  const [currBlk, setCurrBlk] = useState(0);
  const [lastBlk, setLastBlk] = useState(0);
  const paginationItems = useMemo(() => {
    if (totalPages === 0) return [];
    if (currentPage === 0) return [];
    if (currentPage > totalPages) return [];

    const currentBlock = Math.ceil(currentPage / PAGE_BLOCK) - 1;
    const lastBlock = Math.ceil(totalPages / PAGE_BLOCK) - 1;
    const startNum = currentBlock * PAGE_BLOCK + 1;
    let lastNum = currentBlock * PAGE_BLOCK + PAGE_BLOCK;
    if (lastNum > totalPages) lastNum = totalPages;
    const count = lastNum - (startNum - 1);

    setCurrBlk(currentBlock);
    setLastBlk(lastBlock);

    const array = Array(count)
      .join(0)
      .split(0)
      .map((v, i) => i + startNum);
    return array;
  }, [currentPage, totalPages]);

  return (
    <div>
      <Row>
        <Container style={{ textAlign: 'center' }}>
          {currBlk !== 0 && (
            <PrevButton to={currBlk * PAGE_BLOCK} onClick={onClick} />
          )}
          {paginationItems.map((v) => (
            <PaginationItem
              to={v}
              key={v}
              current={currentPage}
              onClick={onClick}
            />
          ))}
          {currBlk !== lastBlk && (
            <NextButton to={(currBlk + 1) * PAGE_BLOCK + 1} onClick={onClick} />
          )}
        </Container>
      </Row>
    </div>
  );
}

export default function Pagination({ totalPages, apiName }) {
  const location = useLocation();
  const history = useHistory();
  const currentPage = useMemo(() => {
    const query = qs.parse(location.search);
    if (query.page) {
      const curr = parseInt(query.page);
      return curr;
    }
    return 0;
  }, [location]);

  const onClick = useCallback(
    (to) => {
      const query = qs.parse(location.search);
      query.page = to;
      const nextQuery = `/${apiName}?${qs.stringify(query)}`;
      history.push(nextQuery);
    },
    [apiName, history, location.search],
  );

  return (
    <PaginationPresent
      currentPage={currentPage}
      onClick={onClick}
      totalPages={totalPages}
    />
  );
}
