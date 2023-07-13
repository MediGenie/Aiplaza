import Axios from 'axios';
import { useQuery } from 'react-query';

export default function useGetDepartmentList() {
  const { data: departmentList = [] } = useQuery('@department-category', () => {
    return Axios.get('/expert/category').then((res) => {
      return res.data?.category || [];
    });
  });
  return departmentList;
}
