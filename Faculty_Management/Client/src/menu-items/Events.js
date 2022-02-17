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
            type: 'collapse',
            icon: icons['IconCalendarEvent'],
            children: [
                {
                    id: 'add-event',
                    title: 'Add Event',
                    type: 'item',
                    url: '/event-attended/add-event',
                    icon: icons['IconCalendarEvent']
                },
                {
                    id: 'view-events',
                    title: 'View Events',
                    type: 'item',
                    url: '/event-attended/view-events',
                    icon: icons['IconCalendarEvent']
                }
            ]
        },
        {
            id: 'event-conducted',
            title: 'Event Conducted',
            type: 'collapse',
            icon: icons['IconCalendarEvent'],
            children: [
                {
                    id: 'add-event',
                    title: 'Add Event',
                    type: 'item',
                    url: '/events/event-attended',
                    icon: icons['IconCalendarEvent']
                },
                {
                    id: 'view-event',
                    title: 'View Event',
                    type: 'item',
                    url: '/events/event-attended',
                    icon: icons['IconCalendarEvent']
                }
            ]
        },
        {
            id: 'event-organized',
            title: 'Event Organized',
            type: 'collapse',
            icon: icons['IconCalendarEvent'],
            children: [
                {
                    id: 'add-event',
                    title: 'Add Event',
                    type: 'item',
                    url: '/events/event-attended',
                    icon: icons['IconCalendarEvent']
                },
                {
                    id: 'view-event',
                    title: 'View Event',
                    type: 'item',
                    url: '/events/event-attended',
                    icon: icons['IconCalendarEvent']
                }
            ]
        }
    ]
};
