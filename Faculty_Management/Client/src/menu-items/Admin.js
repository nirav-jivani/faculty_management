// assets
import { IconUserPlus, IconUsers } from '@tabler/icons';

// constant
const icons = {
    IconUserPlus: IconUserPlus,
    IconUsers: IconUsers
};

//-----------------------|| DASHBOARD MENU ITEMS ||-----------------------//

export const Admin = {
    id: 'manage-faculty',
    title: 'Manage Faculty Details',
    type: 'group',
    userType: 'FacultyManagementAdmin',
    children: [
        {
            id: 'add-faculty',
            title: 'Add Faculty',
            type: 'item',
            url: '/admin/add-faculty',
            icon: icons['IconUserPlus']
        },
        {
            id: 'view-faculties',
            title: 'View Faculties',
            type: 'item',
            url: '/admin/view-faculties',
            icon: icons['IconUsers']
        }
    ]
};
