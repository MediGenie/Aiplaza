import { FC, useLayoutEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { ApiError } from "../../../../apis/api-error";
import { orderApis } from "../../../../apis/order";
import {
  consumerServiceApis,
  GetServicePageResponse,
} from "../../../../apis/service";
import { LoadingIndicator } from "../../../../components/LoadingIndicator/LoadingIndicator";
import { PageViewer } from "../../../../components/PageEditor";
import { ReviewItem } from "../../../../components/ReviewItem";
import { SmallButton } from "../../../../components/SmallButton";
import { BlueCoin, Email, GrayBack, Rate, starfull } from "../../../../icons";
import { AlertModal } from "../../../../modals";
import { InquireModal } from "../../../../modals/InquireModal";

interface ServiceDetailProps {}

const ServiceDetail: FC<ServiceDetailProps> = () => {
  const params = useParams<"id">();
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<GetServicePageResponse | undefined>(
    undefined
  );
  const [openInquire, setOpenInquire] = useState(false);
  const navigate = useNavigate();

  const handleIamportCall = (
    mid: string,
    name: string,
    price: number,
    buyer_name: string,
    buyer_email: string
  ) => {
    const IMP = (window as any).IMP as any;
    if (!IMP) return;
    // FIXME: 계정 발급 시 정식 코드로 변경
    IMP.init("imp20017680");
    IMP.request_pay(
      {
        pg: "html5_inicis",
        merchant_uid: mid,
        name: name,
        amount: price,
        buyer_name: buyer_name,
        buyer_email: buyer_email,
      },
      (rsp: { success: boolean; imp_uid?: string; error_msg?: string }) => {
        if (rsp.success && rsp.imp_uid) {
          if (params.id) {
            consumerServiceApis
              .hasServiceTicket(params.id)
              .then((ticket_id) => {
                if (!!ticket_id) {
                  navigate(`/consumer/service/${params.id}/usage`, {
                    state: {
                      ticket_id,
                    },
                  });
                } else {
                  setError("이용권이 생성되지 않았습니다.");
                }
              })
              .catch((e: ApiError) => {
                setError(e.message);
              });
          }
        } else {
          setError(
            "결제에 실패하였습니다.\n내용 : " + rsp.error_msg || "알 수 없음"
          );
        }
      }
    );
  };

  const handlePaymentReady = () => {
    if (params.id) {
      orderApis
        .orderReady(params.id)
        .then((res) => {
          // IAMPORT 호출
          handleIamportCall(
            res.merchant_uid,
            res.product_name,
            res.price,
            res.buyer_name,
            res.buyer_email
          );
        })
        .catch((e: ApiError) => {
          setError(e.message);
        });
    }
  };

  const handleUse = () => {
    if (params.id) {
      consumerServiceApis
        .hasServiceTicket(params.id)
        .then((ticket_id) => {
          if (!!ticket_id) {
            navigate(`/consumer/service/${params.id}/usage`, {
              state: {
                ticket_id,
              },
            });
          } else {
            handlePaymentReady();
          }
        })
        .catch((e: ApiError) => {
          setError(e.message);
        });
    }
  };

  const handleInquiry = () => {
    setOpenInquire(true);
  };

  const handleNavigateBack = () => {
    navigate(-1);
  };

  useLayoutEffect(() => {
    let mounted = true;

    if (params.id) {
      consumerServiceApis
        .getServicePage(params.id)
        .then((res) => {
          if (mounted === true) {
            setData(res);
          }
        })
        .catch((e: ApiError) => {
          if (mounted === true) {
            setError(e.message);
          }
        });
    } else {
      setError("id 값이 존재하지 않습니다.");
    }
    return () => {
      mounted = false;
    };
  }, [params.id]);

  if (typeof params.id === "undefined") {
    return <Navigate to="/404" replace />;
  }

  if (data === undefined) {
    return (
      <div className="bg-gray50 py-20">
        <AlertModal
          open={typeof error === "string"}
          title="알림"
          message={error}
          onClose={() => {
            navigate("/provider/service");
          }}
        />
        <LoadingIndicator />
      </div>
    );
  }

  return (
    <div className="bg-gray50 py-20">
      <Helmet>
        <script
          type="text/javascript"
          src="https://code.jquery.com/jquery-1.12.4.min.js"
        ></script>
        <script
          type="text/javascript"
          src="https://cdn.iamport.kr/js/iamport.payment-1.2.0.js"
        ></script>
      </Helmet>
      <AlertModal
        open={typeof error === "string"}
        title="알림"
        message={error}
        onClose={() => {
          setError(null);
        }}
      />
      <InquireModal
        email={data.service_content.email as string}
        serviceTitle={data.service_content.title as string}
        open={openInquire}
        onClose={() => {
          setOpenInquire(false);
        }}
      />
      <div className="container-sm">
        <header className="flex justify-between items-center mb-10">
          <button
            className="w-10 h-10 bg-white rounded p-2"
            style={{ boxShadow: "0px 5px 18px 2px rgba(72, 72, 74, 0.1)" }}
            onClick={handleNavigateBack}
          >
            <img src={GrayBack} className="w-6 h-6" alt="뒤로가기" />
          </button>
          <div className="flex items-center space-x-2.5">
            <SmallButton
              type="button"
              onClick={handleInquiry}
              color="secondary"
            >
              문의하기
            </SmallButton>
            <SmallButton type="button" onClick={handleUse}>
              이용하기
            </SmallButton>
          </div>
        </header>
        <div className="bg-white border border-gray100 rounded p-10">
          <div className="flex  space-x-2.5 border-b border-gray100 pb-5">
            <img
              src={data.service_content.thumbnail}
              alt={data.service_content.title}
              style={{ width: 78, height: 78 }}
              className="object-cover object-center rounded-lg"
            />
            <div className="w-full max-w-[560px]">
              <h2 className="text-b1 font-semibold whitespace-pre-wrap break-words">
                {data.service_content.title}
              </h2>
              <p className="text-b3 text-gray600 whitespace-pre-wrap break-words">
                {data.service_content.description}
              </p>
            </div>
          </div>
          <div className="pt-5 space-y-2.5">
            <div className="flex space-x-2.5">
              <img src={Email} className="h-6" alt="이메일" />
              <p className="text-b3">{data.service_content.email}</p>
            </div>
            <div className="flex space-x-2.5">
              <img src={Rate} className="h-6" alt="평점" />
              <p className="text-b3">
                {data.service_content.average_rate.toFixed(1)}
              </p>
            </div>
            <div className="flex space-x-2.5">
              <img src={BlueCoin} className="h-6" alt="가격" />
              <p className="text-b3 font-bold text-blue500">
                {data.service_content.price.toLocaleString("ko-kr")}원
              </p>
            </div>
          </div>
        </div>
        <div className="overflow-auto">
          <div className="w-[730px]">
            <PageViewer
              templateId={data.page.template}
              value={data.page.data}
            />
          </div>
        </div>
        <div className="p-10 bg-white border border-gray100">
          <div className="flex items-center space-x-2.5 pb-5 border-b border-gray100 mb-5">
            <div className="flex items-center space-x-[5px]">
              <img src={starfull} alt="평점" className="h-6" />
              <p className="font-semibold text-b1">
                {data.service_content.average_rate.toFixed(1)}
              </p>
            </div>
            <div className="w-0.5 h-5 bg-gray200"></div>
            <p className="text-b1 font-semibold">
              {data.reviews.total}개의 리뷰
            </p>
          </div>
          <div className="space-y-10">
            {data.reviews.rows.length === 0 ? (
              <p className="font-medium text-b2">리뷰가 존재하지 않습니다.</p>
            ) : (
              data.reviews.rows.map((item) => {
                return <ReviewItem {...item} key={item._id} />;
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;
