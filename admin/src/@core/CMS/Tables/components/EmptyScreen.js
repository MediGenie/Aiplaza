import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { useCoreContext } from '../../useCoreContext';
import { Jumbotron } from 'reactstrap';
import { Link } from 'react-router-dom';

export default function EmptyScreen({ create }) {
  const service = useCoreContext();

  return (
    <div className="table-responsive-xl">
      <Jumbotron>
        <div className="text-center">
          <h4 className="display-5">조회된 항목이 없습니다.</h4>
          {create && (
            <Fragment>
              <p className="lead">새로운 항목을 등록해주세요.</p>
              <p>
                <Link
                  to={`/${service.apiName}/create`}
                  className="btn btn-primary"
                  style={{ fontSize: '1.15em' }}
                >
                  등록하기
                </Link>
              </p>
            </Fragment>
          )}
        </div>
      </Jumbotron>
    </div>
  );
}
EmptyScreen.propTypes = {
  create: PropTypes.bool,
};
EmptyScreen.defaultProps = {
  create: false,
};
