import React from 'react';
import { Link, useLocation } from 'react-router-dom';

// material-ui
import { useTheme } from '@material-ui/core';
import { Divider, Grid, Stack, Typography, useMediaQuery } from '@material-ui/core';

// project imports
import AuthWrapper from './AuthWrapper';
import AuthCardWrapper from './AuthCardWrapper';
import Login from './Login';
import ChangePassword from './ChangePassword';
import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword';

//================================|| LOGIN MAIN ||================================//

const Index = (props) => {
    const theme = useTheme();
    const location = useLocation();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <AuthWrapper>
            <Grid container direction="column" justifyContent="flex-end" sx={{ minHeight: '100vh' }}>
                <Grid item xs={12}>
                    <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 68px)' }}>
                        <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
                            <AuthCardWrapper>
                                <Grid container spacing={2} alignItems="center" justifyContent="center">
                                    <Grid item xs={12}>
                                        <Grid
                                            container
                                            direction={matchDownSM ? 'column-reverse' : 'row'}
                                            alignItems="center"
                                            justifyContent="center"
                                        >
                                            <Grid item>
                                                <Stack alignItems="center" justifyContent="center" spacing={1}>
                                                    <Typography
                                                        color={theme.palette.secondary.main}
                                                        gutterBottom
                                                        variant={matchDownSM ? 'h3' : 'h2'}
                                                    >
                                                        {props.title}
                                                    </Typography>
                                                    <Typography variant="caption" fontSize="16px" textAlign={matchDownSM ? 'center' : ''}>
                                                        Enter your credentials to continue
                                                    </Typography>
                                                </Stack>
                                            </Grid>
                                        </Grid>
                                    </Grid>

                                    <Grid item xs={12}>
                                        {props.page === 'login' && <Login />}
                                        {props.page === 'change-password' && <ChangePassword setAlertMessage={props.setAlertMessage} />}
                                        {props.page === 'forgot-password' && <ForgotPassword setAlertMessage={props.setAlertMessage} />}
                                        {props.page === 'reset-password' && <ResetPassword setAlertMessage={props.setAlertMessage} />}
                                    </Grid>
                                    {props.page === 'login' && (
                                        <>
                                            <Grid item xs={12}>
                                                <Divider />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Grid item container direction="column" alignItems="center" xs={12}>
                                                    <Typography
                                                        variant="subtitle1"
                                                        component={Link}
                                                        to={'/forgot-password'}
                                                        color="secondary"
                                                        sx={{ textDecoration: 'none' }}
                                                    >
                                                        Forgot Password?
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </>
                                    )}
                                </Grid>
                            </AuthCardWrapper>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </AuthWrapper>
    );
};

export default Index;
