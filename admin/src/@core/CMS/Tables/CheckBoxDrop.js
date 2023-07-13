import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button, CustomInput } from 'reactstrap';

const ToggleButton = styled(Button)`
  width: 100%;
  &::after {
    display: inline-block;
    margin-left: 0.255em;
    vertical-align: 0.255em;
    content: '';
    border-top: 0.3em solid;
    border-right: 0.3em solid transparent;
    border-bottom: 0;
    border-left: 0.3em solid transparent;
  }
`;

const CheckBoxList = styled.div`
  position: absolute;
  width: 100%;
  top: 38px;
  box-sizing: border-box;
  padding: 5px 10px;
  background-color: #fff;
  border: 1px solid #dee2e6;
  z-index: 1;
`;

// 창에 선택한 업종들 15개 보여주고? 모달으로...?
function CheckBoxDrop({
  selectedList,
  onSelectValue,
  dropList,
  showList,
  setShowList,
}) {
  const toggle = useCallback(() => {
    setShowList((prev) => !prev);
  }, [setShowList]);

  const onClickHandler = useCallback(
    (e) => {
      // console.log('e.target.id', e.target.id);
      onSelectValue(e.target.id);
    },
    [onSelectValue],
  );

  return (
    <div style={{ width: '100%', maxWidth: '33.3333%', position: 'relative' }}>
      <ToggleButton onClick={toggle}>선택하기</ToggleButton>
      {showList && (
        <CheckBoxList>
          {dropList.map((val, idx) => (
            <CustomInput
              key={idx}
              type="checkbox"
              label={val.text}
              id={val.value}
              checked={selectedList.indexOf(val.value) > -1}
              onChange={onClickHandler}
            />
          ))}
        </CheckBoxList>
      )}
    </div>
  );
}

CheckBoxDrop.propTypes = {
  selectedList: PropTypes.arrayOf(PropTypes.string),
  onSelectValue: PropTypes.func,
  dropList: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      value: PropTypes.string,
    }),
  ),
  showList: PropTypes.bool,
  setShowList: PropTypes.func,
};
export default CheckBoxDrop;
