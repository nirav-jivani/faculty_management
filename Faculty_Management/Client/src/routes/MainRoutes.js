import React, { lazy } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';

// project imports
import MainLayout from './../layout/MainLayout';
import Loadable from '../ui-component/Loadable';
import AuthGuard from './../utils/route-guard/AuthGuard';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('../views/dashboard/Default')));

// utilities routing
const UtilsTypography = Loadable(lazy(() => import('../views/utilities/Typography')));
const UtilsColor = Loadable(lazy(() => import('../views/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('../views/utilities/Shadow')));
const UtilsMaterialIcons = Loadable(lazy(() => import('../views/utilities/MaterialIcons')));
const form_elements = Loadable(lazy(() => import('../views/utilities/form_elements')));
const UtilsTablerIcons = Loadable(lazy(() => import('../views/utilities/TablerIcons')));
const cards = Loadable(lazy(() => import('../views/utilities/cards')));

// sample page routing
const EventConducted = Loadable(lazy(() => import('../views/events/event-conducted/EventConducted')));

const AddFaculty = Loadable(lazy(() => import('../views/admin/AddFaculty')));

const ViewFaculties = Loadable(lazy(() => import('../views/admin/ViewFaculties')));
// const PastFaculties = Loadable(lazy(() => import('../views/admin/PastFaculties')));
const Home = Loadable(lazy(() => import('../views/Home')));
const MyAccount = Loadable(lazy(() => import('../views/accounts/MyAccount')));
//-----------------------|| MAIN ROUTING ||-----------------------//

const MainRoutes = () => {
    const location = useLocation();

    return (
        <Route
            path={[
                '/dashboard/default',
                '/home/index',
                '/utils/util-typography',
                '/utils/util-color',
                '/utils/util-shadow',
                '/icons/tabler-icons',
                '/icons/form_elements',
                '/icons/material-icons',
                '/icons/cards',
                '/admin/add-faculty',
                '/admin/view-faculties',
                '/events/event-conducted',
                '/accounts/my-account'
            ]}
        >
            <MainLayout>
                <Switch location={location} key={location.pathname}>
                    <AuthGuard>
                        <Route path="/dashboard/default" component={DashboardDefault} />
                        <Route path="/utils/util-typography" component={UtilsTypography} />
                        <Route path="/utils/util-color" component={UtilsColor} />
                        <Route path="/utils/util-shadow" component={UtilsShadow} />
                        <Route path="/icons/tabler-icons" component={UtilsTablerIcons} />
                        <Route path="/icons/material-icons" component={UtilsMaterialIcons} />
                        <Route path="/icons/form_elements" component={form_elements} />
                        <Route path="/icons/cards" component={cards} />
                        <Route path="/admin/add-faculty" component={AddFaculty} />
                        <Route path="/admin/view-faculties" component={ViewFaculties} />
                        <Route path="/events/event-conducted" component={EventConducted} />
                        <Route path="/home/index" component={Home} />
                        <Route path="/accounts/my-account" component={MyAccount} />
                    </AuthGuard>
                </Switch>
            </MainLayout>
        </Route>
    );
};

export default MainRoutes;
