import { IconExternalLink } from '@tabler/icons-react';
import { useContext ,useEffect ,useState} from 'react';

import { useTranslation } from 'next-i18next';

import { OpenAIModel,OpenAIRole } from '@/types/openai';

import HomeContext from '@/pages/api/home/home.context';

import { ROLE_ID, AZURE_DEPLOYMENT_ID } from '@/utils/app/const';

export const RoleSelect = () => {
	const [dropdownData, setDropdownData] = useState([]);
	
	useEffect(() => {
	  // 异步获取数据的逻辑
	  const fetchData = async () => {
	    try {
			
			// request('https://fun.n2book.com/api/role?id=6527d9bd8b0da4ca0847a81b', function (error:string, response:any, data:any) {
			//   //如果请求成功则打印数据 否则显示错误信息
			//   if (!error && response.statusCode == 200) {
			//     console.log(data.data);
			// 	homeDispatch({
			// 	  field: 'roles',
			// 	  value: data.data,
			// 	});
			//   }else {
			//     console.log(error);
			//     console.log(response.statusCode);
			//   }
			// });
			
	      // const response = await fetch("https://fun.n2book.com/api/role?id="+process.env.ROLE_ID); // 替换为你的API地址
		  // const response = await fetch("https://fun.n2book.com/api/role?id=6527d9bd8b0da4ca0847a81b", {
		  //   method: 'get',
		  //   headers: {
		  //     'Content-Type': 'application/json',
		  //   },
		  // });
		  // console.log(process.env.AZURE_DEPLOYMENT_ID)
		  
		  // const response = await axios.get("https://fun.n2book.com/api/role?id=6527d9bd8b0da4ca0847a81b");
	   //    const data = await response;
	   //    // setDropdownData(data); // 将获取的数据存储到状态变量中
		  // homeDispatch({
		  //   field: 'roles',
		  //   value: data,
		  // });
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
      <div className="w-full rounded-lg border border-neutral-200 bg-transparent pr-2 text-neutral-900 dark:border-neutral-600 dark:text-white">
        <select
          className="w-full bg-transparent p-2"
          placeholder={t('Select a role') || ''}
          value={selectedConversation?.model?.id || defaultRoleId}
          onChange={handleChange}
        >
          {roles.map((role) => (
            <option
              key={role.id}
              value={role.id}
              className="dark:bg-[#343541] dark:text-white"
            >
              {role.id === defaultRoleId
                ? `Default (${role.role})`
                : role.role}
            </option>
          ))}
        </select>
      </div>
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
