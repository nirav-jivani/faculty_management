import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { makeStyles } from '@material-ui/styles';
import { Box, Button, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';
import axios from 'axios';

// project imports
import configData from '../../config';
import useScriptRef from '../../hooks/useScriptRef';
import AnimateButton from '../../ui-component/extended/AnimateButton';
import { LOGOUT } from './../../store/actions';

// style constant
const useStyles = makeStyles((theme) => ({
    redButton: {
        fontSize: '1rem',
        fontWeight: 500,
        backgroundColor: theme.palette.grey[50],
        border: '1px solid',
        borderColor: theme.palette.grey[100],
        color: theme.palette.grey[700],
        textTransform: 'none',
        '&:hover': {
            backgroundColor: theme.palette.primary.light
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '0.875rem'
        }
    },
    signDivider: {
        flexGrow: 1
    },
    signText: {
        cursor: 'unset',
        margin: theme.spacing(2),
        padding: '5px 56px',
        borderColor: theme.palette.grey[100] + ' !important',
        color: theme.palette.grey[900] + '!important',
        fontWeight: 500
    },
    loginIcon: {
        marginRight: '16px',
        [theme.breakpoints.down('sm')]: {
            marginRight: '8px'
        }
    },
    loginInput: {
        ...theme.typography.customInput
    }
}));

//============================|| API JWT - LOGIN ||============================//

const ForgotPassword = (props, { ...others }) => {
    const classes = useStyles();
    const history = useHistory();
    const dispatcher = useDispatch();
    const scriptedRef = useScriptRef();

    return (
        <React.Fragment>
            <Formik
                initialValues={{
                    email: ''
                }}
                validationSchema={Yup.object().shape({
                    email: Yup.string().max(255).required('Email is required')
                })}
                onSubmit={(values, { setErrors, setStatus, setSubmitting }) => {
                    try {
                        axios
                            .post(configData.API_SERVER + 'users/forgot-password', { email: values.email })
                            .then(function (response) {
                                if (response.data.success) {
                                    props.setAlertMessage('Reset password link sent Sucessfully');
                                    dispatcher({ type: LOGOUT });
                                    if (scriptedRef.current) {
                                        setStatus({ success: true });
                                        setSubmitting(false);
                                    }
                                    history.push('/login');
                                } else {
                                    setStatus({ success: false });
                                    setErrors({ submit: response.data.msg });
                                    setSubmitting(false);
                                }
                            })
                            .catch(function (error) {
                                setStatus({ success: false });
                                setErrors({ submit: error.response.data.msg });
                                setSubmitting(false);
                            });
                    } catch (err) {
                        console.error(err);
                        if (scriptedRef.current) {
                            setStatus({ success: false });
                            setErrors({ submit: err.message });
                            setSubmitting(false);
                        }
                    }
                }}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                    <form noValidate onSubmit={handleSubmit} {...others}>
                        <FormControl fullWidth error={Boolean(touched.email && errors.email)} className={classes.loginInput}>
                            <InputLabel htmlFor="email">Email</InputLabel>
                            <OutlinedInput
                                id="email"
                                type="email"
                                value={values.email}
                                name="email"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                inputProps={{
                                    classes: {
                                        notchedOutline: classes.notchedOutline
                                    }
                                }}
                            />
                            {touched.email && errors.email && (
                                <FormHelperText error id="email-error">
                                    {' '}
                                    {errors.email}{' '}
                                </FormHelperText>
                            )}
                        </FormControl>

                        {errors.submit && (
                            <Box
                                sx={{
                                    mt: 3
                                }}
                            >
                                <FormHelperText error>{errors.submit}</FormHelperText>
                            </Box>
                        )}

                        <Box
                            sx={{
                                mt: 2
                            }}
                        >
                            <AnimateButton>
                                <Button
                                    disableElevation
                                    disabled={isSubmitting}
                                    fullWidth
                                    size="large"
                                    type="submit"
                                    variant="contained"
                                    color="secondary"
                                >
                                    SUBMIT
                                </Button>
                            </AnimateButton>
                        </Box>
                    </form>
                )}
            </Formik>
        </React.Fragment>
    );
};

export default ForgotPassword;
