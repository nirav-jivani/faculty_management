import React, { lazy, useState} from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';

// project imports
import GuestGuard from './../utils/route-guard/GuestGuard';
import AuthGuard from './../utils/route-guard/AuthGuard';
import MinimalLayout from './../layout/MinimalLayout';
import NavMotion from './../layout/NavMotion';
import Loadable from '../ui-component/Loadable';
import MyAlert from './../ui-component/MyAlert';

// login routing
const Index = Loadable(lazy(() => import('../views/accounts')));

//-----------------------|| AUTH ROUTING ||-----------------------//

const LoginRoutes = () => {
    const location = useLocation();
    const [alertMessage, setAlertMessage] = useState('');

    return (
        <Route path={['/login', '/change-password']}>
            <MinimalLayout>
                {alertMessage !== '' && <MyAlert message={alertMessage} setMessage={setAlertMessage} />}
                <Switch location={location} key={location.pathname}>
                    <NavMotion>
                        <GuestGuard>
                            <Route path="/login" render={Index} />
                            <AuthGuard>
                                <Route path="/change-password" render={() => <Index setAlertMessage={setAlertMessage} />} />
                            </AuthGuard>
                        </GuestGuard>
                    </NavMotion>
                </Switch>
            </MinimalLayout>
        </Route>
    );
};

export default LoginRoutes;
