// assets
import { IconPlus, IconList, IconNews } from '@tabler/icons';

// constant
const icons = {
    IconPlus: IconPlus,
    IconList: IconList,
    IconNews: IconNews
};
//-----------------------|| UTILITIES MENU ITEMS ||-----------------------//

export const Publications = {
    id: 'publications',
    title: 'Publications',
    userType: 'Faculty',
    type: 'group',
    children: [
        {
            id: 'research-paper',
            title: 'Reserch Paper',
            type: 'collapse',
            icon: icons['IconNews'],
            breadcrumbs: false,
            children: [
                {
                    id: 'add-research-paper',
                    title: 'Add Research Paper',
                    type: 'item',
                    url: '/publications/add-research-paper',
                    icon: icons['IconPlus']
                },
                {
                    id: 'view-conferences',
                    title: 'View Conferences',
                    type: 'item',
                    url: '/publications/view-conferences',
                    icon: icons['IconList']
                },
                {
                    id: 'view-journals',
                    title: 'View Journals',
                    type: 'item',
                    url: '/publications/view-journals',
                    icon: icons['IconList']
                }
            ]
        }
    ]
};
