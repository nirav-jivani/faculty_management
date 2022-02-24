import { React, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import FileViewer from 'react-file-viewer';

// material-ui
import { useConfirm } from 'material-ui-confirm';
import MuiTypography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';
import { DataGrid } from '@material-ui/data-grid';
import { Link, FormControlLabel, Switch, FormGroup, Button, Stack } from '@material-ui/core';
// project imports
import configData from './../../../config';
import MainCard from './../../../ui-component/cards/MainCard';
import { gridSpacing } from './../../../store/constant';
// import EventForm from './../forms/EventForm';
import axios from 'axios';

import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiDataGrid-columnHeaderCheckbox .MuiDataGrid-columnHeaderTitleContainer': {
            display: 'none'
        }
    }
}));

//==============================|| TYPOGRAPHY ||==============================//

const ViewEvents = () => {
    const classes = useStyles();
    const confirm = useConfirm();
    const account = useSelector((state) => state.account);
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState([]);
    const [isFileAvailable, setIsFileAvailable] = useState(false);

    const history = useHistory();

    const getEvents = () => {
        axios
            .get(configData.API_SERVER + 'events/get-events-organized', {
                headers: { 'x-auth-token': account.token }
            })
            .then((response) => {
                setEvents(response.data);
            });
    };

    useEffect(() => {
        getEvents();
    }, [events]);

    const onEditClick = () => {
        const event = events.find((e) => e.id === selectedEvent[0]);
        history.push({ pathname: '/event-organized/update-event', state: event, replace: true });
    };

    const onDeleteClick = async () => {
        const event = events.find((e) => e.id === selectedEvent[0]);
        confirm({ description: `Event "${event.EventTitle}" will be permanently deleted.` }).then(() => {
            axios
                .post(
                    configData.API_SERVER + 'events/delete-event-organized',
                    { id: selectedEvent[0] },
                    {
                        headers: { 'x-auth-token': account.token }
                    }
                )
                .then((response) => {
                    if (response.success) {
                        window.alert('Deleted Successfully');
                    }
                });
        });
    };

    const onViewClick = () => {
        axios(configData.API_SERVER + `events/get-certificate-event-organized/${selectedEvent[0]}`, {
            method: 'GET',
            responseType: 'blob',
            headers: { 'x-auth-token': account.token }
        }).then((response) => {
            if (response.data) {
                const filepath = window.URL.createObjectURL(response.data);
                window.open(filepath);
            }
        });
    };

    const columns = [
        { field: 'EventTitle', headerName: 'Title', flex: 1 },
        { field: 'EventTopic', headerName: 'Topic', flex: 1 },
        { field: 'EventType', headerName: 'Event Type', flex: 1 },
        { field: 'AcademicYear', headerName: 'Academic Year', flex: 1 }
    ];

    return (
        <MainCard
            title="View Events (Organized)"
            secondary={
                <Stack direction="row" spacing={2} alignItems="center">
                    {selectedEvent.length > 0 && (
                        <>
                            {isFileAvailable && (
                                <Button variant="contained" onClick={onViewClick} size="medium">
                                    View Certificate
                                </Button>
                            )}
                            <Button variant="contained" onClick={onEditClick} size="medium">
                                Edit
                            </Button>
                            <Button color="error" onClick={onDeleteClick} variant="contained" size="medium">
                                Delete
                            </Button>
                        </>
                    )}
                </Stack>
            }
        >
            <div style={{ height: 650, width: '100%', backgroundColor: 'white' }}>
                <DataGrid
                    rows={events}
                    className={classes.root}
                    columns={columns}
                    selectionModel={selectedEvent}
                    textAlign="center"
                    checkboxSelection
                    hideFooterSelectedRowCount
                    onSelectionModelChange={(selection) => {
                        if (selection.length > 1) {
                            const selectionSet = new Set(selectedEvent);
                            const result = selection.filter((s) => !selectionSet.has(s));
                            setSelectedEvent(result);

                            if (result.length !== 0) {
                                const event = events.find((e) => e.id === result[0]);
                                console.log(event);
                                event.ProofPath !== '' ? setIsFileAvailable(true) : setIsFileAvailable(false);
                            }
                        } else {
                            if (selection.length !== 0) {
                                const event = events.find((e) => e.id === selection[0]);
                                event.ProofPath !== '' ? setIsFileAvailable(true) : setIsFileAvailable(false);
                            }
                            setSelectedEvent(selection);
                        }
                    }}
                />
            </div>
        </MainCard>
    );
};

export default ViewEvents;
