import { React, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { format } from 'date-fns';
// material-ui
import { makeStyles } from '@material-ui/styles';

import {
    Box,
    TextField,
    MenuItem,
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormHelperText,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Stack,
    Typography
} from '@material-ui/core';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';
import axios from 'axios';

// project imports
import MainCard from './../../ui-component/cards/MainCard';
import configData from '../../config';
import useScriptRef from '../../hooks/useScriptRef';

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

const AddFaculty = (props, { ...others }) => {
    const classes = useStyles();

    const scriptedRef = useScriptRef();

    const account = useSelector((state) => state.account);
    const [deptList, setDeptList] = useState([]);
    useEffect(() => {
        axios.get(configData.API_SERVER + 'admin/get-departments', { headers: { 'x-auth-token': account.token } }).then((response) => {
            if (response.data.success) {
                setDeptList(response.data.deptList);
                console.log(deptList);
            }
        });
    }, []);

    return (
        <MainCard title="Add Faculty">
            <Formik
                initialValues={{
                    email: '',
                    joinDate: format(new Date(), 'yyyy-MM-dd'),
                    dept: ''
                }}
                validationSchema={Yup.object().shape({
                    email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                    joinDate: Yup.string().max(255).required('Join Date is required')
                })}
                onSubmit={(values, { setErrors, setStatus, setSubmitting }) => {
                    try {
                        axios
                            .post(
                                configData.API_SERVER + 'admin/add-faculty',
                                {
                                    joinDate: values.joinDate,
                                    email: values.email,
                                    dept: values.dept
                                },
                                { headers: { 'x-auth-token': account.token } }
                            )
                            .then(function (response) {
                                if (response.data.success) {
                                    console.log('success');
                                    if (scriptedRef.current) {
                                        setStatus({ success: true });
                                        setSubmitting(false);
                                    }
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
                            <InputLabel htmlFor="outlined-adornment-email-login">Email</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-email-login"
                                type="email"
                                value={values.email}
                                name="email"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                label="Email Address"
                                inputProps={{
                                    classes: {
                                        className: classes.placeHolder,
                                        notchedOutline: classes.notchedOutline
                                    }
                                }}
                            />
                            {touched.email && errors.email && (
                                <FormHelperText error id="standard-weight-helper-text-email-login">
                                    {' '}
                                    {errors.email}{' '}
                                </FormHelperText>
                            )}
                        </FormControl>

                        <TextField
                            select
                            InputLabelProps={{ shrink: true }}
                            id="dept"
                            value={values.dept}
                            name="dept"
                            label="Branch"
                            fullWidth
                            margin="normal"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            inputProps={{
                                classes: {
                                    notchedOutline: classes.notchedOutline
                                }
                            }}
                        >
                            {deptList.map((e) => (
                                <MenuItem key={e.id} value={e.id}>
                                    {e.DeptName}
                                </MenuItem>
                            ))}
                        </TextField>

                        <FormControl error={Boolean(touched.joinDate && errors.joinDate)} className={classes.loginInput}>
                            <InputLabel htmlFor="outlined-adornment-password-login">Join Date</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password-login"
                                type="date"
                                value={values.joinDate}
                                name="joinDate"
                                onChange={handleChange}
                                inputProps={{
                                    classes: {
                                        notchedOutline: classes.notchedOutline
                                    }
                                }}
                            />
                            {touched.joinDate && errors.joinDate && (
                                <FormHelperText error id="standard-weight-helper-text-password-login">
                                    {' '}
                                    {errors.joinDate}{' '}
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
                            <Button
                                disableElevation
                                disabled={isSubmitting}
                                size="large"
                                type="submit"
                                variant="contained"
                                color="secondary"
                            >
                                Register
                            </Button>
                        </Box>
                    </form>
                )}
            </Formik>
        </MainCard>
    );
};

export default AddFaculty;
