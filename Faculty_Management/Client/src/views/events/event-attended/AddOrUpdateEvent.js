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
    Typography,
    Radio,
    FormLabel,
    RadioGroup
} from '@material-ui/core';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';
import axios from 'axios';

// project imports
import MainCard from './../../../ui-component/cards/MainCard';
import configData from '../../../config';
import useScriptRef from '../../../hooks/useScriptRef';

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

const AddOrUpdateEvent = (props, { ...others }) => {
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();
    const scriptedRef = useScriptRef();
    const [passData, setPassData] = useState(location.state);
    const account = useSelector((state) => state.account);
    const [file, setFile] = useState();

    const onFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    return (
        <MainCard title={(passData ? 'Update' : 'Add') + ' Event (Attended)'}>
            <Formik
                initialValues={{
                    id: passData ? passData.id : '',
                    title: passData ? passData.EventTitle : '',
                    organizedBy: passData ? passData.OrganizedBy : '',
                    organizedAt: passData ? passData.OrganizedAt : '',
                    fromDate: passData ? format(new Date(passData.StartDate), 'yyyy-MM-dd') : format(new Date(), 'yyyy-MM-dd'),
                    toDate: passData ? format(new Date(passData.EndDate), 'yyyy-MM-dd') : format(new Date(), 'yyyy-MM-dd'),
                    duration: passData ? passData.Duration : '',
                    speakerName: passData ? passData.SpeakerName : '',
                    topic: passData ? passData.EventTopic : '',
                    level: passData ? passData.EventLevel : 'Local',
                    type: passData ? passData.EventType : 'FDP',
                    otherType: passData ? passData.OtherType : '',
                    mode: passData ? passData.EventMode : 'Online',
                    academicYear: passData ? passData.AcedemicYear : '',
                    approvedBy: passData ? passData.ApprovedBy : ''
                }}
                validationSchema={Yup.object().shape({
                    title: Yup.string().required('Event Title is required'),
                    organizedBy: Yup.string().required('Organized By is required'),
                    organizedAt: Yup.string().required('Organized At is required'),
                    fromDate: Yup.string().required('From Date is required'),
                    toDate: Yup.string().required('To date is required'),
                    duration: Yup.string().required('Duration is required'),
                    speakerName: Yup.string().required('Speaker Name is required'),
                    topic: Yup.string().required('Topic Name is required'),
                    academicYear: Yup.string().required('Academic Year is required'),
                    approvedBy: Yup.string().required('Approved By is required')
                })}
                onSubmit={(values, { setErrors, setStatus, setSubmitting }) => {
                    try {
                        const formData = new FormData();
                        formData.append('myfile', file);
                        formData.append(
                            'data',
                            JSON.stringify({
                                id: values.id,
                                title: values.title,
                                organizedBy: values.organizedBy,
                                organizedAt: values.organizedAt,
                                fromDate: values.fromDate,
                                toDate: values.toDate,
                                duration: values.duration,
                                speakerName: values.speakerName,
                                topic: values.topic,
                                level: values.level,
                                type: values.type,
                                otherType: values.otherType,
                                mode: values.mode,
                                academicYear: values.academicYear,
                                approvedBy: values.approvedBy
                            })
                        );
                        axios
                            .post(configData.API_SERVER + 'events/event-attended', formData, { headers: { 'x-auth-token': account.token } })
                            .then(function (response) {
                                if (response.data.success) {
                                    console.log('success');
                                    window.alert((passData ? 'Updated' : 'Added') + ' Sucessfully');
                                    if (scriptedRef.current) {
                                        setStatus({ success: true });
                                        setSubmitting(false);
                                    }
                                    history.push('/event-attended/view-events');
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
                    <form noValidate encType="multipart/form-data" onSubmit={handleSubmit} {...others}>
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Title of the programme"
                            error={Boolean(touched.title && errors.title)}
                            name="title"
                            value={values.title}
                            onChange={handleChange}
                        />
                        {touched.title && errors.title && (
                            <FormHelperText error id="standard-weight-helper-text-email-title">
                                {' '}
                                {errors.title}{' '}
                            </FormHelperText>
                        )}
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Organized By"
                            error={Boolean(touched.organizedBy && errors.organizedBy)}
                            name="organizedBy"
                            value={values.organizedBy}
                            onChange={handleChange}
                        />
                        {touched.organizedBy && errors.organizedBy && (
                            <FormHelperText error id="standard-weight-helper-text-email-title">
                                {' '}
                                {errors.organizedBy}{' '}
                            </FormHelperText>
                        )}

                        <TextField
                            fullWidth
                            margin="normal"
                            label="Organized At"
                            error={Boolean(touched.organizedAt && errors.organizedAt)}
                            name="organizedAt"
                            value={values.organizedAt}
                            onChange={handleChange}
                        />
                        {touched.organizedAt && errors.organizedAt && (
                            <FormHelperText error id="standard-weight-helper-text-email-title">
                                {' '}
                                {errors.organizedAt}{' '}
                            </FormHelperText>
                        )}

                        <TextField
                            fullWidth
                            margin="normal"
                            type="date"
                            label="From Date"
                            error={Boolean(touched.fromDate && errors.fromDate)}
                            name="fromDate"
                            value={values.fromDate}
                            onChange={handleChange}
                        />
                        {touched.fromDate && errors.fromDate && (
                            <FormHelperText error id="standard-weight-helper-text-email-title">
                                {' '}
                                {errors.fromDate}{' '}
                            </FormHelperText>
                        )}

                        <TextField
                            fullWidth
                            margin="normal"
                            type="date"
                            label="To Date"
                            error={Boolean(touched.toDate && errors.toDate)}
                            name="toDate"
                            value={values.toDate}
                            onChange={handleChange}
                        />
                        {touched.toDate && errors.toDate && (
                            <FormHelperText error id="standard-weight-helper-text-email-title">
                                {' '}
                                {errors.toDate}{' '}
                            </FormHelperText>
                        )}

                        <TextField
                            fullWidth
                            margin="normal"
                            label="Duration"
                            error={Boolean(touched.duration && errors.duration)}
                            name="duration"
                            value={values.duration}
                            onChange={handleChange}
                        />
                        {touched.duration && errors.duration && (
                            <FormHelperText error id="standard-weight-helper-text-email-title">
                                {' '}
                                {errors.duration}{' '}
                            </FormHelperText>
                        )}

                        <TextField
                            fullWidth
                            margin="normal"
                            label="Speaker Of The Event"
                            error={Boolean(touched.speakerName && errors.speakerName)}
                            name="speakerName"
                            value={values.speakerName}
                            onChange={handleChange}
                        />
                        {touched.speakerName && errors.speakerName && (
                            <FormHelperText error id="standard-weight-helper-text-email-title">
                                {' '}
                                {errors.speakerName}{' '}
                            </FormHelperText>
                        )}

                        <TextField
                            fullWidth
                            margin="normal"
                            label="Topic of The Event"
                            error={Boolean(touched.topic && errors.topic)}
                            name="topic"
                            value={values.topic}
                            onChange={handleChange}
                        />
                        {touched.topic && errors.topic && (
                            <FormHelperText error id="standard-weight-helper-text-email-title">
                                {' '}
                                {errors.topic}{' '}
                            </FormHelperText>
                        )}

                        <FormControl fullWidth margin="normal" component="fieldset">
                            <FormLabel component="legend">Level of Event</FormLabel>
                            <RadioGroup aria-label="type" name="level" value={values.level} onChange={handleChange}>
                                <FormControlLabel value="Local" control={<Radio />} label="Local" />
                                <FormControlLabel value="National" control={<Radio />} label="National" />
                                <FormControlLabel value="International" control={<Radio />} label="International" />
                            </RadioGroup>
                        </FormControl>

                        <FormControl fullWidth margin="normal" component="fieldset">
                            <FormLabel component="legend">Type of Event</FormLabel>
                            <RadioGroup aria-label="type" name="type" value={values.type} onChange={handleChange}>
                                <FormControlLabel value="FDP" control={<Radio />} label="FDP" />
                                <FormControlLabel value="Workshop" control={<Radio />} label="Workshop" />
                                <FormControlLabel value="Seminar" control={<Radio />} label="Seminar" />
                                <FormControlLabel value="STTP" control={<Radio />} label="STTP" />
                                <FormControlLabel value="Webinar" control={<Radio />} label="Webinar" />
                                <FormControlLabel value="Any Other" control={<Radio />} label="Any Other" />
                            </RadioGroup>
                        </FormControl>

                        <TextField
                            fullWidth
                            margin="normal"
                            helperText="Write , If you have selected Any Other option.."
                            label="Other Type"
                            name="otherType"
                            value={values.otherType}
                            onChange={handleChange}
                        />

                        <FormControl fullWidth margin="normal" component="fieldset">
                            <FormLabel component="legend">Mode of Event</FormLabel>
                            <RadioGroup aria-label="type" name="mode" value={values.mode} onChange={handleChange}>
                                <FormControlLabel value="Online" control={<Radio />} label="Online" />
                                <FormControlLabel value="Offline" control={<Radio />} label="Offline" />
                            </RadioGroup>
                        </FormControl>

                        <TextField
                            fullWidth
                            margin="normal"
                            label="Academic Year"
                            error={Boolean(touched.academicYear && errors.academicYear)}
                            name="academicYear"
                            value={values.academicYear}
                            onChange={handleChange}
                        />
                        {touched.academicYear && errors.academicYear && (
                            <FormHelperText error id="standard-weight-helper-text-email-title">
                                {' '}
                                {errors.academicYear}{' '}
                            </FormHelperText>
                        )}

                        <TextField
                            fullWidth
                            margin="normal"
                            label="Approved By"
                            error={Boolean(touched.approvedBy && errors.approvedBy)}
                            name="approvedBy"
                            value={values.approvedBy}
                            onChange={handleChange}
                        />
                        {touched.approvedBy && errors.approvedBy && (
                            <FormHelperText error id="standard-weight-helper-text-email-title">
                                {' '}
                                {errors.approvedBy}{' '}
                            </FormHelperText>
                        )}

                        <TextField
                            fullWidth
                            margin="normal"
                            label="Scanned Copy of Certificate"
                            name="file"
                            InputLabelProps={{ shrink: true }}
                            onChange={onFileChange}
                            type="file"
                        />

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
                                {passData ? 'UPDATE ' : 'ADD '} EVENT
                            </Button>
                        </Box>
                    </form>
                )}
            </Formik>
        </MainCard>
    );
};

export default AddOrUpdateEvent;
