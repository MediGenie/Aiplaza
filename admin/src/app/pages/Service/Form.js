import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import { Form, FormikProvider, useFormik } from 'formik';
import PropTypes from 'prop-types';
import { Button, Card, CardBody } from '@core/components';
import FormikTextInput from '../components/form/TextInput/FormikTextInput';
import { useCoreContext } from '../../../@core/CMS/useCoreContext';
import BootstrapTable from 'react-bootstrap-table-next';
import { PaginationPresent } from '../components/table/Pagination';
import Axios from 'axios';
import DefaultModalWithCancel from '../../../@core/components/ModalsWithCancel';

const initDataPropTypes = PropTypes.shape({
  _id: PropTypes.string,
  owner: PropTypes.string,
  name: PropTypes.string,
  created_at: PropTypes.string,
  price: PropTypes.string,
  buyer_count: PropTypes.number,
  user_count: PropTypes.number,
  link: PropTypes.string,
});
const initData = {
  _id: '',
  owner: '',
  name: '',
  created_at: '',
  price: '',
  buyer_count: 0,
  user_count: 0,
  link: '',
};

function FormComponent({
  formType,
  initialData,
  onSubmit,
  disableEdit,
  validate,
}) {
  const [deleteModal, setDeleteModal] = useState(false);
  const [page, setPage] = useState(1);
  const match = useRouteMatch();
  const service = useCoreContext();
  const history = useHistory();
  const [listData, setListData] = useState({
    data: [],
    totalPages: 0,
    total_number: 0,
  });

  const deleteHandler = () => {
    Axios.delete(`/service/${match.params._id}`)
      .then(() => {
        history.goBack();
      })
      .catch(() => {
        //NOTHING
      });
  };

  const pageClickHandler = useCallback((to) => {
    setPage(to);
  }, []);

  useEffect(() => {
    let mounted = true;
    if (!service.getMinorCategoryList) {
      return;
    }
    service.getMinorCategoryList(match.params._id, page).then((res) => {
      if (mounted === true) {
        setListData(res);
      }
    });
    return () => (mounted = false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const editUrl = useMemo(() => {
    return `${match.url}/edit`;
  }, [match]);
  const onCancel = useCallback(() => {
    history.goBack();
  }, [history]);
  const submitToServer = useCallback(
    (values) => {
      const data = {
        name: values.name,
      };
      onSubmit(data);
    },
    [onSubmit],
  );
  const formik = useFormik({
    initialValues: initialData,
    onSubmit: submitToServer,
    validationSchema: validate,
  });

  return (
    <>
      <DefaultModalWithCancel
        headerMessage="알림"
        bodyMessage={
          <>
            해당 항목을 삭제하시겠습니까?
            <br />
            삭제 시 데이터 복구는 불가능합니다.
          </>
        }
        ButtonMessage="확인"
        cancelMessage="취소"
        isOpen={deleteModal}
        closeFunc={() => setDeleteModal(false)}
        onCloseEvent={deleteHandler}
      />
      <Card className="my-3 custom-card">
        <CardBody>
          <FormikProvider value={formik}>
            <Form className="mb-2" autoComplete="off">
              <FormikTextInput label="서비스 제공자" name="owner" disabled />
              <FormikTextInput label="서비스 명" name="name" disabled />
              <FormikTextInput label="제공일" name="created_at" disabled />
              <FormikTextInput label="금액" name="price" disabled />
              <FormikTextInput label="구매자 수" name="buyer_count" disabled />
              <FormikTextInput label="이용자 수" name="user_count" disabled />
              <FormikTextInput label="링크" name="link" disabled />
              <button type="submit" id="form-submit-btn" hidden>
                submit
              </button>
            </Form>
          </FormikProvider>
        </CardBody>
      </Card>
      <div>
        <Card className="my-3 custom-card">
          <CardBody>
            {listData.data.length === 0 ? (
              <>
                <h5 className="text-center">
                  서비스 이용내역이 존재하지 않습니다.
                </h5>
              </>
            ) : (
              <BootstrapTable
                keyField="_id"
                classes="custom-table"
                data={listData.data}
                columns={[
                  {
                    dataField: 'name',
                    text: '이름',
                    align: 'center',
                    headerAlign: 'center',
                    sort: false,
                  },
                  {
                    dataField: 'email',
                    text: '이메일',
                    align: 'center',
                    headerAlign: 'center',
                    sort: false,
                  },
                  {
                    dataField: 'created_at',
                    text: '구매일',
                    align: 'center',
                    headerAlign: 'center',
                    sort: false,
                  },
                  {
                    dataField: 'price',
                    text: '결제금액',
                    align: 'center',
                    headerAlign: 'center',
                    sort: false,
                  },
                  {
                    dataField: 'status',
                    text: '상태',
                    align: 'center',
                    headerAlign: 'center',
                    sort: false,
                  },
                ]}
              />
            )}
          </CardBody>
        </Card>
        <PaginationPresent
          currentPage={page}
          totalPages={listData.totalPages}
          onClick={pageClickHandler}
        />
      </div>
      <div className="d-flex justify-content-end mt-3">
        {formType === 'detail' && (
          <>
            {disableEdit === false && (
              <Link to={editUrl}>
                <Button
                  style={{ fontSize: '1.15em' }}
                  color="windows"
                  className="mr-2"
                >
                  수정
                </Button>
              </Link>
            )}
          </>
        )}
        {formType !== 'detail' && (
          <>
            <label
              style={{ fontSize: '1.15em', height: 37 }}
              color="windows"
              className="btn btn-windows mr-2"
              htmlFor="form-submit-btn"
            >
              {formType === 'edit' ? '저장' : '등록'}
            </label>
            <button
              onClick={onCancel}
              style={{ fontSize: '1.15em', height: 37 }}
              className="btn btn-secondary mr-2"
            >
              취소
            </button>
          </>
        )}
      </div>
    </>
  );
}

FormComponent.propTypes = {
  formType: PropTypes.string,
  initialData: initDataPropTypes,
  onSubmit: PropTypes.func,
  disableEdit: PropTypes.bool,
  validate: PropTypes.any,
};

FormComponent.defaultProps = {
  formType: 'detail',
  initialData: initData,
  onSubmit: () => { },
  disableEdit: false,
};

export default FormComponent;
