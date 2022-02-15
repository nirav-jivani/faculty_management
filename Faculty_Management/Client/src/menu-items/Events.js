// assets
import { IconCalendarEvent, IconDashboard, IconDeviceAnalytics } from '@tabler/icons';

// constant
const icons = {
    IconCalendarEvent: IconCalendarEvent,
    IconDashboard: IconDashboard,
    IconDeviceAnalytics
};

//-----------------------|| DASHBOARD MENU ITEMS ||-----------------------//

export const Events = {
    id: 'profile',
    title: 'Profile',
    type: 'group',
    userType: 'Normal',
    children: [
        {
            id: 'event-attended',
            title: 'Event Attended',
            type: 'item',
            url: '/events/event-attended',
            icon: icons['IconCalendarEvent'],
            children: []
        },
        {
            id: 'event-conducted',
            title: 'Event Conducted',
            type: 'item',
            icon: icons['IconCalendarEvent'],
            children: []
        },
        {
            id: 'event-organized',
            title: 'Event Organized',
            type: 'item',
            icon: icons['IconCalendarEvent'],
            children: []
        }
    ]
};
