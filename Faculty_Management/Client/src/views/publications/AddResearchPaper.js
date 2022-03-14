import { React, useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { format } from 'date-fns';

// material-ui
import { makeStyles } from '@material-ui/styles';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

import {
    Box,
    Fab,
    TextField,
    Button,
    FormControl,
    Stack,
    FormControlLabel,
    FormHelperText,
    Radio,
    InputAdornment,
    FormLabel,
    Tooltip,
    MenuItem,
    RadioGroup
} from '@material-ui/core';

// third party
import * as Yup from 'yup';
import { FieldArray, Form, Formik, getIn } from 'formik';
import axios from 'axios';

// project imports
import MainCard from '../../ui-component/cards/MainCard';
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

const AddResearchPaper = (props, { ...others }) => {
    const classes = useStyles();
    const location = useLocation();
    const history = useHistory();
    const scriptedRef = useScriptRef();
    const [researchPaper, setResearchPaper] = useState(location.state);
    const [academicYears, setAcademicYears] = useState([]);
    const account = useSelector((state) => state.account);

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

    return (
        <MainCard title={(researchPaper ? 'Update' : 'Add') + ' Research Paper'}>
            <Formik
                initialValues={{
                    authors: researchPaper ? researchPaper.authors : [{ Name: '', Department: '', Organization: '' }],
                    type: researchPaper ? researchPaper.type : 'Conference',
                    academicYear: researchPaper
                        ? researchPaper.AcademicYear
                        : `${new Date().getFullYear()}-${new Date().getFullYear() + 1}`,
                    researchTitle: researchPaper ? researchPaper.ResearchTitle : '',
                    title: researchPaper
                        ? researchPaper.type === 'Conference'
                            ? researchPaper.ConferenceTitle
                            : researchPaper.JournalTitle
                        : '',
                    level: researchPaper ? researchPaper.Level : 'National',
                    fromDate:
                        researchPaper && researchPaper.type === 'Conference'
                            ? format(new Date(researchPaper.StartDate), 'yyyy-MM-dd')
                            : format(new Date(), 'yyyy-MM-dd'),
                    toDate:
                        researchPaper && researchPaper.type === 'Conference'
                            ? format(new Date(researchPaper.EndDate), 'yyyy-MM-dd')
                            : format(new Date(), 'yyyy-MM-dd'),
                    conferenceName: researchPaper && researchPaper.type === 'Conference' ? researchPaper.ConferenceName : '',
                    organizer: researchPaper && researchPaper.type === 'Conference' ? researchPaper.Organizer : '',
                    city: researchPaper && researchPaper.type === 'Conference' ? researchPaper.City : '',
                    state: researchPaper && researchPaper.type === 'Conference' ? researchPaper.State : '',
                    country: researchPaper && researchPaper.type === 'Conference' ? researchPaper.Country : '',
                    publisher: researchPaper ? researchPaper.Publisher : '',
                    publicationDate: researchPaper ? researchPaper.PublicationDate : format(new Date(), 'yyyy-MM-dd'),
                    link: researchPaper && researchPaper.type !== 'Conference' ? researchPaper.Link : '',
                    volumeNo: researchPaper && researchPaper.type !== 'Conference' ? researchPaper.VolumeNo : '',
                    publicationNo: researchPaper && researchPaper.type !== 'Conference' ? researchPaper.PublicationNo : '',
                    pages: researchPaper ? researchPaper.Pages : '',
                    doi: researchPaper ? researchPaper.DOI : '',
                    isbn: researchPaper ? researchPaper.ISBN : '',
                    institute: researchPaper && researchPaper.type === 'Conference' ? researchPaper.AffiliatingInstitute : '',
                    impactFactor: researchPaper && researchPaper.type !== 'Conference' ? researchPaper.ImpactFactor : '',
                    impactYear: researchPaper && researchPaper.type !== 'Conference' ? researchPaper.ImpactFactorYear : '',
                    impactAgency: researchPaper && researchPaper.type !== 'Conference' ? researchPaper.ImpactFactorAgency : '',
                    hIndex: researchPaper && researchPaper.type !== 'Conference' ? researchPaper.HIndex : ''
                }}
                validationSchema={Yup.object().shape({
                    authors: Yup.array().of(
                        Yup.object().shape({
                            Name: Yup.string().required(' '),
                            Department: Yup.string().required(' '),
                            Organization: Yup.string().required(' ')
                        })
                    ),
                    researchTitle: Yup.string().required('Title of research paper is required'),
                    title: Yup.string().required(`Title is required`),
                    fromDate: Yup.date().required('From Date is required'),
                    toDate: Yup.date().min(Yup.ref('fromDate'), "To date can't be before From date"),
                    publisher: Yup.string().required('Publisher is required')
                })}
                onSubmit={(values, { setErrors, setStatus, setSubmitting }) => {
                    try {
                        let data;
                        if (values.type === 'Conference') {
                            data = {
                                id: researchPaper ? researchPaper.id : '',
                                type: values.type,
                                authors: values.authors,
                                researchTitle: values.researchTitle,
                                level: values.level,
                                title: values.title,
                                fromDate: values.fromDate,
                                toDate: values.toDate,
                                conferenceName: values.conferenceName,
                                organizer: values.organizer,
                                city: values.city,
                                state: values.state,
                                country: values.country,
                                publisher: values.publisher,
                                publicationDate: values.publicationDate,
                                pages: values.pages,
                                doi: values.doi,
                                isbn: values.isbn,
                                institute: values.institute,
                                academicYear: values.academicYear
                            };
                        } else {
                            data = {
                                id: researchPaper ? researchPaper.id : '',
                                type: values.type,
                                authors: values.authors,
                                researchTitle: values.researchTitle,
                                level: values.level,
                                title: values.title,
                                publisher: values.publisher,
                                link: values.link,
                                publicationDate: values.publicationDate,
                                volumeNo: values.volumeNo,
                                publicationNo: values.publicationNo,
                                pages: values.pages,
                                doi: values.doi,
                                isbn: values.isbn,
                                impactFactor: values.impactFactor,
                                impactYear: values.impactYear,
                                impactAgency: values.impactAgency,
                                hIndex: values.hIndex,
                                academicYear: values.academicYear
                            };
                        }
                        axios
                            .post(configData.API_SERVER + 'publications/add-or-update-research-paper', data, {
                                headers: { 'x-auth-token': account.token }
                            })
                            .then(function (response) {
                                console.log(response);
                                if (response.data.success) {
                                    props.setAlertMessage((researchPaper ? 'Updated' : 'Added') + ' Sucessfully');
                                    if (scriptedRef.current) {
                                        setStatus({ success: true });
                                        setSubmitting(false);
                                    }
                                    values.type === 'Conference'
                                        ? history.push('/publications/view-conferences')
                                        : history.push('/publications/view-journals');
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
                        <FormControl fullWidth margin="normal" component="fieldset">
                            <FormLabel component="legend">Type of Research Paper</FormLabel>
                            <RadioGroup aria-label="type" name="type" value={values.type} onChange={handleChange}>
                                <Stack direction="row" spacing={3}>
                                    <FormControlLabel
                                        value="Conference"
                                        control={<Radio disabled={Boolean(researchPaper)} />}
                                        label="Conference"
                                    />
                                    <FormControlLabel
                                        value="Journal"
                                        control={<Radio disabled={Boolean(researchPaper)} />}
                                        label="Journal"
                                    />
                                </Stack>
                            </RadioGroup>
                        </FormControl>

                        <TextField
                            fullWidth
                            margin="normal"
                            label="Title of the Research Paper"
                            error={Boolean(touched.researchTitle && errors.researchTitle)}
                            name="researchTitle"
                            value={values.researchTitle}
                            onChange={handleChange}
                        />
                        {touched.researchTitle && errors.researchTitle && (
                            <FormHelperText error id="research-title-error">
                                {' '}
                                {errors.researchTitle}{' '}
                            </FormHelperText>
                        )}
                        <TextField
                            fullWidth
                            margin="normal"
                            label={`Title of the ${values.type}`}
                            error={Boolean(touched.title && errors.title)}
                            name="title"
                            value={values.title}
                            onChange={handleChange}
                        />
                        {touched.title && errors.title && (
                            <FormHelperText error id="title-error">
                                {' '}
                                {errors.title}{' '}
                            </FormHelperText>
                        )}
                        <FieldArray name="authors">
                            {({ push, remove }) => (
                                <div>
                                    {values.authors.map((e, index) => (
                                        <div key={index}>
                                            <Box my={1}>
                                                <FormLabel style={{ color: 'black' }} component="legend">
                                                    Author-{index + 1}
                                                </FormLabel>
                                            </Box>
                                            <Stack direction="row" justifyContent="center" spacing={2} alignItems="center">
                                                <TextField
                                                    fullWidth
                                                    label="Name"
                                                    error={Boolean(
                                                        getIn(touched, `authors[${index}].Name`) && getIn(errors, `authors[${index}].Name`)
                                                    )}
                                                    name={`authors[${index}].Name`}
                                                    value={e.Name}
                                                    onChange={handleChange}
                                                />

                                                <TextField
                                                    fullWidth
                                                    margin="normal"
                                                    label="Department"
                                                    name={`authors[${index}].Department`}
                                                    error={Boolean(
                                                        getIn(touched, `authors[${index}].Department`) &&
                                                            getIn(errors, `authors[${index}].Department`)
                                                    )}
                                                    value={e.Department}
                                                    onChange={handleChange}
                                                />
                                                <TextField
                                                    fullWidth
                                                    label="Organization"
                                                    name={`authors[${index}].Organization`}
                                                    error={Boolean(
                                                        getIn(touched, `authors[${index}].Organization`) &&
                                                            getIn(errors, `authors[${index}].Organization`)
                                                    )}
                                                    value={e.Organization}
                                                    onChange={handleChange}
                                                />
                                            </Stack>
                                            <Stack direction="row" justifyContent="center" alignItems="center">
                                                {index + 1 === values.authors.length && (
                                                    <Box my={4}>
                                                        <InputAdornment position="start">
                                                            <Tooltip title="Add Author">
                                                                <Fab
                                                                    color="primary"
                                                                    size="small"
                                                                    onClick={() => push({ Name: '', Department: '', Organization: '' })}
                                                                >
                                                                    <AddIcon />
                                                                </Fab>
                                                            </Tooltip>
                                                        </InputAdornment>
                                                    </Box>
                                                )}

                                                {index + 1 === values.authors.length && values.authors.length > 1 && (
                                                    <Box>
                                                        <InputAdornment position="start">
                                                            <Tooltip title="Remove Author">
                                                                <Fab color="primary" size="small" onClick={() => remove(index)}>
                                                                    <RemoveIcon />
                                                                </Fab>
                                                            </Tooltip>
                                                        </InputAdornment>
                                                    </Box>
                                                )}
                                            </Stack>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </FieldArray>

                        <TextField
                            select
                            InputLabelProps={{ shrink: true }}
                            value={values.level}
                            name="level"
                            label="Level of Publication"
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
                            {configData.PUBLICATION_LEVELS.map((e, index) => (
                                <MenuItem key={index} value={e}>
                                    {e}
                                </MenuItem>
                            ))}
                        </TextField>

                        {values.type === 'Conference' && (
                            <>
                                <TextField
                                    fullWidth
                                    margin="normal"
                                    type="date"
                                    label="From Date"
                                    InputLabelProps={{ shrink: true }}
                                    name="fromDate"
                                    value={values.fromDate}
                                    onChange={handleChange}
                                />

                                <TextField
                                    fullWidth
                                    margin="normal"
                                    type="date"
                                    label="To Date"
                                    InputLabelProps={{ shrink: true }}
                                    error={Boolean(touched.toDate && errors.toDate)}
                                    name="toDate"
                                    value={values.toDate}
                                    onChange={handleChange}
                                />
                                <>
                                    {touched.toDate && errors.toDate && (
                                        <FormHelperText error id="toDate-error">
                                            {' '}
                                            {errors.toDate}{' '}
                                        </FormHelperText>
                                    )}
                                </>

                                <TextField
                                    fullWidth
                                    margin="normal"
                                    label="Conference name"
                                    name="conferenceName"
                                    value={values.conferenceName}
                                    onChange={handleChange}
                                />

                                <TextField
                                    fullWidth
                                    margin="normal"
                                    label="Organizer name"
                                    name="organizer"
                                    value={values.organizer}
                                    onChange={handleChange}
                                />

                                <TextField fullWidth margin="normal" label="City" name="city" value={values.city} onChange={handleChange} />

                                <TextField
                                    fullWidth
                                    margin="normal"
                                    label="State"
                                    name="state"
                                    value={values.state}
                                    onChange={handleChange}
                                />

                                <TextField
                                    fullWidth
                                    margin="normal"
                                    label="Country"
                                    name="country"
                                    value={values.country}
                                    onChange={handleChange}
                                />
                            </>
                        )}

                        <TextField
                            fullWidth
                            margin="normal"
                            label="Publisher name"
                            error={Boolean(touched.publisher && errors.publisher)}
                            name="publisher"
                            value={values.publisher}
                            onChange={handleChange}
                        />

                        {touched.publisher && errors.publisher && (
                            <FormHelperText error id="publisher-error">
                                {' '}
                                {errors.publisher}{' '}
                            </FormHelperText>
                        )}

                        <TextField fullWidth margin="normal" label="Pages" name="pages" value={values.pages} onChange={handleChange} />

                        <TextField
                            fullWidth
                            margin="normal"
                            label="Digital Object Identifier"
                            name="doi"
                            value={values.doi}
                            onChange={handleChange}
                        />

                        <TextField
                            fullWidth
                            margin="normal"
                            label="ISBN/ISSN Number"
                            name="isbn"
                            value={values.isbn}
                            onChange={handleChange}
                        />

                        <TextField
                            fullWidth
                            margin="normal"
                            type="date"
                            label="Publication date"
                            InputLabelProps={{ shrink: true }}
                            name="publicationDate"
                            value={values.publicationDate}
                            onChange={handleChange}
                        />
                        {values.type !== 'Conference' && (
                            <>
                                <TextField fullWidth margin="normal" label="Link" name="link" value={values.link} onChange={handleChange} />

                                <TextField
                                    fullWidth
                                    margin="normal"
                                    label="Volume No"
                                    name="volumeNo"
                                    value={values.volumeNo}
                                    onChange={handleChange}
                                />
                                <TextField
                                    fullWidth
                                    margin="normal"
                                    label="Publication No"
                                    name="publicationNo"
                                    value={values.publicationNo}
                                    onChange={handleChange}
                                />
                                <TextField
                                    fullWidth
                                    margin="normal"
                                    label="Impact Factor Value (Latest)"
                                    name="impactFactor"
                                    value={values.impactFactor}
                                    onChange={handleChange}
                                />
                                <TextField
                                    fullWidth
                                    margin="normal"
                                    label="Impact Factor Year"
                                    name="impactYear"
                                    value={values.impactYear}
                                    onChange={handleChange}
                                />
                                <TextField
                                    fullWidth
                                    margin="normal"
                                    label="Impact Factor Agency"
                                    name="impactAgency"
                                    value={values.impactAgency}
                                    onChange={handleChange}
                                />

                                <TextField
                                    fullWidth
                                    margin="normal"
                                    label="H Index"
                                    name="hIndex"
                                    value={values.hIndex}
                                    onChange={handleChange}
                                />
                            </>
                        )}

                        {values.type === 'Conference' && (
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Affiliating institute name"
                                name="institute"
                                value={values.institute}
                                onChange={handleChange}
                            />
                        )}

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
                                {researchPaper ? 'Update' : 'Add'}
                            </Button>
                        </Box>
                    </form>
                )}
            </Formik>
        </MainCard>
    );
};

export default AddResearchPaper;
