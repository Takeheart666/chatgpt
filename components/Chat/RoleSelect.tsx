import { IconExternalLink } from '@tabler/icons-react';
import {
  FC,
  KeyboardEvent,
  useCallback,
  useEffect,
  useRef,
  useContext,
  useState,
} from 'react';

import { useTranslation } from 'next-i18next';

import { OpenAIModel,OpenAIRole } from '@/types/openai';

import HomeContext from '@/pages/api/home/home.context';

import { Conversation } from '@/types/chat';

import { ROLE_ID, AZURE_DEPLOYMENT_ID } from '@/utils/app/const';


import { DEFAULT_SYSTEM_PROMPT } from '@/utils/app/const';

import { Prompt } from '@/types/prompt';

import { PromptList } from './PromptList';


interface Props {
  conversation: Conversation;
  prompts: Prompt[];
  onChangePrompt: (prompt: string) => void;
}
export const RoleSelect: FC<Props> = ({
  conversation,
  prompts,
  onChangePrompt,
}) => {
	
	const [value, setValue] = useState<string>('');
	
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
		setValue(roleContent);
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
    </div>
  );
};
