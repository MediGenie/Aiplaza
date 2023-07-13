import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button } from 'reactstrap';
import { useHistory } from 'react-router-dom';

const Wrapper = styled.article`
  margin: 120px auto;
  text-align: center;
`;

const TextWrapper = styled.div`
  display: inline-block;
  text-align: left;
`;

const Title = styled.h2`
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 32px;
`;

export default function Error404() {
  const history = useHistory();
  const goToBack = useCallback(() => {
    history.goBack();
  }, [history]);
  return (
    <Wrapper>
      <TextWrapper>
        <Title>페이지를 찾을 수 없습니다.</Title>
        <Button color="primary" type="button" onClick={goToBack}>
          이전 화면으로 돌아가기
        </Button>
      </TextWrapper>
    </Wrapper>
  );
}
Error404.propTypes = {};
Error404.defaultProps = {};
