import React, { useCallback, useEffect, useState } from 'react';
import {
  Button,
  Form,
  FormGroup,
  InputGroup,
  UncontrolledTooltip,
} from 'reactstrap';
import { useHistory, useLocation } from 'react-router-dom';
import { parse, stringify } from 'query-string';
import { useCoreContext } from '../../../@core/CMS/useCoreContext';
import Toggle from 'react-toggle';
import { ConfirmModal } from '../../../@core/components/Modals';
import axios from 'axios';

export default function Filter() {
  const location = useLocation();
  const history = useHistory();
  const service = useCoreContext();
  const onSubmit = useCallback(
    (e) => {
      if (e && e.preventDefault && typeof e.preventDefault === 'function') {
        e.preventDefault();
      }
      const query = parse(location.search);
      query.search = e.target.searchKeyword.value;
      query.page = 1;
      history.push(`/${service.apiName}?${stringify(query)}`);
    },
    [history, location.search, service.apiName]
  );

  const [loading, setLoading] = useState(false);
  const [isPublish, setIsPublish] = useState(false);

  const [openPublishModal, setOpenPublishModal] = useState(false);
  const handleConfirm = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.patch('/site-config/faq', {
        next: !isPublish,
      });
      const _next = response.data.next === true ? true : false;
      setIsPublish(_next);
    } catch {
      // NOTHING
    } finally {
      setOpenPublishModal(false);
      setLoading(false);
    }
  }, [isPublish]);
  const handleCancel = useCallback(() => {
    setOpenPublishModal(false);
  }, []);
  const getFAQOpen = useCallback(async () => {
    const response = await axios.get('/site-config/faq');
    return response.data.current;
  }, []);

  useEffect(() => {
    let mounted = true;
    getFAQOpen()
      .then((current) => {
        if (mounted === true) {
          setIsPublish(current);
        }
      })
      .catch(() => {
        // NOTHING
      });
    return () => {
      mounted = false;
    };
  }, [getFAQOpen]);

  return (
    <div>
      <div>
        <div className="d-flex items-center">
          <span className="mr-3">노출관리</span>
          <Toggle
            className="mr-3"
            checked={isPublish}
            disabled={loading}
            onClick={() => setOpenPublishModal(true)}
          />
          <span>{isPublish ? 'ON' : 'OFF'}</span>
          <ConfirmModal
            headerMessage="노출 안내"
            bodyMessage={
              isPublish === true
                ? 'FAQ를 사용자화면에 노출하지 않으시겠습니까?'
                : 'FAQ를 사용자화면에 노출하시겠습니까?'
            }
            isOpen={openPublishModal}
            setIsOpen={setOpenPublishModal}
            onCancelButtonHandler={handleCancel}
            cancelButtonMessage="취소"
            okButtonMessage="변경하기"
            onOkButtonHandler={handleConfirm}
          />
        </div>
      </div>
      <Form onSubmit={onSubmit}>
        <FormGroup>
          <InputGroup>
            <div className="col-4"></div>
            <input
              type="text"
              name="searchKeyword"
              id="searchKeyword"
              className="col-4 form-control"
              placeholder="이름을 입력하세요."
            />
            <Button
              type="submit"
              color="windows"
              className="mx-1"
              id="search-button"
            >
              <i className="fa fa-fw fa-search" aria-hidden="true"></i>
              <UncontrolledTooltip target="search-button">
                검색
              </UncontrolledTooltip>
            </Button>
          </InputGroup>
        </FormGroup>
      </Form>
    </div>
  );
}
Filter.propTypes = {};
Filter.defaultProps = {};
