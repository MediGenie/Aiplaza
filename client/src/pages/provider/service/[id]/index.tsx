import { FC, useLayoutEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { ApiError } from "../../../../apis/api-error";
import {
  GetServicePageResponse,
  providerServiceApis,
} from "../../../../apis/service";
import { LoadingIndicator } from "../../../../components/LoadingIndicator/LoadingIndicator";
import { PageViewer } from "../../../../components/PageEditor";
import { ReviewItem } from "../../../../components/ReviewItem";
import { SmallButton } from "../../../../components/SmallButton";
import { BlueCoin, Email, GrayBack, Rate, starfull } from "../../../../icons";
import { AlertModal } from "../../../../modals";

interface ServiceDetailProps {}

const ServiceProviderDetail: FC<ServiceDetailProps> = () => {
  const params = useParams<"id">();
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<GetServicePageResponse | undefined>(
    undefined
  );
  const navigate = useNavigate();
  const handleNavigateEdit = () => {
    if (params.id) {
      navigate(`/provider/service/${params.id}/edit`);
    }
  };
  const handleNavigateResult = () => {
    if (params.id) {
      navigate(`/provider/service/${params.id}/result`);
    }
  };
  const handleNavigateBack = () => {
    navigate(-1);
  };

  useLayoutEffect(() => {
    let mounted = true;

    if (params.id) {
      providerServiceApis
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
      <AlertModal
        open={typeof error === "string"}
        title="알림"
        message={error}
        onClose={() => {
          navigate("/provider/service");
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
              color="secondary"
              onClick={handleNavigateResult}
            >
              결과보기
            </SmallButton>
            <SmallButton type="button" onClick={handleNavigateEdit}>
              수정
            </SmallButton>
          </div>
        </header>
        <div className="bg-white border border-gray100 rounded p-10">
          <div className="flex space-x-2.5 border-b border-gray100 pb-5">
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

export default ServiceProviderDetail;
