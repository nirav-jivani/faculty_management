// assets
import { IconUser } from '@tabler/icons';

// constant
const icons = {
    IconUser
};

//-----------------------|| DASHBOARD MENU ITEMS ||-----------------------//

export const Accounts = {
    id: 'account',
    title: 'Manage Account',
    type: 'group',
    userType: 'Normal',
    children: [
        {
            id: 'my-account',
            title: 'My Account',
            type: 'item',
            url: '/accounts/my-account',
            icon: icons['IconUser']
        }
    ]
};
