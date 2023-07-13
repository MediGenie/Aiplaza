import React, { useCallback, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useCoreContext } from '../../useCoreContext';
import { Button } from 'reactstrap';
import DefaultModal, { ConfirmModal } from '../../../components/Modals';

export default function TableFooter({
  create,
  selectable,
  selected,
  excelExport,
  refresh,
  create_label = '등록',
}) {
  const service = useCoreContext();
  const [modal, setModal] = useState({ show: false, header: '', message: '' });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const loading = useRef(false);

  const deleteHandler = useCallback(async () => {
    if (loading.current === true) return;
    loading.current = true;

    try {
      await service.deleteMany(selected);
      setShowDeleteModal(false);
      refresh();
    } catch (e) {
      const message =
        e?.response?.data?.message || '알 수 없는 오류가 발생하였습니다.';
      setModal({ show: true, message, header: '오류' });
    } finally {
      loading.current = false;
    }
  }, [refresh, selected, service]);

  // const excelHandler = useCallback(
  //   (e) => {
  //     if (enableExportExcel !== true) return;
  //     const removeColumns = [];
  //     if (selectable) {
  //       removeColumns.push(0);
  //     }
  //     if (!disableManage) {
  //       let last = columns.length;
  //       if (!selectable) {
  //         last = last - 1;
  //       }
  //       removeColumns.push(last);
  //     }
  //     return ExcellentExport.convert(
  //       {
  //         anchor: e.target,
  //         format: 'xlsx',
  //         openAsDownload: true,
  //       },
  //       [
  //         {
  //           name: '테이블',
  //           from: { table: 'data-table' },
  //           removeColumns: removeColumns,
  //           fixValue: (value) => {
  //             return value
  //               .replace(
  //                 new RegExp('<span class="mr-1 badge badge-secondary">', 'gi'),
  //                 ''
  //               )
  //               .replace(new RegExp('</span>', 'gi'), ' ');
  //           },
  //         },
  //       ]
  //     );
  //   },
  //   [enableExportExcel, selectable, disableManage, columns.length]
  // );

  return (
    <div className="d-flex justify-content-end mt-3">
      {create === true && (
        <Link
          to={`/${service.apiName}/create`}
          style={{ fontSize: '1.15em' }}
          className="btn btn-primary mr-2"
        >
          {create_label}
        </Link>
      )}
      {selectable && (
        <>
          <Button
            color="warning"
            style={{ fontSize: '1.15em' }}
            className="mr-2"
            type="button"
            onClick={() => setShowDeleteModal(true)}
          >
            선택 삭제
          </Button>
          <DefaultModal
            isOpen={modal.show}
            headerMessage={modal.header}
            bodyMessage={modal.message}
            ButtonMessage="확인"
            closeFunc={() => setModal((prev) => ({ ...prev, show: false }))}
          />
          <ConfirmModal
            isOpen={showDeleteModal}
            headerMessage="선택 항목 삭제"
            bodyMessage={
              <>
                선택하신 {selected.length}건의 데이터를 정말 삭제하시겠습니까?
                <br />
                삭제한 데이터는 복원할 수 없습니다.
              </>
            }
            okButtonMessage="삭제"
            cancelButtonMessage="취소"
            onOkButtonHandler={deleteHandler}
            onCancelButtonHandler={() => setShowDeleteModal(false)}
          />
        </>
      )}
      {excelExport && (
        <button className="btn btn-primary mr-3">Excel로 내보내기</button>
      )}
    </div>
  );
}
TableFooter.propTypes = {
  create: PropTypes.bool,
  selectable: PropTypes.bool,
  selected: PropTypes.array,
  excelExport: PropTypes.bool,
  refresh: PropTypes.func.isRequired,
};
TableFooter.defaultProps = {
  create: true,
  selectable: true,
  selected: [],
  excelExport: false,
};
