// assets
import {
    IconCalendarEvent,
    IconBrandFramer,
    IconTypography,
    IconPalette,
    IconShadow,
    IconWindmill,
    IconLayoutGridAdd
} from '@tabler/icons';

// constant
const icons = {
    IconCalendarEvent: IconCalendarEvent,
    IconTypography: IconTypography,
    IconPalette: IconPalette,
    IconShadow: IconShadow,
    IconWindmill: IconWindmill,
    IconBrandFramer: IconBrandFramer,
    IconLayoutGridAdd: IconLayoutGridAdd
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
            title: 'Reserch paper',
            type: 'collapse',
            url: '/utils/util-typography',
            icon: icons['IconTypography'],
            breadcrumbs: false,
            children: []
        }
    ]
};
