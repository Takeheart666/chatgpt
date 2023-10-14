import { IconExternalLink } from '@tabler/icons-react';
import { useContext ,useEffect ,useState} from 'react';

import { useTranslation } from 'next-i18next';

import { OpenAIModel,OpenAIRole } from '@/types/openai';

import HomeContext from '@/pages/api/home/home.context';

import { ROLE_ID, AZURE_DEPLOYMENT_ID } from '@/utils/app/const';


export const RoleSelect = () => {
	const [dropdownData, setDropdownData] = useState([]);
	
	let prompt =123123123
	
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
	
	const onAlert = (roleContent:any) => {
	  // 在这里可以使用 roleTag 做你想要的操作
	  prompt = roleContent;
	  console.log(prompt)
	};
	
			
  return (
    <div className="flex flex-col">
      
        <div>
			{roles.map((role) => (
				<button key={role._id}
				  className="ml-2 cursor-pointer hover:opacity-50 broder:1px solid"
				  onClick={() => onAlert(role.content)}
				>
				  {role.tag}
				</button>
				
				
			))}
		</div>
		
		
		<label className="mb-2 text-left text-neutral-700 dark:text-neutral-400">
		  {t('System Prompt')}
		</label>
		<textarea
		  className="w-full rounded-lg border border-neutral-200 bg-transparent px-4 py-3 text-neutral-900 dark:border-neutral-600 dark:text-neutral-100"
		  style={{
		    resize: 'none',
		    maxHeight: '300px',
		  }}
		  placeholder={
		    t(`Enter a prompt or type "/" to select a prompt...`) || ''
		  }
		  value={prompt}
		/>
    </div>
  );
};
