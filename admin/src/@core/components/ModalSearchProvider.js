import React, { useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Axios from 'axios';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  UncontrolledTooltip,
  InputGroup,
  Col,
  FormGroup,
  InputGroupAddon,
} from 'reactstrap';

function ModalSearchProvider({
  isOpen,
  setIsOpen,
  setState,
  setEmail,
  setServiceOwnerData,
}) {
  const [selected, setSelected] = useState('');
  const [data, setData] = useState([]);

  const onSearchHandler = async () => {
    const _val = searchRef.current.value;
    const blockURl = `/sales/find-provider`;
    const val = { search: _val };
    await Axios.patch(blockURl, val).then((el) => {
      setData(el.data);
    });
  };

  const toggle = useCallback(async () => {
    if (!selected) return;
    const _email = data.find((el) => el._id === selected);
    const email = _email.email;
    setState(selected);
    setEmail(email);
    const blockURl = `/sales/get-last-amount`;
    const val = { id: selected };
    await Axios.patch(blockURl, val).then((el) => {
      setServiceOwnerData(el.data);
    });
    setIsOpen(false);
  }, [data, selected, setEmail, setIsOpen, setServiceOwnerData, setState]);
  const searchRef = useRef(null);

  const onInitializeModal = useCallback(() => {
    setData([]);
    setSelected('');
    if (searchRef.current) searchRef.current.value = '';
  }, []);

  useEffect(() => {
    onInitializeModal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} toggle={() => setIsOpen(false)}>
      <ModalHeader tag="h6">서비스 제공자 선택</ModalHeader>
      <ModalBody style={{ whiteSpace: 'break-spaces' }}>
        <FormGroup row>
          <Col sm={9}>
            <InputGroup>
              <input
                type="text"
                name="searchKeyword"
                id="searchKeyword"
                className="form-control"
                placeholder="이메일을 입력해주세요."
                ref={searchRef}
              />
              <InputGroupAddon addonType="append">
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
              </InputGroupAddon>
            </InputGroup>
          </Col>
        </FormGroup>
        {data.map((el) => {
          return (
            <li className="show-sessions" key={el._id}>
              <Input
                style={{ position: 'relative' }}
                type="checkbox"
                checked={selected === el._id}
                onChange={() => {
                  if (selected === el._id) {
                    setSelected('');
                  } else if (selected !== el._id) {
                    setSelected(el._id);
                  }
                }}
              />
              {` ${el.email}`}
            </li>
          );
        })}
      </ModalBody>
      <ModalFooter>
        <Button color="danger" onClick={toggle}>
          선택
        </Button>
        <Button onClick={() => setIsOpen(false)}>취소</Button>
      </ModalFooter>
    </Modal>
  );
}

ModalSearchProvider.propTypes = {
  data: PropTypes.array,
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func,
  setState: PropTypes.func,
  setEmail: PropTypes.func,
  setServiceOwnerData: PropTypes.func,
};
ModalSearchProvider.defaultProps = {
  data: [],
  setIsOpen: () => {},
  setState: () => {},
  setEmail: () => {},
  setServiceOwnerData: () => {},
};

export default ModalSearchProvider;
