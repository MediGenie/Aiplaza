import React, { useCallback, useRef, useState, useEffect } from 'react';
import { columnHeader } from './columnHeader';
import { validate } from './validate';
import Form from './Form';
import initialQuery from './initialQuery';
import CMS from '@core/CMS';

import Filter from './Filter';
import PermissionService from '../../../api/permission.service';
import { useHistory, useRouteMatch } from 'react-router-dom';
import Axios from 'axios';
import { Button } from 'reactstrap';
import DefaultModal from '../../../@core/components/Modals';
import DefaultModalWithCancel from '../../../@core/components/ModalsWithCancel';

const searchType = [];

export default function Permission() {
  const match = useRouteMatch();
  const route = useHistory();
  const [checked, setChecked] = useState([]);
  const [showMultipleApproveModal, setShowMultipleApproveModal] =
    useState(false);
  const [showMultipleRejectModal, setShowMultipleRejectModal] = useState(false);
  const [showWarn, setShowWarn] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handlePermission = async (permission) => {
    const blockURl = `/permission`;
    await Axios.patch(blockURl, { _ids: checked, permission });
    location.reload();
  };
  const handleDelete = async () => {
    const blockURl = `/permission`;
    await Axios.delete(blockURl, {
      data: { _ids: checked },
    });
    location.reload();
  };

  const selectRow = {
    mode: 'checkbox',
    onSelect: (row, isSelect) => {
      if (isSelect) {
        setChecked([...checked, row._id].sort());
      } else {
        const filtered = checked
          .filter((el) => {
            return el !== row._id;
          })
          .sort();
        checked.includes(row._id) && setChecked(filtered);
      }
    },
    onSelectAll: (isSelect, rows) => {
      const rowsId = rows
        .map((el) => {
          return el._id;
        })
        .sort();
      if (isSelect) {
        setChecked((prev) => [...prev, ...rowsId]);
        return rows.map((el) => el._id);
      } else {
        setChecked((prev) =>
          prev.filter((el) => {
            return !rowsId.includes(el);
          }),
        );
      }
    },
    headerColumnStyle: {
      textAlign: 'center',
    },
    selectColumnStyle: { textAlign: 'center' },
  };

  const RenderManage = useCallback(
    ({ cell }) => {
      const detailHandler = () => {
        route.push(`/permission/${cell._id}`);
      };

      const permissionHandler = async (permission) => {
        const blockURl = `/permission`;
        await Axios.patch(blockURl, { _ids: [cell._id], permission });
        location.reload();
      };

      return (
        <>
          <Button className="mx-1 cell-button mr-1" onClick={detailHandler}>
            보기
          </Button>
          <Button
            className="mx-1 cell-button mr-1"
            color="primary"
            onClick={() => permissionHandler(true)}
          >
            승인
          </Button>
          <Button
            className="mx-1 cell-button mr-1"
            color="danger"
            onClick={() => permissionHandler(false)}
          >
            거절
          </Button>
        </>
      );
    },
    [route],
  );
  const permissionService = useRef(new PermissionService());

  useEffect(() => {
    setChecked([]);
  }, []);

  return (
    <>
      {match.isExact && (
        <>
          <div style={{ position: 'absolute', top: '75px', left: '100px' }}>
            <span>선택한 항목을{`  `}</span>
            <Button
              type="button"
              className="mx-1 cell-button mr-1"
              color="danger"
              onClick={() => {
                if (checked.length > 0) {
                  setShowMultipleApproveModal(true);
                } else {
                  setShowWarn(true);
                }
              }}
            >
              승인
            </Button>
            <Button
              type="button"
              className="mx-1 cell-button mr-1"
              color="danger"
              onClick={() => {
                if (checked.length > 0) {
                  setShowMultipleRejectModal(true);
                } else {
                  setShowWarn(true);
                }
              }}
            >
              거절
            </Button>
          </div>
        </>
      )}
      <DefaultModal
        ButtonMessage="확인"
        bodyMessage="선택된 유저가 없습니다."
        closeFunc={() => setShowWarn(false)}
        isOpen={showWarn}
        headerMessage=""
      />
      <DefaultModalWithCancel
        headerMessage="알림"
        bodyMessage={
          <>
            선택된 유저를 삭제하시겠습니까?
            <br />
            삭제 후 상태변경은 불가합니다.
          </>
        }
        ButtonMessage="삭제"
        cancelMessage="취소"
        isOpen={showDeleteModal}
        closeFunc={() => setShowDeleteModal(false)}
        onCloseEvent={handleDelete}
      />
      <DefaultModalWithCancel
        headerMessage="알림"
        bodyMessage={
          <>
            선택된 유저를 승인하시겠습니까?
            <br />
            승인 후 상태변경은 불가합니다.
          </>
        }
        ButtonMessage="승인"
        cancelMessage="취소"
        isOpen={showMultipleApproveModal}
        closeFunc={() => setShowMultipleApproveModal(false)}
        onCloseEvent={() => handlePermission(true)}
      />
      <DefaultModalWithCancel
        headerMessage="알림"
        bodyMessage={
          <>
            선택된 유저를 거절하시겠습니까?
            <br />
            거절 후 상태변경은 불가합니다.
          </>
        }
        ButtonMessage="거절"
        cancelMessage="취소"
        isOpen={showMultipleRejectModal}
        closeFunc={() => setShowMultipleRejectModal(false)}
        onCloseEvent={() => handlePermission(false)}
      />
      <CMS
        Form={Form}
        service={permissionService.current}
        validate={validate}
        header="승인요청 관리"
        listProps={{
          attributes: columnHeader,
          initialQuery: initialQuery,
          searchType: searchType,
          RenderFilter: Filter,
          selectRow,
          RenderManage: RenderManage,
          create: false,
        }}
      />
      {match.isExact && (
        <Button
          style={{ position: 'absolute', right: '110px' }}
          type="button"
          className="mx-1 cell-button mr-1"
          color="danger"
          onClick={() => {
            if (checked.length > 0) {
              setShowDeleteModal(true);
            } else {
              setShowWarn(true);
            }
          }}
        >
          삭제
        </Button>
      )}
    </>
  );
}

export {
  Form as StaffForm,
  columnHeader as staffColumnHeader,
  validate as staffValidate,
  initialQuery as staffInitialQuery,
  searchType as staffSearchType,
};
