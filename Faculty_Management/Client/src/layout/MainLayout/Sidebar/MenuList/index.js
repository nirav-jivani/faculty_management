import React from 'react';

// material-ui
import { Typography } from '@material-ui/core';

// project imports
import NavGroup from './NavGroup';
import menuItem from './../../../../menu-items';

import { useSelector } from 'react-redux';
//-----------------------|| SIDEBAR MENU LIST ||-----------------------//

const MenuList = () => {
    const account = useSelector((state) => state.account);
    const navItems = menuItem.items.map((item) => {
        if (account.user.Roles.includes(item.userType) || item.userType === 'All' || account.user.Roles.includes('Admin')) {
            switch (item.type) {
                case 'group':
                    return <NavGroup key={item.id} item={item} />;
                default:
                    return (
                        <Typography key={item.id} variant="h6" color="error" align="center">
                            Menu Items Error
                        </Typography>
                    );
            }
        }
    });

    return navItems;
};

export default MenuList;
