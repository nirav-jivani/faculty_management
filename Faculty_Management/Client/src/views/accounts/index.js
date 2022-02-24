import React from 'react';
import { Link, useLocation } from 'react-router-dom';

// material-ui
import { useTheme } from '@material-ui/core';
import { Divider, Grid, Stack, Typography, useMediaQuery } from '@material-ui/core';

// project imports
import AuthWrapper1 from './AuthWrapper1';
import AuthCardWrapper from './AuthCardWrapper';
import Login from './Login';
import ChangePassword from './ChangePassword';

// assets

//================================|| LOGIN MAIN ||================================//

const Index = () => {
    const theme = useTheme();
    const location = useLocation();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <AuthWrapper1>
            <Grid container direction="column" justifyContent="flex-end" sx={{ minHeight: '100vh' }}>
                <Grid item xs={12}>
                    <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 68px)' }}>
                        <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
                            <AuthCardWrapper>
                                <Grid container spacing={2} alignItems="center" justifyContent="center">
                                    {location.pathname !== '/login' ? (
                                        <Typography color={theme.palette.secondary.main} gutterBottom variant={matchDownSM ? 'h3' : 'h2'}>
                                            Change Password
                                        </Typography>
                                    ) : (
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
                                                            Hi, Welcome Back
                                                        </Typography>
                                                        <Typography
                                                            variant="caption"
                                                            fontSize="16px"
                                                            textAlign={matchDownSM ? 'center' : ''}
                                                        >
                                                            Enter your credentials to continue
                                                        </Typography>
                                                    </Stack>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    )}
                                    <Grid item xs={12}>
                                        {location.pathname === '/login' ? <Login /> : <ChangePassword />}
                                    </Grid>
                                    {location.pathname === '/login' && (
                                        <>
                                            <Grid item xs={12}>
                                                <Divider />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Grid item container direction="column" alignItems="center" xs={12}>
                                                    <Typography
                                                        variant="subtitle1"
                                                        component={Link}
                                                        to={'#'}
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
        </AuthWrapper1>
    );
};

export default Index;
