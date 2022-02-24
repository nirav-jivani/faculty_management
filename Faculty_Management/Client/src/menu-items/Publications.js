// assets
import {
    IconPlus, IconList, IconNews
} from '@tabler/icons';

// constant
const icons = {
    IconPlus : IconPlus,
    IconList : IconList,
    IconNews : IconNews
};
//-----------------------|| UTILITIES MENU ITEMS ||-----------------------//

export const Publications = {
    id: 'publications',
    title: 'Publications',
    userType: 'Normal',
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
                    id: 'view-research-papers',
                    title: 'View Research Paper',
                    type: 'item',
                    url: '/publications/view-research-papers',
                    icon: icons['IconList']
                }
            ]
        }
    ]
};
