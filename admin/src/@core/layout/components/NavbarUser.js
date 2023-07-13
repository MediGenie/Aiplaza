/* eslint-disable no-unused-vars */
import React, { useCallback, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { NavItem } from './../../components';
import { useAuthContext } from '../../store/hooks/useAuthContext';
import Axios from 'axios';
import { authActionCreator } from '../../store/actions/authActions';
import { ConfirmModal } from '../../components/Modals';

const WebNavItem = styled(NavItem)`
  @media only screen and (max-width: 499px) {
    display: none;
  }
`;
const MobileNavItem = styled(NavItem)`
  width: 92%;
  @media only screen and (min-width: 500px) {
    display: none;
  }
`;

const NavbarUser = (props) => {
  const [, authDispatch] = useAuthContext();
  const [showModal, setShowModal] = useState(false);

  const onLogout = useCallback(async () => {
    await Axios.get('/auth/logout');
    authDispatch(authActionCreator.Logout());
  }, [authDispatch]);

  const toggle = useCallback(() => {
    setShowModal(!showModal);
  }, [showModal]);

  return (
    <>
      <WebNavItem {...props}>
        <button
          onClick={toggle}
          style={{ backgroundColor: 'transparent', border: 'none' }}
        >
          <i className="fa fa-power-off" />
        </button>
      </WebNavItem>
      <MobileNavItem {...props}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button
            onClick={toggle}
            style={{ backgroundColor: 'transparent', border: 'none' }}
          >
            <i className="fa fa-power-off" />
          </button>
        </div>
      </MobileNavItem>
      <ConfirmModal
        headerMessage="로그아웃 안내"
        bodyMessage="로그아웃 하시겠습니까?"
        isOpen={showModal}
        setIsOpen={setShowModal}
        cancelButtonMessage="취소"
        okButtonMessage="확인"
        onCancelButtonHandler={toggle}
        onOkButtonHandler={onLogout}
      />
    </>
  );
};

NavbarUser.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
};

export { NavbarUser };
