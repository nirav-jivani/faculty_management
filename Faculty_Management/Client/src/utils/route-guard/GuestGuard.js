import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, useLocation } from 'react-router-dom';

// project imports
import config from '../../config';

//-----------------------|| GUEST GUARD ||-----------------------//

/**
 * Guest guard for routes having no auth required
 * @param {PropTypes.node} children children element/node
 */
const GuestGuard = ({ children }) => {
    const account = useSelector((state) => state.account);
    const location = useLocation();
    const { isLoggedIn } = account;

    if (isLoggedIn && location.pathname !== '/change-password') {
        return <Redirect to={config.defaultPath} />;
    }

    return children;
};

GuestGuard.propTypes = {
    children: PropTypes.node
};

export default GuestGuard;
