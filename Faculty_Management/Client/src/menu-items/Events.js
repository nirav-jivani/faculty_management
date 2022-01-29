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
    id: 'events',
    title: 'Events',
    type: 'group',
    children: [
        {
            id: 'event-conducted',
            title: 'Event Conducted',
            type: 'collapse',
            icon: icons['IconCalendarEvent'],
            children: [
                {
                    id: 'Event',
                    title: 'View Events',
                    type: 'item',
                    url: '/events/event-conducted',
                    breadcrumbs: false
                }
                // {
                //     id: 'Expert_Lectures',
                //     title: 'Expert_Lectures',
                //     type: 'item',
                //     url: '/events/event-conducted',
                //     breadcrumbs: false
                // },
                // {
                //     id: 'Seminars',
                //     title: 'Seminars',
                //     type: 'item',
                //     url: '/events/event-conducted',
                //     breadcrumbs: false
                // }
            ]
        },
        {
            id: 'event-organized',
            title: 'Event Organized',
            type: 'collapse',
            icon: icons['IconCalendarEvent'],
            children: []
        },
        {
            id: 'event-attended',
            title: 'Event Attended',
            type: 'collapse',
            icon: icons['IconCalendarEvent'],
            children: []
        }
    ]
};
