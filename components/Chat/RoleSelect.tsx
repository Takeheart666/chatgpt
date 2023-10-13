import { IconExternalLink } from '@tabler/icons-react';
import { useContext ,useEffect ,useState} from 'react';
import { useQuery } from 'react-query';

import { useTranslation } from 'next-i18next';

import { OpenAIModel,OpenAIRole } from '@/types/openai';

import HomeContext from '@/pages/api/home/home.context';

import { ROLE_ID, AZURE_DEPLOYMENT_ID } from '@/utils/app/const';
import n2bookApiService from '@/services/n2bookApiService';

export const RoleSelect = () => {
	const [dropdownData, setDropdownData] = useState([]);
	
	const { getRoles } = n2bookApiService();
	
	useEffect(() => {
	  // 异步获取数据的逻辑
	  const fetchData = async () => {
	    try {
			const { data:roleData, error:errorObj, refetch:refetchObj } = useQuery(
			  ['GetRoles'],
			  ({ signal }) => {
			    return getRoles(
			      {
			        key: '12',
			      },
			      signal,
			    );
			  },
			  { enabled: true, refetchOnMount: false },
			);
			({ field: 'roles', value: roleData });
			console.log(roles)
	    } catch (error) {
	      console.error('Failed to fetch dropdown data:', error);
	    }
	  };
	
	  fetchData();
	}, []);
	
  const { t } = useTranslation('chat');

  const {
    state: { selectedConversation, models, roles, defaultModelId,defaultRoleId },
    handleUpdateConversation,
    dispatch: homeDispatch,
  } = useContext(HomeContext);
  
  

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    selectedConversation &&
      handleUpdateConversation(selectedConversation, {
        key: 'role',
        value: roles.find(
          (model) => model.id === e.target.value,
        ) as OpenAIRole,
      });
  };

  return (
    <div className="flex flex-col">
      <label className="mb-2 text-left text-neutral-700 dark:text-neutral-400">
        {t('Role')}
      </label>
      
      <div className="w-full mt-3 text-left text-neutral-700 dark:text-neutral-400 flex items-center">
        <a
          href="https://platform.openai.com/account/usage"
          target="_blank"
          className="flex items-center"
        >
          <IconExternalLink size={18} className={'inline mr-1'} />
          {t('View Account Usage')}
        </a>
      </div>
    </div>
  );
};
