import { FC } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useUserType } from '../../auth/hooks';
import { UserType } from '../../auth/type';

interface UserTypeFilterProps {
  userType: UserType[];
  redirect: string;
}

export const UserTypeFilter: FC<UserTypeFilterProps> = ({
  redirect,
  userType,
}) => {
  const type = useUserType();
  const isValid = userType.includes(type);

  if (isValid) {
    return <Outlet />;
  }

  return <Navigate to={redirect} replace />;
};
