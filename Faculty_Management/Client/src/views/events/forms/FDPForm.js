import React from 'react';

// material-ui
import { makeStyles } from '@material-ui/styles';
import {
    Card,
    Box,
    TextField,
    MenuItem,
    FormControl,
    Radio,
    RadioGroup,
    FormLabel,
    FormControlLabel,
    Switch,
    FormGroup,
    Stack,
    Button,
    Checkbox
} from '@material-ui/core';

// import { Fab, AddIcon, EditIcon, FavoriteIcon, NavigationIcon } from '@material-ui/material';

// project imports
//import MainCard from './../../ui-component/cards/MainCard';
import SecondaryAction from './../../../ui-component/cards/CardSecondaryAction';

// style constant
const useStyles = makeStyles((theme) => ({
    frame: {
        height: 'calc(100vh - 210px)',
        border: '1px solid',
        borderColor: theme.palette.primary.light
    }
}));

//=============================|| Sample Form ||=============================//
const currencies = [
    {
        value: 'CE',
        label: 'Computer Engineering'
    },
    {
        value: 'IT',
        label: 'Information Technology'
    },
    {
        value: 'EC',
        label: 'Electronics & Communication'
    }
];

const WorkshopForm = () => {
    const classes = useStyles();

    const [data, SetData] = React.useState({
        title: '',
        factName: '',
        orgBy: '',
        orgAddress: '',
        approvedBy: '',
        mode: 'Online',
        type: 'FDP',
        other: '',
        fromDate: '',
        toDate: '',
        duration: '',
        acedamicYear: '',
        filePath: ''
    });
    const [currency, setCurrency] = React.useState('CE');
    const handleChange = (event) => {
        setCurrency(event.target.value);
    };

    const [mode, setMode] = React.useState('Online');
    const [switchBtn, setSwitchBtnValue] = React.useState(true);
    const [radio, setRadioValue] = React.useState('');

    const handleChange2 = (event) => {
        setSwitchBtnValue(!switchBtn);
        console.log(switchBtn);
    };
    const handleChange3 = (event) => {
        console.log(event.target.checked);
        console.log(event.target.value);
        if (event.target.checked) {
            setRadioValue(event.target.value);
        }
        console.log(radio);
    };
    const handleModeChange = (event) => {
        setMode(event.target.value);
        console.log(mode);
    };
    return (
        <>
            <TextField fullWidth label="Title of The Programme" id="fullWidth" />
            <br />
            <br />
            <br />
            <TextField fullWidth label="Name of The Faculty" id="fullWidth" />
            <br />
            <br />
            <br />
            <TextField fullWidth label="Organized by " id="fullWidth" />
            <br />
            <br />
            <br />
            <TextField fullWidth id="standard-multiline-static" label="Organization Address" multiline rows={4} variant="outlined" />
            <br />
            <br />
            <br />
            <TextField fullWidth label="Programme Approved/Sponsored by" id="fullWidth" />
            <br />
            <br />
            <br />

            <FormControl component="fieldset">
                <FormLabel component="legend">Mode of Conduct</FormLabel>
                <RadioGroup aria-label="Mode" name="controlled-radio-buttons-group" value={mode} onChange={handleModeChange}>
                    <FormControlLabel value="Online" control={<Radio />} label="Online" />
                    <FormControlLabel value="Offline" control={<Radio />} label="Offline" />
                </RadioGroup>
            </FormControl>
            <br />
            <br />
            <FormControl component="fieldset">
                <FormLabel component="legend">Type of Programme</FormLabel>
                <RadioGroup aria-label="Type" name="controlled-radio-buttons-group" value={mode} onChange={handleModeChange}>
                    <FormControlLabel value="FDP" control={<Radio />} label="FDP" />
                    <FormControlLabel value="Workshop" control={<Radio />} label="Workshop" />
                    <FormControlLabel value="Seminar" control={<Radio />} label="Seminar" />
                    <FormControlLabel value="STTP" control={<Radio />} label="STTP" />
                    <FormControlLabel value="Webinar" control={<Radio />} label="Webinar" />
                    <FormControlLabel value="Any Other" control={<Radio />} label="Any Other" />
                </RadioGroup>
            </FormControl>
            <br />
            <br />
            <br />
            <TextField fullWidth label="Type of programme if other than FDP/STTP/Workshop/Seminar" id="fullWidth" />
            <br />
            <br />
            <br />

            <TextField label="From Date" InputLabelProps={{ shrink: true }} type="date" id="fullWidth" />
            <br />
            <br />
            <br />

            <TextField label="To Date" InputLabelProps={{ shrink: true }} type="date" id="fullWidth" />
            <br />
            <br />
            <br />
            <TextField fullWidth label="Duration (in Days)" id="fullWidth" />
            <br />
            <br />
            <br />

            <TextField fullWidth label="Academic Year" id="fullWidth" />
            <br />
            <br />
            <br />
            <TextField fullWidth label="Scanned Copy of Certificate" InputLabelProps={{ shrink: true }} type="file" id="fullWidth" />

            <br />
            <br />
            <br />
            <Button variant="contained" fullWidth size="large">
                Submit
            </Button>
        </>
    );
};

export default WorkshopForm;
