import { React, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
// material-ui
import { Grid, Link, Button } from '@material-ui/core';
import MuiTypography from '@material-ui/core/Typography';
import configData from './../../../config';
// project imports
import SubCard from './../../../ui-component/cards/SubCard';
import MainCard from './../../../ui-component/cards/MainCard';
import { gridSpacing } from './../../../store/constant';
// import EventForm from './../forms/EventForm';
import axios from 'axios';

import { useSelector } from 'react-redux';

//==============================|| TYPOGRAPHY ||==============================//

const ViewEvents = () => {
    const account = useSelector((state) => state.account);
    const [data, setData] = useState([]);
    const history = useHistory();

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
    }, []);

    return (
        <MainCard title="View Events (Attended)">
            <Grid container spacing={gridSpacing}>
                {data.map((ele) => (
                    <Grid item xs={12} sm={6} key={ele.id}>
                        <SubCard
                            title={`${ele.EventTitle} ( ${ele.EventType} )`}
                            onClick={() => {
                                history.push({ pathname: '/event-attended/update-event', state: ele, replace: true });
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
        </MainCard>
    );
};

export default ViewEvents;
