import { IconExternalLink } from '@tabler/icons-react';
import { useContext ,useEffect ,useState} from 'react';

import { useTranslation } from 'next-i18next';

import { OpenAIModel,OpenAIRole } from '@/types/openai';

import HomeContext from '@/pages/api/home/home.context';

import { ROLE_ID, AZURE_DEPLOYMENT_ID } from '@/utils/app/const';


export const RoleSelect = () => {
	const [dropdownData, setDropdownData] = useState([]);
	
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
          (model) => model._id === e.target.value,
        ) as OpenAIRole,
      });
  };
	
	const onAlert = (roleTag:any) => {
	  // 在这里可以使用 roleTag 做你想要的操作
	  alert(roleTag);
	};
	
			
  return (
    <div className="flex flex-col">
      
      <div>
        
        {roles.map((role) => (
			<button key={role._id}
			  className="ml-2 cursor-pointer hover:opacity-50 broder:1px solid"
			  onClick={() => onAlert(role.tag)}
			>
			  {role.tag}
			</button>
			
			
        ))}
		  
      </div>
    </div>
  );
};
