import React, { useRef, useState } from 'react';
import { columnHeader } from './columnHeader';
import initialQuery from './initialQuery';
import CMS from '@core/CMS';
import Filter from './Filter';
import WithdarwService from '../../../api/withdraw.service';
import Axios from 'axios';
import DefaultModalWithCancel from '../../../@core/components/ModalsWithCancel';
import DefaultModal from '../../../@core/components/Modals';
import { useRouteMatch } from 'react-router-dom';
import { Button } from 'reactstrap';

const searchType = [];

export default function Withdraw() {
  const match = useRouteMatch();
  const providerService = useRef(new WithdarwService());
  const [checked, setChecked] = useState([]);
  const [showChangeModal, setShowChangeModal] = useState(false);
  const [showWarn, setShowWarn] = useState(false);

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

  const handleChange = async () => {
    const blockURl = `/withdraw`;
    await Axios.patch(blockURl, { _ids: checked });
    location.reload();
  };

  return (
    <>
      <DefaultModal
        ButtonMessage="확인"
        bodyMessage="선택된 유저가 없습니다."
        closeFunc={() => setShowWarn(false)}
        isOpen={showWarn}
        headerMessage=""
      />
      <DefaultModalWithCancel
        headerMessage="선택 항목 복구"
        bodyMessage={
          <>
            {`선택하신 ${checked.length}건의 데이터를 정말 복원하시겠습니까?`}
          </>
        }
        ButtonMessage="복구"
        cancelMessage="취소"
        isOpen={showChangeModal}
        closeFunc={() => setShowChangeModal(false)}
        onCloseEvent={handleChange}
      />
      <CMS
        service={providerService.current}
        header="탈퇴회원 관리"
        listProps={{
          attributes: columnHeader,
          initialQuery: initialQuery,
          searchType: searchType,
          RenderFilter: Filter,
          disableManage: true,
          create: false,
          edit: false,
          selectRow,
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
              setShowChangeModal(true);
            } else {
              setShowWarn(true);
            }
          }}
        >
          선택 복구
        </Button>
      )}
    </>
  );
}

export {
  columnHeader as WithdrawColumnHeader,
  initialQuery as WithdrawInitialQuery,
  searchType as WithdrawSearchType,
};
