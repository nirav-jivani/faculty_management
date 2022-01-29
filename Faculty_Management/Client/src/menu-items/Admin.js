// assets
import { IconCalendarEvent, IconDashboard, IconDeviceAnalytics } from '@tabler/icons';

// constant
const icons = {
    IconCalendarEvent: IconCalendarEvent,
    IconDashboard: IconDashboard,
    IconDeviceAnalytics
};

//-----------------------|| DASHBOARD MENU ITEMS ||-----------------------//

export const Admin = {
    id: 'manage-faculty',
    title: 'Manage Faculty Details',
    type: 'group',
    userType: 'Admin',
    children: [
        {
            id: 'add-faculty',
            title: 'Add Faculty',
            type: 'item',
            url: '/admin/add-faculty',
            icon: icons['IconCalendarEvent']
        },
        {
            id: 'view-faculties',
            title: 'View Faculties',
            type: 'item',
            url: '/admin/view-faculties',
            icon: icons['IconCalendarEvent']
        }
    ]
};
