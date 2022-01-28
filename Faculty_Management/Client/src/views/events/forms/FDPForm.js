import React from 'react';
import { useSelector } from 'react-redux';

import axios from 'axios';
import configData from '../../../config';


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

import { handle } from 'express/lib/application';

// import { Fab, AddIcon, EditIcon, FavoriteIcon, NavigationIcon } from '@material-ui/material';

// style constant
const useStyles = makeStyles((theme) => ({
    frame: {
        height: 'calc(100vh - 210px)',
        border: '1px solid',
        borderColor: theme.palette.primary.light
    }
}));

//=============================|| Sample Form ||=============================//

const WorkshopForm = () => {
    // const classes = useStyles();
    const account = useSelector((state) => state.account);
    const [data, setData] = React.useState({
        fact_id: account.user.Id,
        title: '',
        factName: '',
        organizedBy: '',
        organizedAt: '',
        approvedBy: '',
        mode: 'Online',
        type: 'FDP',
        other: '',
        fromDate: '',
        toDate: '',
        duration: '',
        academicYear: '',
        filePath: ''
    });

    // const [mode, setMode] = React.useState('Online');
    // const [switchBtn, setSwitchBtnValue] = React.useState(true);
    // const [radio, setRadioValue] = React.useState('');

    // const handleChange2 = (event) => {
    //     setSwitchBtnValue(!switchBtn);
    //     console.log(switchBtn);
    // };
    // const handleChange3 = (event) => {
    //     console.log(event.target.checked);
    //     console.log(event.target.value);
    //     if (event.target.checked) {
    //         setRadioValue(event.target.value);
    //     }
    //     console.log(radio);
    // };

    const handleOnChange = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };

    const handleOnClick = (event) => {
        event.preventDefault();
        axios({
            method: 'post', //you can set what request you want to be
            url: configData.API_SERVER + 'events/add-event',
            data: data,
            headers: {
              'x-auth-token': account.token
            }
          })
        // axios
        //     .post(configData.API_SERVER + 'events/add-event', data, { 'x-auth-token' : account.token})
        //     .then(response => {
        //         console.log(response);
        //     })
        //     .catch(err => {
        //         console.log(err);
        //     });
    }

    return (
        <>
            <TextField fullWidth label="Title of the programme" name="title" value={data.title} onChange={handleOnChange} />
            <br />
            <br />
            <br />
            <TextField fullWidth label="Name of the faculty" name="factName" value={data.factName} onChange={handleOnChange} />
            <br />
            <br />
            <br />
            <TextField fullWidth label="Organized by" name="organizedBy" value={data.organizedBy} onChange={handleOnChange} />
            <br />
            <br />
            <br />
            <TextField fullWidth label="Organized at" multiline rows={4} variant="outlined" name="organizedAt" value={data.organizedAt} onChange={handleOnChange} />
            <br />
            <br />
            <br />
            <TextField fullWidth label="Programme approved/sponsored by" name="approvedBy" value={data.approvedBy} onChange={handleOnChange} />
            <br />
            <br />
            <br />
            <FormControl component="fieldset">
                <FormLabel component="legend">Mode of conduct</FormLabel>
                <RadioGroup aria-label="mode" name="mode" value={data.mode} onChange={handleOnChange}>
                    <FormControlLabel value="Online" control={<Radio />} label="Online" />
                    <FormControlLabel value="Offline" control={<Radio />} label="Offline" />
                </RadioGroup>
            </FormControl>
            <br />
            <br />
            <FormControl component="fieldset">
                <FormLabel component="legend">Type of programme</FormLabel>
                <RadioGroup aria-label="type" name="type" value={data.type} onChange={handleOnChange}>
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
            <TextField fullWidth label="Type of programme if other than FDP/STTP/Workshop/Seminar" name="other" value={data.other} onChange={handleOnChange} />
            <br />
            <br />
            <br />
            <TextField label="From date" InputLabelProps={{ shrink: true }} type="date" name="fromDate" value={data.fromDate} onChange={handleOnChange} />
            <br />
            <br />
            <br />
            <TextField label="To date" InputLabelProps={{ shrink: true }} type="date" name="toDate" value={data.toDate} onChange={handleOnChange} />
            <br />
            <br />
            <br />
            <TextField fullWidth label="Duration (in days)" name="duration" value={data.duration} onChange={handleOnChange} />
            <br />
            <br />
            <br />
            <TextField fullWidth label="Academic year" name="academicYear" value={data.academicYear} onChange={handleOnChange} />
            <br />
            <br />
            <br />
            <TextField fullWidth label="Scanned Copy of Certificate" InputLabelProps={{ shrink: true }} type="file" />
            <br />
            <br />
            <br />
            <Button variant="contained" fullWidth size="large" onClick={handleOnClick}>
                Submit
            </Button>
        </>
    );
};

export default WorkshopForm;
