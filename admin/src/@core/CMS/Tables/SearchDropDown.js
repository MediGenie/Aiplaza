/* eslint-disable react/prop-types */
import React, {
  useEffect,
  useLayoutEffect,
  useState,
  useCallback,
} from 'react';
import classnames from 'classnames';

// eslint-disable-next-line react/prop-types
function SearchDropDown({ categoryRef, searchType, onChangeSearchBar }) {
  const [selectedData, setSelectedData] = useState(undefined);
  const [openDrop, setOpenDrop] = useState(false);
  const dropDownClassName = classnames(
    { 'dropdown show': openDrop },
    { dropdown: !openDrop }
  );
  const dropDownMenuClassName = classnames(
    { 'dropdown-menu show': openDrop },
    { 'dropdown-menu': !openDrop }
  );

  const onToggle = useCallback(() => {
    setOpenDrop((prev) => !prev);
  }, []);

  const onClickDropButton = useCallback(
    (item, index) => {
      // console.log('item??', item);
      setSelectedData(item);
      setOpenDrop((prev) => !prev);

      // 05/03 업종 복수 선택을 위해 드롭다운 방식을 변경
      onChangeSearchBar({ method: item.method, index });
    },
    [onChangeSearchBar]
  );

  useLayoutEffect(() => {
    if (searchType.length !== 0) {
      setSelectedData(searchType[0]);
    }
  }, [searchType]);

  useEffect(() => {
    categoryRef.current = selectedData;
  }, [categoryRef, selectedData]);
  if (searchType.length === '') return <></>;

  return (
    <div className={dropDownClassName}>
      <button
        className="btn btn-secondary dropdown-toggle mx-1"
        type="button"
        id="searchDropDown"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded={openDrop}
        onClick={onToggle}
      >
        {selectedData && `${selectedData.text}`}
      </button>
      <div
        className={dropDownMenuClassName}
        // style={{ display: openDrop ? "block" : "none" }}
        aria-labelledby="searchDropDown"
      >
        {searchType.map((item, index) => (
          <button
            key={`search-drop-index${index}`}
            className="dropdown-item"
            type="button"
            onClick={() => onClickDropButton(item, index)}
          >
            {item.text}
          </button>
        ))}
      </div>
    </div>
  );
}

export default SearchDropDown;
