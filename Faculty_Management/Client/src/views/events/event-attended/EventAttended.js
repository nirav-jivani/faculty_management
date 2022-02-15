import { React, useState, useEffect } from 'react';
// material-ui
import { Grid, Link, Button } from '@material-ui/core';
import MuiTypography from '@material-ui/core/Typography';
import configData from './../../../config';
// project imports
import SubCard from './../../../ui-component/cards/SubCard';
import MainCard from './../../../ui-component/cards/MainCard';
import { gridSpacing } from './../../../store/constant';
// import EventForm from './../forms/EventForm';
import FDPForm from './../forms/FDPForm';
import axios from 'axios';

import { useSelector } from 'react-redux';

//==============================|| TYPOGRAPHY ||==============================//

const EventAttended = () => {
    const account = useSelector((state) => state.account);
    const [passData, setPassData] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [btnText, setBtnText] = useState('Add Event');
    const [data, setData] = useState([]);

    const getEvents = () => {
        axios
            .get(configData.API_SERVER + 'events/get-events', {
                headers: { 'x-auth-token': account.token }
            })
            .then((response) => {
                setData(response.data);
            });
    };

    useEffect(() => {
        getEvents();
    }, [btnText]);

    const handleOnClick = () => {
        setPassData(null);
        showForm === true ? setBtnText('Add Event') : setBtnText('Show Events');
        setShowForm(!showForm);
    };
    return (
        <MainCard
            title="Event Attended"
            secondary={
                <Button onClick={handleOnClick} variant="contained" fullWidth size="small">
                    {btnText}
                </Button>
            }
        >
            {showForm && <FDPForm passData={passData} changeFunc={handleOnClick} />}
            {!showForm && (
                <Grid container spacing={gridSpacing}>
                    {data.map((ele) => (
                        <Grid item xs={12} sm={6} key={ele.id}>
                            <SubCard
                                title={`${ele.EventTitle} ( ${ele.EventType} )`}
                                onClick={() => {
                                    setPassData(ele);
                                    showForm === true ? setBtnText('Add Event') : setBtnText('Show Events');
                                    setShowForm(!showForm);
                                }}
                            >
                                <Grid container direction="column" spacing={1}>
                                    <Grid item>
                                        <MuiTypography variant="subtitle1" gutterBottom>
                                            {`Conducted By : ${ele.SpeakerName}`}
                                        </MuiTypography>
                                    </Grid>

                                    <Grid item>
                                        <MuiTypography variant="subtitle2" gutterBottom>
                                            {` At : ${ele.OrganizedAt} `}
                                        </MuiTypography>
                                    </Grid>

                                    <Grid item>
                                        <MuiTypography variant="subtitle2" gutterBottom>
                                            {` Date : ${ele.StartDate} - ${ele.EndDate}  `}
                                        </MuiTypography>
                                    </Grid>
                                </Grid>
                            </SubCard>
                        </Grid>
                    ))}
                </Grid>
            )}
        </MainCard>
    );
};

export default EventAttended;
