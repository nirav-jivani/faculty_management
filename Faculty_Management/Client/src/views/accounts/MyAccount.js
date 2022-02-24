import { React, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { format } from 'date-fns';
import { useHistory } from 'react-router';
// material-ui
import { makeStyles } from '@material-ui/styles';

import {
    Radio,
    RadioGroup,
    Box,
    TextField,
    MenuItem,
    Button,
    Checkbox,
    FormControl,
    FormLabel,
    FormControlLabel,
    FormHelperText,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Stack,
    Avatar,
    Typography
} from '@material-ui/core';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';
import axios from 'axios';

// project imports
import MyAlert from './../../ui-component/MyAlert';
import MainCard from './../../ui-component/cards/MainCard';
import configData from '../../config';
import useScriptRef from '../../hooks/useScriptRef';
import { ACCOUNT_INITIALIZE } from './../../store/actions';

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

const MyAccount = (props, { ...others }) => {
    const classes = useStyles();
    const history = useHistory();
    const scriptedRef = useScriptRef();
    const dispatcher = useDispatch();
    const account = useSelector((state) => state.account);
    const [isDisabled, setIsDisabled] = useState(true);
    console.log(props);
    const stringAvatar = (name) => {
        return {
            children: `${name.split(' ')[0][0] + name.split(' ')[1][0]}`
        };
    };

    return (
        <MainCard
            title="My Account"
            secondary={
                <Stack direction="row" alignItems="center" spacing={2}>
                    <Typography variant="h2">{account.user.FirstName + ' ' + account.user.LastName}</Typography>
                    <Avatar {...stringAvatar(account.user.FirstName + ' ' + account.user.LastName)} />
                </Stack>
            }
        >
            <Formik
                initialValues={{
                    firstName: account.user.FirstName,
                    middleName: account.user.MiddleName,
                    lastName: account.user.LastName,
                    email: account.user.Username,
                    birthDate: account.user.BirthDate,
                    gender: account.user.Gender,
                    joinDate: account.user.JoinDate,
                    yoe: 12,
                    department: account.user.DeptName,
                    designation: account.user.Designation,
                    qualification: account.user.Qualification
                }}
                validationSchema={Yup.object().shape({
                    email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                    joinDate: Yup.string().max(255).required('Join Date is required')
                })}
                onSubmit={(values, { setErrors, setStatus, setSubmitting }) => {
                    try {
                        if (!isDisabled) {
                            axios
                                .post(
                                    configData.API_SERVER + 'users/update-account',
                                    {
                                        firstName: values.firstName,
                                        middleName: values.middleName,
                                        lastName: values.lastName,
                                        email: values.email,
                                        birthDate: values.birthDate,
                                        gender: values.gender,
                                        yoe: values.yoe,
                                        qualification: values.qualification
                                    },
                                    { headers: { 'x-auth-token': account.token } }
                                )
                                .then(function (response) {
                                    if (response.data.success) {
                                        dispatcher({
                                            type: ACCOUNT_INITIALIZE,
                                            payload: { isLoggedIn: true, user: response.data.user, token: account.token }
                                        });
                                        props.setAlertMessage('Updated Sucessfully');
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
                        }
                        setIsDisabled(!isDisabled);
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
                        <Stack direction="row" justifyContent="center" spacing={2} alignItems="center">
                            <FormControl fullWidth className={classes.loginInput}>
                                {/* <InputLabel htmlFor="firstname">First Name</InputLabel> */}
                                <TextField
                                    variant="standard"
                                    id="firstname"
                                    value={values.firstName}
                                    name="firstName"
                                    label="First Name"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    disabled={isDisabled}
                                    inputProps={{
                                        classes: {
                                            className: classes.placeHolder,
                                            notchedOutline: classes.notchedOutline
                                        }
                                    }}
                                />
                            </FormControl>

                            <FormControl fullWidth className={classes.loginInput}>
                                {/* <InputLabel htmlFor="middlename">Middle Name</InputLabel> */}
                                <TextField
                                    variant="standard"
                                    id="middlename"
                                    value={values.middleName}
                                    name="middleName"
                                    label="Middle Name"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    disabled={isDisabled}
                                    inputProps={{
                                        classes: {
                                            className: classes.placeHolder,
                                            notchedOutline: classes.notchedOutline
                                        }
                                    }}
                                />
                            </FormControl>

                            <FormControl fullWidth className={classes.loginInput}>
                                {/* <InputLabel htmlFor="lastname">Last Name</InputLabel> */}
                                <TextField
                                    variant="standard"
                                    id="lastname"
                                    value={values.lastName}
                                    name="lastName"
                                    label="Last Name"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    disabled={isDisabled}
                                    inputProps={{
                                        classes: {
                                            className: classes.placeHolder,
                                            notchedOutline: classes.notchedOutline
                                        }
                                    }}
                                />
                            </FormControl>
                        </Stack>
                        <Stack direction="row" spacing={2} alignItems="center">
                            <FormControl fullWidth error={Boolean(touched.email && errors.email)} className={classes.loginInput}>
                                {/* <InputLabel htmlFor="email">Email</InputLabel> */}
                                <TextField
                                    variant="standard"
                                    id="email"
                                    type="email"
                                    value={values.email}
                                    name="email"
                                    label="Email"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    disabled={isDisabled}
                                    inputProps={{
                                        classes: {
                                            className: classes.placeHolder,
                                            notchedOutline: classes.notchedOutline
                                        }
                                    }}
                                />
                                {touched.email && errors.email && (
                                    <FormHelperText error id="email">
                                        {' '}
                                        {errors.email}{' '}
                                    </FormHelperText>
                                )}
                            </FormControl>
                            <FormControl fullWidth className={classes.loginInput}>
                                {/* <InputLabel htmlFor="birthDate">Birth Date</InputLabel> */}
                                <TextField
                                    variant="standard"
                                    id="birthDate"
                                    type="date"
                                    value={values.birthDate}
                                    name="birthDate"
                                    label="Birth Date"
                                    onChange={handleChange}
                                    disabled={isDisabled}
                                    inputProps={{
                                        classes: {
                                            notchedOutline: classes.notchedOutline
                                        }
                                    }}
                                />
                            </FormControl>
                        </Stack>
                        {isDisabled && (
                            <Stack direction="row" spacing={2} alignItems="center">
                                <FormControl fullWidth className={classes.loginInput}>
                                    {/* <InputLabel htmlFor="designation">Designation</InputLabel> */}
                                    <TextField
                                        variant="standard"
                                        id="designation"
                                        value={values.designation}
                                        name="designation"
                                        label="Designation"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        disabled={isDisabled}
                                        inputProps={{
                                            classes: {
                                                className: classes.placeHolder,
                                                notchedOutline: classes.notchedOutline
                                            }
                                        }}
                                    />
                                </FormControl>

                                <FormControl fullWidth className={classes.loginInput}>
                                    {/* <InputLabel htmlFor="department">Department</InputLabel> */}
                                    <TextField
                                        variant="standard"
                                        id="department"
                                        value={values.department}
                                        name="department"
                                        label="Department"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        disabled={isDisabled}
                                        inputProps={{
                                            classes: {
                                                className: classes.placeHolder,
                                                notchedOutline: classes.notchedOutline
                                            }
                                        }}
                                    />
                                </FormControl>
                                <FormControl fullWidth error={Boolean(touched.joinDate && errors.joinDate)} className={classes.loginInput}>
                                    {/* <InputLabel htmlFor="outlined-adornment-password-login">Join Date</InputLabel> */}
                                    <TextField
                                        variant="standard"
                                        id="outlined-adornment-password-login"
                                        type="date"
                                        value={values.joinDate}
                                        name="joinDate"
                                        label="Join Date"
                                        onChange={handleChange}
                                        disabled={isDisabled}
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
                            </Stack>
                        )}
                        <Stack direction="row" spacing={2} alignItems="center">
                            <FormControl fullWidth className={classes.loginInput}>
                                {/* <InputLabel htmlFor="yoe">Year Of Experience</InputLabel> */}
                                <TextField
                                    variant="standard"
                                    id="yoe"
                                    value={values.yoe}
                                    type="number"
                                    name="yoe"
                                    label="Year Of Experience"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    disabled={isDisabled}
                                    inputProps={{
                                        classes: {
                                            className: classes.placeHolder,
                                            notchedOutline: classes.notchedOutline
                                        }
                                    }}
                                />
                            </FormControl>
                            <FormControl fullWidth className={classes.loginInput}>
                                {/* <InputLabel htmlFor="qualification">Qualification</InputLabel> */}
                                <TextField
                                    variant="standard"
                                    label="Qualification"
                                    id="qualification"
                                    value={values.qualification}
                                    name="qualification"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    disabled={isDisabled}
                                    inputProps={{
                                        classes: {
                                            className: classes.placeHolder,
                                            notchedOutline: classes.notchedOutline
                                        }
                                    }}
                                />
                            </FormControl>
                        </Stack>

                        <FormControl fullWidth>
                            <FormLabel id="gender">Gender</FormLabel>
                            <RadioGroup
                                aria-labelledby="gender"
                                name="gender"
                                value={values.gender}
                                disabled={isDisabled}
                                onChange={handleChange}
                            >
                                <Stack direction="row" spacing={2} alignItems="center">
                                    <FormControlLabel value="Female" control={<Radio />} label="Female" />
                                    <FormControlLabel value="Male" control={<Radio />} label="Male" />
                                </Stack>
                            </RadioGroup>
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
                            <Button disableElevation size="large" type="submit" variant="contained" color="secondary">
                                {isDisabled ? 'Edit' : 'Save'}
                            </Button>
                        </Box>
                    </form>
                )}
            </Formik>
        </MainCard>
    );
};

export default MyAccount;
