import { FC, useLayoutEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { consumerServiceApis } from '../../../apis/service';
import { useHideFooter } from '../../../hooks/useHideFooter';
import { useRouteState } from '../../../hooks/useRouteState';

interface WaitingProps {}

const Waiting: FC<WaitingProps> = () => {
  const routeState = useRouteState<{ ticket_id: string }>();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    if (routeState.ticket_id) {
      const interval = setInterval(() => {
        consumerServiceApis
          .checkServiceResult(routeState.ticket_id)
          .then((hasResult) => {
            if (hasResult === true) {
              clearInterval(interval);
              // TODO: 라우트가 변경될 수 있음
              navigate('/consumer/request');
            }
          })
          .catch(() => {
            // NOTHING
          });
      }, 5000);
      return () => {
        clearInterval(interval);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [routeState.ticket_id]);

  useHideFooter();

  if (!routeState.ticket_id) {
    return <Navigate to="/consumer/service" replace />;
  }

  return (
    <div
      className="w-full bg-gray50 flex items-center justify-center"
      style={{ height: 'calc(100vh - 60px)' }}
    >
      <div>
        <div className="flex space-x-10 justify-center items-center">
          <div
            className="w-3 h-3 rounded-full bg-blue500 animate-pulse"
            style={{ animationDuration: '1200ms' }}
          ></div>
          <div
            className="w-5 h-5 rounded-full bg-blue500 animate-pulse"
            style={{
              animationDuration: '1200ms',
              animationDelay: '400ms',
            }}
          ></div>
          <div
            className="w-3 h-3 rounded-full bg-blue500 animate-pulse"
            style={{ animationDuration: '1200ms', animationDelay: '800ms' }}
          ></div>
        </div>
        <h1 className="text-h2 font-bold mt-10">지금 결과를 분석중입니다.</h1>
      </div>
    </div>
  );
};

export default Waiting;
