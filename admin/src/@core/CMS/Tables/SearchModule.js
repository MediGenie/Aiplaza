import React, { useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { stringify, parse } from 'query-string';
import { useHistory, useLocation } from 'react-router-dom';
import {
  Button,
  Form,
  FormGroup,
  InputGroup,
  InputGroupAddon,
  UncontrolledTooltip,
} from 'reactstrap';
import SearchDropDown from './SearchDropDown';
import KeywordDropDown from './KeywordDropDown';
import CheckBoxDrop from './CheckBoxDrop';

export default function SearchModule({
  searchType = [],
  setDefaultModalInfo,
  dataType,
  initialQuery,
}) {
  const history = useHistory();
  const location = useLocation();

  const searchRef = useRef(null);
  const categoryRef = useRef(null);
  const keywordRef = useRef(null);

  const [searchMethod, setSearchMethod] = useState('text');
  const [selectedList, setSelectedList] = useState([]);
  const [keywords, setKeywords] = useState([]);
  const [showCheckDropList, setShowCheckDropList] = useState(false);

  const onSelectValue = useCallback(
    (val) => {
      // 값이 없으면 추가, 있으면 제거
      if (selectedList.indexOf(val) > -1) {
        setSelectedList((prev) => prev.filter((item) => item !== val));
      } else setSelectedList((prev) => [...prev, val]);
    },
    [selectedList],
  );

  const onSearchHandler = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      const data = searchRef.current.value;
      const category = categoryRef.current;
      if (category === undefined) {
        setDefaultModalInfo({
          visible: true,
          bodyMessage: '검색할 범주를 선택해주세요',
          headerMessage: '입력 오류',
          onCloseFunc: undefined,
        });
      }
      const query = parse(location.search);
      query.page = '1';
      query['search_attr'] = category.dataType;
      query.search = data;
      const replaceUrl = `/${dataType}?${stringify(query)}`;
      history.push(replaceUrl);
    },
    [dataType, history, location.search, setDefaultModalInfo],
  );

  const onChangeSearchBar = useCallback(
    ({ method, index }) => {
      setSearchMethod(method);
      setKeywords(searchType[index].dropList);
      setSelectedList([]);
      setShowCheckDropList(false);
    },
    [searchType],
  );

  useEffect(() => {
    const data = searchType[0];
    if (!data) return;
    const { method, dropList } = data;
    setSearchMethod(method);
    setKeywords(dropList);
    setSelectedList([]);
    setShowCheckDropList(false);
  }, [searchType]);

  const onInitializeTable = useCallback(
    async (e) => {
      e.preventDefault();
      e.stopPropagation();
      setShowCheckDropList(false);
      setSelectedList([]);
      history.push(`/${dataType}?${initialQuery}`);
      if (searchRef.current) searchRef.current.value = '';
    },
    [history, dataType, initialQuery],
  );

  const onSearchKeyword = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      const category = categoryRef.current;
      const keyword = keywordRef.current;
      const query = parse(location.search);
      query.page = 1;
      if (category.method === 'checkbox') {
        query['search_attr'] = category.dataType;
        query.search = selectedList;
        setShowCheckDropList(false);
      } else {
        if (keywordRef === undefined) {
          setDefaultModalInfo({
            visible: true,
            bodyMessage: '검색할 범주를 선택해주세요',
            headerMessage: '입력 오류',
            onCloseFunc: undefined,
          });
          return;
        } else {
          query['search_attr'] = category.dataType;
          query.search = keyword;
        }
      }

      const replaceUrl = `/${dataType}?${stringify(query)}`;
      history.push(replaceUrl);
    },
    [dataType, history, location.search, selectedList, setDefaultModalInfo],
  );

  if (searchType.length === 0) return null;

  return (
    <Form onSubmit={onSearchHandler}>
      <FormGroup>
        <InputGroup>
          <div className="col-3"></div>
          <InputGroupAddon className="mr-1" addonType="prepend">
            <Button
              onClick={onInitializeTable}
              className="search-icons mx-1"
              aria-label="초기화"
              aria-labelledby="초기화"
              id="reset-button"
            >
              <i className="fa fa-fw fa-refresh" aria-hidden="true"></i>
              <UncontrolledTooltip target="reset-button">
                초기화
              </UncontrolledTooltip>
            </Button>
            <SearchDropDown
              categoryRef={categoryRef}
              searchType={searchType}
              onChangeSearchBar={onChangeSearchBar}
            />
          </InputGroupAddon>
          {searchMethod === 'text' && (
            <>
              <input
                type="text"
                name="searchKeyword"
                id="searchKeyword"
                className="col-4 form-control"
                placeholder="검색어를 입력해주세요"
                ref={searchRef}
              />
              <Button
                color="windows"
                onClick={onSearchHandler}
                className="mx-1"
                id="search-button"
              >
                <i className="fa fa-fw fa-search" aria-hidden="true"></i>
                <UncontrolledTooltip target="search-button">
                  검색
                </UncontrolledTooltip>
              </Button>
            </>
          )}
          {searchMethod === 'dropdown' && (
            <>
              <KeywordDropDown
                id="keyword-drop"
                keywordRef={keywordRef}
                dropList={keywords}
              />
              <Button
                color="windows"
                onClick={onSearchKeyword}
                className="mx-1"
                id="search-button"
              >
                <i className="fa fa-fw fa-search" aria-hidden="true"></i>
                <UncontrolledTooltip target="search-button">
                  검색
                </UncontrolledTooltip>
              </Button>
            </>
          )}
          {searchMethod === 'checkbox' && (
            <>
              <CheckBoxDrop
                selectedList={selectedList}
                onSelectValue={onSelectValue}
                dropList={keywords}
                showList={showCheckDropList}
                setShowList={setShowCheckDropList}
              />
              <Button
                color="windows"
                onClick={onSearchKeyword}
                className="mx-1"
                id="search-button"
              >
                <i className="fa fa-fw fa-search" aria-hidden="true"></i>
                <UncontrolledTooltip target="search-button">
                  검색
                </UncontrolledTooltip>
              </Button>
            </>
          )}
        </InputGroup>
      </FormGroup>
    </Form>
  );
}
SearchModule.propTypes = {
  searchType: PropTypes.arrayOf(
    PropTypes.shape({
      method: PropTypes.oneOf(['dropdown', 'text']),
      text: PropTypes.string,
      dataType: PropTypes.string,
      dropList: PropTypes.arrayOf(
        PropTypes.shape({ key: PropTypes.string, text: PropTypes.string }),
      ),
    }),
  ),
  dataType: PropTypes.string, // API이름
  setDefaultModalInfo: PropTypes.func,
  initialQuery: PropTypes.string,
};
SearchModule.defaultProps = {};
