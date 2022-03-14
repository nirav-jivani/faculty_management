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
    const [file, setFile] = useState(null);
    const [fileError, setFileError] = useState('');
    const [alertMessage, setAlertMessage] = useState('');

    const account = useSelector((state) => state.account);

    const [academicYears, setAcademicYears] = useState([]);
    const [dateDiff, setDateDiff] = useState(
        event ? Math.floor(Math.abs(Date.parse(event.EndDate) - Date.parse(event.StartDate)) / 86400000) + 1 : 1
    );

    const calculateYear = () => {
        let start = 2000;
        const end = new Date().getFullYear();
        let years = [];
        while (start !== end + 1) {
            years.push(`${start}-${start + 1}`);
            start++;
        }
        setAcademicYears(years);
    };

    useEffect(() => {
        calculateYear();
    }, []);

    const onFileChange = (event) => {
        if (event.target.files[0] && event.target.files[0].size < configData.FILE_SIZE) {
            setFile(event.target.files[0]);
            setFileError('');
        } else {
            setFile(null);
            setFileError('File size must be less than 1MB');
        }
    };
    return (
        <MainCard title={(event ? 'Update' : 'Add') + ' Event (Conducted)'}>
            <Formik
                initialValues={{
                    title: event ? event.EventTitle : '',
                    organizedBy: event ? event.OrganizedBy : '',
                    conductedAt: event ? event.ConductedAt : '',
                    fromDate: event ? format(new Date(event.StartDate), 'yyyy-MM-dd') : format(new Date(), 'yyyy-MM-dd'),
                    toDate: event ? format(new Date(event.EndDate), 'yyyy-MM-dd') : format(new Date(), 'yyyy-MM-dd'),
                    duration: event ? parseInt(event.Duration) : 1,
                    participants: event ? parseInt(event.TotalParticipants) : 0,
                    topic: event ? event.EventTopic : '',
                    level: event ? event.EventLevel : configData.EVENT_LEVELS[0],
                    type: event ? event.EventType : configData.EVENT_TYPES[0],
                    otherType: event ? event.OtherType : '',
                    academicYear: event ? event.AcademicYear : `${new Date().getFullYear()}-${new Date().getFullYear() + 1}`,
                    mode: event ? event.EventMode : 'Online',
                    approvedBy: event ? event.ApprovedBy : ''
                }}
                validationSchema={Yup.object().shape({
                    title: Yup.string().required('Event Title is required'),
                    organizedBy: Yup.string().required('Organized By is required'),
                    conductedAt: Yup.string().required('Conducted At is required'),
                    fromDate: Yup.date().required('From Date is required'),
                    toDate: Yup.date().min(Yup.ref('fromDate'), "To date can't be before From date"),
                    duration: Yup.number().required('Duration is required').max(dateDiff),
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
                                organizedBy: values.organizedBy,
                                conductedAt: values.conductedAt,
                                fromDate: values.fromDate,
                                toDate: values.toDate,
                                duration: values.duration.toString(),
                                participants: values.participants.toString(),
                                topic: values.topic,
                                level: values.level,
                                type: values.type,
                                otherType: values.otherType,
                                mode: values.mode,
                                academicYear: values.academicYear,
                                approvedBy: values.approvedBy,
                                ProofPath: event ? event.ProofPath : ''
                            })
                        );
                        axios
                            .post(configData.API_SERVER + 'events/add-or-update-event-conducted', formData, {
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
                                    history.push('/event-conducted/view-events');
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
                            label="Conducted At"
                            error={Boolean(touched.conductedAt && errors.conductedAt)}
                            name="conductedAt"
                            value={values.conductedAt}
                            onChange={handleChange}
                        />
                        {touched.conductedAt && errors.conductedAt && (
                            <FormHelperText error id="standard-weight-helper-text-email-title">
                                {' '}
                                {errors.conductedAt}{' '}
                            </FormHelperText>
                        )}

                        <TextField
                            fullWidth
                            margin="normal"
                            type="date"
                            label="From Date"
                            InputLabelProps={{ shrink: true }}
                            error={Boolean(touched.fromDate && errors.fromDate)}
                            name="fromDate"
                            value={values.fromDate}
                            onChange={(e) => {
                                handleChange(e);
                                setDateDiff(Math.floor(Math.abs(Date.parse(values.toDate) - Date.parse(e.target.value)) / 86400000) + 1);
                            }}
                        />
                        {touched.fromDate && errors.fromDate && (
                            <FormHelperText error id="from-date-error">
                                {' '}
                                {errors.fromDate}{' '}
                            </FormHelperText>
                        )}

                        <TextField
                            fullWidth
                            margin="normal"
                            type="date"
                            label="To Date"
                            InputLabelProps={{ shrink: true }}
                            error={Boolean(touched.toDate && errors.toDate)}
                            name="toDate"
                            value={values.toDate}
                            onChange={(e) => {
                                handleChange(e);
                                setDateDiff(Math.floor(Math.abs(Date.parse(e.target.value) - Date.parse(values.fromDate)) / 86400000) + 1);
                            }}
                        />
                        {touched.toDate && errors.toDate && (
                            <FormHelperText error id="to-date-error">
                                {' '}
                                {errors.toDate}{' '}
                            </FormHelperText>
                        )}

                        <TextField
                            fullWidth
                            type="number"
                            InputProps={{
                                inputProps: {
                                    min: 1,
                                    max: dateDiff
                                }
                            }}
                            margin="normal"
                            label="Duration(in days)"
                            error={Boolean(touched.duration && errors.duration)}
                            name="duration"
                            value={values.duration}
                            onChange={handleChange}
                        />
                        {touched.duration && errors.duration && (
                            <FormHelperText error id="duration-error">
                                {' '}
                                {errors.duration}{' '}
                            </FormHelperText>
                        )}

                        <TextField
                            fullWidth
                            margin="normal"
                            type="number"
                            InputProps={{
                                inputProps: {
                                    min: 0
                                }
                            }}
                            label="Number Of Participants"
                            name="participants"
                            value={values.participants}
                            onChange={handleChange}
                        />

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
                            select
                            InputLabelProps={{ shrink: true }}
                            value={values.level}
                            name="level"
                            label="Level of Event"
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
                            {configData.EVENT_LEVELS.map((e, index) => (
                                <MenuItem key={index} value={e}>
                                    {e}
                                </MenuItem>
                            ))}
                        </TextField>

                        <TextField
                            select
                            InputLabelProps={{ shrink: true }}
                            value={values.type}
                            name="type"
                            label="Type of Event"
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
                            {configData.EVENT_TYPES.map((e, index) => (
                                <MenuItem key={index} value={e}>
                                    {e}
                                </MenuItem>
                            ))}
                        </TextField>

                        {values.type === 'AnyOther' && (
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Other Type"
                                name="otherType"
                                value={values.otherType}
                                onChange={handleChange}
                            />
                        )}

                        <FormControl fullWidth margin="normal" component="fieldset">
                            <FormLabel component="legend">Mode of Event</FormLabel>
                            <RadioGroup aria-label="type" name="mode" value={values.mode} onChange={handleChange}>
                                <FormControlLabel value="Online" control={<Radio />} label="Online" />
                                <FormControlLabel value="Offline" control={<Radio />} label="Offline" />
                            </RadioGroup>
                        </FormControl>

                        <TextField
                            select
                            InputLabelProps={{ shrink: true }}
                            value={values.academicYear}
                            name="academicYear"
                            label="Academic Year"
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
                            {academicYears.map((e) => (
                                <MenuItem key={e} value={e}>
                                    {e}
                                </MenuItem>
                            ))}
                        </TextField>

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
                            value={fileError === '' && file ? file.filename : ''}
                            InputLabelProps={{ shrink: true }}
                            onChange={onFileChange}
                            type="file"
                        />
                        {fileError !== '' && (
                            <FormHelperText error id="file-error">
                                {' '}
                                {fileError}{' '}
                            </FormHelperText>
                        )}

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
                            <Button disableElevation disabled={isSubmitting} size="large" type="submit" variant="contained" color="primary">
                                {event ? 'Update' : 'Add'}
                            </Button>
                        </Box>
                    </form>
                )}
            </Formik>
        </MainCard>
    );
};

export default AddOrUpdateEvent;
