// assets
import { IconCalendarEvent, IconPlus, IconList } from '@tabler/icons';

// constant
const icons = {
    IconCalendarEvent: IconCalendarEvent,
    IconPlus: IconPlus,
    IconList : IconList
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
                    icon: icons['IconPlus']
                },
                {
                    id: 'view-events',
                    title: 'View Events',
                    type: 'item',
                    url: '/event-attended/view-events',
                    icon: icons['IconList']
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
                    icon: icons['IconPlus']
                },
                {
                    id: 'view-event',
                    title: 'View Event',
                    type: 'item',
                    url: '/events/event-attended',
                    icon: icons['IconList']
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
                    icon: icons['IconPlus']
                },
                {
                    id: 'view-event',
                    title: 'View Event',
                    type: 'item',
                    url: '/events/event-attended',
                    icon: icons['IconList']
                }
            ]
        }
    ]
};
