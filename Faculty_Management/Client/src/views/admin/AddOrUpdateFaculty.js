import { React, useEffect, useState } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
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
import MyAlert from './../../ui-component/MyAlert';
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

const AddOrUpdateFaculty = (props, { ...others }) => {
    const classes = useStyles();
    const history = useHistory();
    const scriptedRef = useScriptRef();
    const location = useLocation();

    const account = useSelector((state) => state.account);
    const [deptList, setDeptList] = useState([]);
    const [designationList, setDesignationList] = useState([]);
    const [employee, setEmployee] = useState(location.state);

    useEffect(() => {
        axios
            .get(configData.API_SERVER + 'admin/get-dept-designations', { headers: { 'x-auth-token': account.token } })
            .then((response) => {
                if (response.data.success) {
                    setDeptList(response.data.deptList);
                    setDesignationList(response.data.designationList);
                }
            });
    }, []);
    return (
        <MainCard title={(employee ? 'Edit' : 'Add') + ' Faculty'}>
            <Formik
                initialValues={{
                    email: employee ? employee.Username : '',
                    joinDate: employee ? format(new Date(employee.JoinDate), 'yyyy-MM-dd') : format(new Date(), 'yyyy-MM-dd'),
                    department: employee ? employee.DeptId : '',
                    designation: employee ? employee.DesignationId : '',
                    firstName: employee ? employee.FirstName : '',
                    lastName: employee ? employee.LastName : ''
                }}
                validationSchema={Yup.object().shape({
                    email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                    joinDate: Yup.string().max(255).required('Join Date is required'),
                    department: Yup.string().required('Department is required'),
                    designation: Yup.string().required('Designation is required')
                })}
                onSubmit={(values, { setErrors, setStatus, setSubmitting }) => {
                    try {
                        axios
                            .post(
                                configData.API_SERVER + 'admin/add-faculty',
                                {
                                    id: employee ? employee.id : '',
                                    joinDate: values.joinDate,
                                    email: values.email,
                                    oldEmail: employee.Username,
                                    department: values.department,
                                    designation: values.designation,
                                    firstName: values.firstName,
                                    lastName: values.lastName
                                },
                                { headers: { 'x-auth-token': account.token } }
                            )
                            .then(function (response) {
                                if (response.data.success) {
                                    props.setAlertMessage((employee ? 'Edit' : 'Add') + ' Sucessfully');
                                    if (scriptedRef.current) {
                                        setStatus({ success: true });
                                        setSubmitting(false);
                                    }
                                    history.push('/admin/view-faculties');
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
                        <Stack direction="row" justifyContent="center" spacing={2} alignItems="center">
                            <FormControl fullWidth className={classes.loginInput}>
                                <InputLabel htmlFor="firstname">First Name</InputLabel>
                                <OutlinedInput
                                    id="firstname"
                                    value={values.firstName}
                                    name="firstName"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    // disabled={isDisabled}
                                    inputProps={{
                                        classes: {
                                            className: classes.placeHolder,
                                            notchedOutline: classes.notchedOutline
                                        }
                                    }}
                                />
                            </FormControl>

                            <FormControl fullWidth className={classes.loginInput}>
                                <InputLabel htmlFor="lastname">Last Name</InputLabel>
                                <OutlinedInput
                                    id="lastname"
                                    value={values.lastName}
                                    name="lastName"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    // disabled={isDisabled}
                                    inputProps={{
                                        classes: {
                                            className: classes.placeHolder,
                                            notchedOutline: classes.notchedOutline
                                        }
                                    }}
                                />
                            </FormControl>
                        </Stack>
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
                            error={Boolean(touched.department && errors.department)}
                            id="department"
                            value={values.department}
                            name="department"
                            label="Department"
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
                        {touched.department && errors.department && (
                            <FormHelperText error id="standard-weight-helper-text-email-login">
                                {' '}
                                {errors.department}{' '}
                            </FormHelperText>
                        )}

                        <TextField
                            select
                            InputLabelProps={{ shrink: true }}
                            error={Boolean(touched.designation && errors.designation)}
                            id="designation"
                            value={values.designation}
                            name="designation"
                            label="Designation"
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
                            {designationList.map((e) => (
                                <MenuItem key={e.id} value={e.id}>
                                    {e.Designation}
                                </MenuItem>
                            ))}
                        </TextField>
                        {touched.designation && errors.designation && (
                            <FormHelperText error id="standard-weight-helper-text-email-login">
                                {' '}
                                {errors.designation}{' '}
                            </FormHelperText>
                        )}

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
                                {employee ? 'Edit' : 'Add'}
                            </Button>
                        </Box>
                    </form>
                )}
            </Formik>
        </MainCard>
    );
};

export default AddOrUpdateFaculty;
