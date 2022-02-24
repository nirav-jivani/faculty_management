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
import MyAlert from './../../../ui-component/MyAlert';

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
    const location = useLocation();
    const history = useHistory();
    const scriptedRef = useScriptRef();
    const [event, setPassData] = useState(location.state);
    const [file, setFile] = useState();
    const [alertMessage, setAlertMessage] = useState('');

    const account = useSelector((state) => state.account);

    const onFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    return (
        <MainCard title={(event ? 'Update' : 'Add') + ' Event (Organized)'}>
            <Formik
                initialValues={{
                    title: event ? event.EventTitle : '',
                    speakerName: event ? event.SpeakerName : '',
                    fromDate: event ? format(new Date(event.StartDate), 'yyyy-MM-dd') : format(new Date(), 'yyyy-MM-dd'),
                    toDate: event ? format(new Date(event.EndDate), 'yyyy-MM-dd') : format(new Date(), 'yyyy-MM-dd'),
                    duration: event ? event.Duration : '',
                    participants: event ? event.TotalParticipants : '',
                    topic: event ? event.EventTopic : '',
                    type: event ? event.EventType : 'FDP',
                    otherType: event ? event.OtherType : '',
                    mode: event ? event.EventMode : 'Online',
                    academicYear: event ? event.AcademicYear : '',
                    approvedBy: event ? event.ApprovedBy : ''
                }}
                validationSchema={Yup.object().shape({
                    title: Yup.string().required('Event Title is required'),
                    speakerName: Yup.string().required('Speaker name is required'),
                    fromDate: Yup.date().required('From Date is required'),
                    toDate: Yup.date().min(Yup.ref('fromDate'), "To date can't be before From date"),
                    duration: Yup.string().required('Duration is required'),
                    participants: Yup.string().required('Speaker Name is required'),
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
                                id: event ? event.id : '',
                                title: values.title,
                                speakerName: values.speakerName,
                                fromDate: values.fromDate,
                                toDate: values.toDate,
                                duration: values.duration,
                                participants: values.participants,
                                topic: values.topic,
                                type: values.type,
                                otherType: values.otherType,
                                mode: values.mode,
                                academicYear: values.academicYear,
                                approvedBy: values.approvedBy,
                                ProofPath: event ? event.ProofPath : ''
                            })
                        );
                        axios
                            .post(configData.API_SERVER + 'events/add-or-update-event-organized', formData, {
                                headers: { 'x-auth-token': account.token }
                            })
                            .then(function (response) {
                                if (response.data.success) {
                                    console.log('success');
                                    props.setAlertMessage((event ? 'Updated' : 'Added') + ' Sucessfully');
                                    if (scriptedRef.current) {
                                        setStatus({ success: true });
                                        setSubmitting(false);
                                    }
                                    history.push('/event-organized/view-events');
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
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Speaker name"
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
                            label="Duration(in days)"
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
                            label="Number Of Participants"
                            error={Boolean(touched.participants && errors.participants)}
                            name="participants"
                            value={values.participants}
                            onChange={handleChange}
                        />
                        {touched.participants && errors.participants && (
                            <FormHelperText error id="standard-weight-helper-text-email-title">
                                {' '}
                                {errors.participants}{' '}
                            </FormHelperText>
                        )}

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
                            label="Scanned Copy of Document(If any)"
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
                                {event ? 'UPDATE ' : 'ADD '} EVENT
                            </Button>
                        </Box>
                    </form>
                )}
            </Formik>
        </MainCard>
    );
};

export default AddOrUpdateEvent;
