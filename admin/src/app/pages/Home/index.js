import React, { useState, useEffect } from 'react';

import { DashboardOverviewCard } from '../../components/DashboardOverviewCard';
import { CardDeck, Col, Container, Row } from 'reactstrap';
import { Ranking, TableDiv } from './styleComponents';
import BootstrapTable from 'react-bootstrap-table-next';
import { serviceColumnHeader } from './serviceColumnHeader';
import { customerColumHeader } from './customerColumHeader';
import Axios from 'axios';

export default function Dashboard() {
  const [providerNum, setProviderNum] = useState('');
  const [customerNum, setCustomerNum] = useState('');
  const [serviceNum, setServiceNum] = useState('');
  const [paidThisMonth, setPaidThisMonth] = useState('');
  const [changeRate, setChangeRate] = useState('');
  const [serviceRanking, setServiceRanking] = useState([]);
  const [customerRanking, setCustomerRanking] = useState([]);

  useEffect(() => {
    const getMany = async () => {
      try {
        await Axios.get('/home', {
          headers: { Pragma: 'no-cache' },
        }).then((res) => {
          const {
            providerTopTen,
            customerTopTen,
            providerNum,
            customerNum,
            serviceNum,
            paidThisMonth,
            changeRate,
          } = res.data;
          setProviderNum(providerNum);
          setCustomerNum(customerNum);
          setServiceNum(serviceNum);
          setPaidThisMonth(paidThisMonth);
          setChangeRate(changeRate);
          setServiceRanking(providerTopTen);
          setCustomerRanking(customerTopTen);
        });
      } catch (e) {
        console.log(e.response.data);
        throw e;
      }
    };
    getMany();
  }, []);

  return (
    <Container
      style={{
        maxWidth: '90%',
      }}
    >
      <div className="grid grid-cols-3 gap-10">
        <CardDeck>
          <DashboardOverviewCard
            title="서비스 제공자"
            value={providerNum}
            valueTitle=""
            footerTitle=""
            footerValue=""
            footerIcon=""
          />
          <DashboardOverviewCard
            title="일반회원"
            value={customerNum}
            valueTitle=""
            footerTitle=""
            footerValue=""
            footerIcon=""
          />
          <DashboardOverviewCard
            title="등록된 서비스"
            value={serviceNum}
            valueTitle=""
            footerTitle=""
            footerValue=""
            footerIcon=""
          />
          <DashboardOverviewCard
            title="이번달 결제액"
            value={paidThisMonth}
            valueTitle=""
            footerTitle="전월대비"
            footerValue={changeRate ? changeRate : '전월 결제액이 없습니다.'}
            footerIcon={
              changeRate && changeRate > 0 ? 'caret-up' : 'caret-down'
            }
          />
        </CardDeck>
      </div>
      <TableDiv>
        <Row>
          <Col>
            <Ranking>서비스 판매량 Top 10</Ranking>
            <BootstrapTable
              keyField="index"
              classes="custom-table"
              data={serviceRanking}
              columns={serviceColumnHeader}
              remote={{ sort: true }}
              defaultSortDirection="asc"
              rowClasses="custom-tr"
              hover
              id="service-table"
              // rowEvents={rowEvents}
              rowStyle={{
                cursor: 'default',
              }}
            />
          </Col>
          <Col>
            <Ranking>서비스 구매 Top 10</Ranking>
            <BootstrapTable
              keyField="index"
              classes="custom-table"
              data={customerRanking}
              columns={customerColumHeader}
              remote={{ sort: true }}
              defaultSortDirection="asc"
              rowClasses="custom-tr"
              hover
              id="consumer-table"
              // rowEvents={rowEvents}
              rowStyle={{
                cursor: 'default',
              }}
            />
          </Col>
        </Row>
      </TableDiv>
    </Container>
  );
}
