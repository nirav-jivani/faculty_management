import React, { lazy, useState } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';

// project imports
import MainLayout from './../layout/MainLayout';
import Loadable from '../ui-component/Loadable';
import AuthGuard from './../utils/route-guard/AuthGuard';
import MyAlert from './../ui-component/MyAlert';

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
const ViewEventsForAttended = Loadable(lazy(() => import('../views/events/event-attended/ViewEvents')));

const AddOrUpdateEventForAttended = Loadable(lazy(() => import('../views/events/event-attended/AddOrUpdateEvent')));

const ViewEventsForConducted = Loadable(lazy(() => import('../views/events/event-conducted/ViewEvents')));

const AddOrUpdateEventForConducted = Loadable(lazy(() => import('../views/events/event-conducted/AddOrUpdateEvent')));

const ViewEventsForOrganized = Loadable(lazy(() => import('../views/events/event-organized/ViewEvents')));

const AddOrUpdateEventForOrganized = Loadable(lazy(() => import('../views/events/event-organized/AddOrUpdateEvent')));

const AddOrUpdateFaculty = Loadable(lazy(() => import('../views/admin/AddOrUpdateFaculty')));

const ViewFaculties = Loadable(lazy(() => import('../views/admin/ViewFaculties')));
// const PastFaculties = Loadable(lazy(() => import('../views/admin/PastFaculties')));
const Home = Loadable(lazy(() => import('../views/Home')));
const MyAccount = Loadable(lazy(() => import('../views/accounts/MyAccount')));
//-----------------------|| MAIN ROUTING ||-----------------------//

const MainRoutes = () => {
    const location = useLocation();
    const [alertMessage, setAlertMessage] = useState('');

    // location.state = null;
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
                '/admin/edit-faculty',
                '/admin/view-faculties',
                '/event-attended/add-event',
                '/event-attended/view-events',
                '/event-attended/update-event',
                '/event-conducted/add-event',
                '/event-conducted/view-events',
                '/event-conducted/update-event',
                '/event-organized/add-event',
                '/event-organized/view-events',
                '/event-organized/update-event',

                '/accounts/my-account'
            ]}
        >
            {alertMessage !== '' && <MyAlert message={alertMessage} setMessage={setAlertMessage} />}
            <MainLayout>
                <Switch location={location} key={location.pathname}>
                    <AuthGuard>
                        <Route path="/dashboard/default" render={DashboardDefault} />
                        <Route path="/utils/util-typography" render={UtilsTypography} />
                        <Route path="/utils/util-color" render={UtilsColor} />
                        <Route path="/utils/util-shadow" render={UtilsShadow} />
                        <Route path="/icons/tabler-icons" render={UtilsTablerIcons} />
                        <Route path="/icons/material-icons" render={UtilsMaterialIcons} />
                        <Route path="/icons/form_elements" render={form_elements} />
                        <Route path="/icons/cards" render={cards} />
                        <Route path="/admin/add-faculty" render={() => <AddOrUpdateFaculty setAlertMessage={setAlertMessage} />} />
                        <Route path="/admin/edit-faculty" render={() => <AddOrUpdateFaculty setAlertMessage={setAlertMessage} />} />
                        <Route path="/admin/view-faculties" render={() => <ViewFaculties setAlertMessage={setAlertMessage} />} />
                        <Route
                            path="/event-attended/add-event"
                            render={() => <AddOrUpdateEventForAttended setAlertMessage={setAlertMessage} />}
                        />
                        <Route
                            path="/event-attended/update-event"
                            render={() => <AddOrUpdateEventForAttended setAlertMessage={setAlertMessage} />}
                        />
                        <Route path="/event-attended/view-events" render={ViewEventsForAttended} />

                        <Route
                            path="/event-conducted/add-event"
                            render={() => <AddOrUpdateEventForConducted setAlertMessage={setAlertMessage} />}
                        />
                        <Route
                            path="/event-conducted/update-event"
                            render={() => <AddOrUpdateEventForConducted setAlertMessage={setAlertMessage} />}
                        />
                        <Route path="/event-conducted/view-events" render={ViewEventsForConducted} />

                        <Route
                            path="/event-organized/add-event"
                            render={() => <AddOrUpdateEventForOrganized setAlertMessage={setAlertMessage} />}
                        />
                        <Route
                            path="/event-organized/update-event"
                            render={() => <AddOrUpdateEventForOrganized setAlertMessage={setAlertMessage} />}
                        />
                        <Route path="/event-organized/view-events" render={ViewEventsForOrganized} />
                        <Route path="/home/index" render={Home} />
                        <Route path="/accounts/my-account" render={() => <MyAccount setAlertMessage={setAlertMessage} />} />
                    </AuthGuard>
                </Switch>
            </MainLayout>
        </Route>
    );
};

export default MainRoutes;
