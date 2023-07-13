import { Dialog, Transition } from "@headlessui/react";
import { FC, Fragment, useState } from "react";
import { Button } from "../components/Button";
import { InputArea } from "../components/InputArea";
import { Rating } from "react-simple-star-rating";
import { mypageApis } from "../apis/mypage";
import { useNavigate } from "react-router-dom";

interface ReviewModalProps {
  paymentId: string;
  serviceName: string;
  open?: boolean;
}

export const ReviewModal: FC<ReviewModalProps> = ({
  paymentId,
  serviceName,
  open,
}) => {
  console.log(paymentId);

  const navigate = useNavigate();
  const [ratingValue, setRatingValue] = useState(0);
  const [review, setReview] = useState("");
  const [alert, setAlert] = useState(false);
  const handleClose = async () => {
    if (ratingValue !== 0 && review !== "") {
      await mypageApis.review(paymentId, ratingValue, review);
      navigate(0);
    } else {
      setAlert(true);
    }
  };
  const handleRating = (rate: number) => {
    setRatingValue(rate);
  };

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative z-modal" onClose={handleClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="max-w-[730px] mx-auto w-full transform overflow-hidden rounded-[5px] bg-white p-10 text-center align-middle shadow-1 transition-all">
                <Dialog.Title className="text-b1 font-medium text-center text-blue500">
                  {serviceName}
                </Dialog.Title>
                <div className="mt-[5px] font-semibold">리뷰작성</div>
                <div className="mt-5">
                  <div className="">
                    <Rating
                      onClick={handleRating}
                      transition
                      allowFraction
                      size={24}
                      SVGclassName="inline-block"
                    />
                  </div>
                </div>
                <InputArea
                  value={review}
                  onChange={(e) => {
                    setReview(e.target.value);
                  }}
                  className="mt-2.5 w-full h-[240px] placeholder:text-gray400 placeholder:text-b3"
                  placeholder="리뷰를 입력해 주세요."
                />
                <div className="mt-[30px]">
                  <Button
                    type="button"
                    className="w-full"
                    onClick={handleClose}
                  >
                    리뷰등록
                  </Button>
                </div>
                {alert && (
                  <p className="text-left text-b4 text-warning">
                    평점과 리뷰를 입력해주세요.
                  </p>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
