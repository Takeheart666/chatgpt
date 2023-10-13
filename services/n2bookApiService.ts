import { useCallback } from 'react';

import { useFetch } from '@/hooks/useFetch';

export interface GetRolesRequestProps {
  key: string;
}

const n2bookApiService = () => {
  const fetchService = useFetch();

  // const getModels = useCallback(
  // 	(
  // 		params: GetManagementRoutineInstanceDetailedParams,
  // 		signal?: AbortSignal
  // 	) => {
  // 		return fetchService.get<GetManagementRoutineInstanceDetailed>(
  // 			`/v1/ManagementRoutines/${params.managementRoutineId}/instances/${params.instanceId
  // 			}?sensorGroupIds=${params.sensorGroupId ?? ''}`,
  // 			{
  // 				signal,
  // 			}
  // 		);
  // 	},
  // 	[fetchService]
  // );

  const getRoles = useCallback(
    (params: GetRolesRequestProps, signal?: AbortSignal) => {
      return fetchService.get(`https://fun.n2book.com/api/role?id=6527d9bd8b0da4ca0847a81b`, {
		  headers: {
		    'Content-Type': 'application/json',
		  },
	  });
    },
    [fetchService],
  );

  return {
    getRoles,
  };
};

export default n2bookApiService;
