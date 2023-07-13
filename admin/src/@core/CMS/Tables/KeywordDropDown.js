import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react';
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import PropTypes from 'prop-types';

function KeywordDropDown({ keywordRef, dropList }) {
  const [selectedData, setSelectedData] = useState(undefined);
  const displayText = useMemo(() => {
    const index = dropList.findIndex((item) => {
      return item.key === selectedData;
    });
    if (index < 0) {
      return '선택해주세요.';
    }
    return dropList[index].text;
  }, [dropList, selectedData]);

  const onClickDropButton = useCallback((item) => {
    setSelectedData(item.key);
  }, []);

  useLayoutEffect(() => {
    if (dropList) {
      if (dropList.length !== 0) {
        setSelectedData(dropList[0]?.key);
      }
    }
  }, [dropList]);

  useEffect(() => {
    const index = dropList.findIndex((item) => item.key === selectedData);
    if (index < 0) {
      keywordRef.current = '';
    } else {
      keywordRef.current = dropList[index]?.key;
    }
  }, [dropList, keywordRef, selectedData]);

  if (dropList && (dropList.length === '' || dropList.length === 0))
    return <></>;

  return (
    <UncontrolledDropdown style={{ width: '100%', maxWidth: '33.33333%' }}>
      <DropdownToggle
        caret
        style={{
          backgroundColor: '#e2e2e2',
          borderColor: '#e2e2e2',
          color: '#000',
          width: '100%',
        }}
      >
        {displayText}&nbsp;
      </DropdownToggle>
      <DropdownMenu>
        {dropList.map((item, index) => (
          <DropdownItem
            key={`search-drop-index${index}`}
            type="button"
            onClick={() => onClickDropButton(item)}
            style={{ width: '100%' }}
          >
            {item.text}&nbsp;
          </DropdownItem>
        ))}
      </DropdownMenu>
    </UncontrolledDropdown>
  );
}

KeywordDropDown.propTypes = {
  id: PropTypes.string,
  keywordRef: PropTypes.any,
  dropList: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    })
  ),
};

export default KeywordDropDown;
