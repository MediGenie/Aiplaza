/* eslint-disable react/prop-types */
import React, { useCallback, useMemo } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Label,
} from 'reactstrap';

const RadioInput = ({ value, disabled, name, onChange }) => {
  const onChangeHandler = useCallback((e) => {
    const num = e.target.value;
    if (typeof onChange === 'function') {
      onChange(num);
    }
  }, []);
  return (
    <>
      <Label check style={{ display: 'inline-block' }}>
        <input
          type="radio"
          value={1}
          checked={value === 1}
          disabled={disabled}
          name={name}
          onChange={onChangeHandler}
        />
        1
      </Label>
      <Label check style={{ display: 'inline-block' }}>
        <input
          type="radio"
          value={2}
          checked={value === 2}
          disabled={disabled}
          name={name}
          onChange={onChangeHandler}
        />
        2
      </Label>
      <Label check style={{ display: 'inline-block' }}>
        <input
          type="radio"
          value={3}
          checked={value === 3}
          disabled={disabled}
          name={name}
          onChange={onChangeHandler}
        />
        3
      </Label>
      <Label check style={{ display: 'inline-block' }}>
        <input
          type="radio"
          value={4}
          checked={value === 4}
          disabled={disabled}
          name={name}
          onChange={onChangeHandler}
        />
        4
      </Label>
      <Label check style={{ display: 'inline-block' }}>
        <input
          type="radio"
          value={5}
          checked={value === 5}
          disabled={disabled}
          name={name}
          onChange={onChangeHandler}
        />
        5
      </Label>
    </>
  );
};
const interiorTexts = {
  modernization: ['클래식', '모던'],
  brightness: ['어두운', '밝은'],
  scale: ['소규모', '대규모'],
  colorfulness: ['단조로운', '컬러풀한'],
  civilization: ['자연', '도시'],
};
const moodTexts = {
  luxury: ['대중적', '럭셔리'],
  dynamic: ['편안한', '다이나믹한'],
  energy: ['차분한', '산만한'],
  complexity: ['단조로운', '복잡한'],
  joyfulness: ['슬픈', '기쁜'],
  quality: ['빈티지한', '고급스러운'],
  splendor: ['심플한', '화려한'],
  strength: ['약한/여린', '강한'],
  speed: ['느린', '빠른'],
  warmth: ['차가운', '따뜻한'],
};
const PTag = styled.p`
  width: 70px;
  display: inline-block;
  text-align: ${(props) => props.textAlign};
`;

function RadioBoxModal({
  headerMessage,
  isOpen,
  closeFunc,
  values,
  disabled = true,
  onChange,
}) {
  const toggle = useCallback(() => {
    closeFunc(false);
  }, [closeFunc]);
  const radioList = useMemo(() => {
    const result = [];
    let texts;
    if (headerMessage === '인테리어') {
      texts = interiorTexts;
    } else texts = moodTexts;
    for (const item in values) {
      result.push({
        value: values[item],
        prev: texts[item][0],
        next: texts[item][1],
        name: item,
      });
    }
    return result;
  }, [headerMessage, values]);

  const onChangeHandler = useCallback((type, value) => {
    if (typeof onChange === 'function') {
      onChange(type, value);
    }
  }, []);

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader tag="h6">{headerMessage}</ModalHeader>
      <ModalBody>
        {radioList.map((item, index) => (
          <div
            key={index}
            style={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <PTag textAlign="left">{item.prev}</PTag>
            <RadioInput
              value={item.value}
              name={item.name}
              disabled={disabled}
              onChange={(value) => onChangeHandler(item.name, value)}
            />
            <PTag textAlign="right">{item.next}</PTag>
          </div>
        ))}
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={toggle}>
          확인
        </Button>
      </ModalFooter>
    </Modal>
  );
}

RadioBoxModal.propTypes = {
  headerMessage: PropTypes.string,
  isOpen: PropTypes.any.isRequired,
  closeFunc: PropTypes.func,
  values: PropTypes.oneOfType([
    PropTypes.shape({
      modernization: PropTypes.number,
      brightness: PropTypes.number,
      scale: PropTypes.number,
      colorfulness: PropTypes.number,
      civilization: PropTypes.number,
    }),
    PropTypes.shape({
      luxury: PropTypes.number,
      dynamic: PropTypes.number,
      energy: PropTypes.number,
      complexity: PropTypes.number,
      joyfulness: PropTypes.number,
      quality: PropTypes.number,
      splendor: PropTypes.number,
      strength: PropTypes.number,
      speed: PropTypes.number,
      warmth: PropTypes.number,
    }),
  ]),
};

export default RadioBoxModal;
