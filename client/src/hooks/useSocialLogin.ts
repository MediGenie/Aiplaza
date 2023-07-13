import { useLayoutEffect } from "react";
import { UserType } from "../auth/type";
import { config } from "../config";
import { SocialType } from "../types/social.type";

const POPUP_OPTION =
  "top=100, left=300, width=500, height=600, toolbar=no, menubar=no, location=no, status=no, scrollbars=no, resizable=no";

export function useSocialLogin(
  onSuccess?: (opts: {
    id: string;
    type: SocialType;
    account_type: "provider" | "consumer";
    email?: string;
  }) => void
) {
  const socialPopupOpen = (account_type: UserType, type: SocialType) => {
    if (window) {
      const url = `http://${
        config.BASE_API_URL
      }/auth/sign-in/${account_type.toLowerCase()}/${type}`;
      window.open(url, "소셜 로그인", POPUP_OPTION);
    }
  };

  useLayoutEffect(() => {
    if (window) {
      let mounted = true;
      const socialLoginCallback = (
        event: MessageEvent<{
          type: string;
          data: {
            id: string;
            type: SocialType;
            account_type: "provider" | "consumer";
            email?: string;
          };
        }>
      ) => {
        if (event?.data?.type === "social_login_callback" && mounted === true) {
          const { id, type, account_type, email } = event.data.data;

          if (window) {
            onSuccess &&
              onSuccess({
                id: id,
                type: type,
                account_type: account_type,
                email: email,
              });
          }
        }
      };
      window.addEventListener("message", socialLoginCallback, false);
      return () => {
        mounted = false;
        if (window) {
          window.removeEventListener("message", socialLoginCallback, false);
        }
      };
    }
  }, [onSuccess]);

  return {
    socialPopupOpen,
  };
}
