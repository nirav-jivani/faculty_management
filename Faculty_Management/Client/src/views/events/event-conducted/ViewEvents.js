import { React, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

// material-ui
import { useConfirm } from 'material-ui-confirm';
import { makeStyles } from '@material-ui/styles';
import { DataGrid, GridToolbarExport, GridToolbarContainer } from '@material-ui/data-grid';
import { Button, Stack } from '@material-ui/core';
// project imports
import configData from './../../../config';
import MainCard from './../../../ui-component/cards/MainCard';

import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiDataGrid-columnHeaderCheckbox .MuiDataGrid-columnHeaderTitleContainer': {
            display: 'none'
        }
    }
}));

//==============================|| TYPOGRAPHY ||==============================//

const Export = () => {
    return (
        <GridToolbarContainer>
            <GridToolbarExport csvOptions={{ allColumns: true, fileName : configData.EXPORTED_FILENAMES.event_conducted }} />
        </GridToolbarContainer>
    );
}

const getType = (params) => {
    if (params.row.EventType == "AnyOther")
        return params.row.OtherType;
    return params.row.EventType
}

const ViewEvents = (props, { ...others }) => {
    const classes = useStyles();
    const confirm = useConfirm();
    const account = useSelector((state) => state.account);
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState([]);
    const [isFileAvailable, setIsFileAvailable] = useState(false);

    const history = useHistory();

    const getEvents = () => {
        axios
            .get(configData.API_SERVER + 'events/get-events-conducted', {
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
        history.push({ pathname: '/event-conducted/update-event', state: event, replace: true });
    };

    const onDeleteClick = async () => {
        const event = events.find((e) => e.id === selectedEvent[0]);
        confirm({ description: `Event "${event.EventTitle}" will be permanently deleted.` }).then(() => {
            axios
                .post(
                    configData.API_SERVER + 'events/delete-event-conducted',
                    { id: selectedEvent[0] },
                    {
                        headers: { 'x-auth-token': account.token }
                    }
                )
                .then((response) => {
                    if (response.data.success) {
                        // setEvents((prev) => {
                        //     return prev.filter((e) => e.id !== event.id);
                        // });
                        props.setAlertMessage('Deleted Successfully');
                    }
                });
        });
    };

    const onViewClick = () => {
        axios(configData.API_SERVER + `events/get-certificate-event-conducted/${selectedEvent[0]}`, {
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
        { field: 'OrganizedBy', headerName: 'Organized By', flex: 1, hide: true },
        { field: 'ConductedAt', headerName: 'Conducted At', flex: 1, hide: true },
        { field: 'TotalParticipants', headerName: 'Total Participants', flex: 1, hide: true },
        { field: 'StartDate', headerName: 'Start Date', flex: 1, hide: true },
        { field: 'EndDate', headerName: 'End Date', flex: 1, hide: true },
        { field: 'Duration', headerName: 'Duration (in days)', flex: 1, hide: true },
        { field: 'EventType', headerName: 'Type', flex: 1, valueGetter: getType },
        { field: 'EventLevel', headerName: 'Level', flex: 1, hide: true },
        { field: 'EventMode', headerName: 'Mode', flex: 1, hide: true },
        { field: 'ApprovedBy', headerName: 'Approved By', flex: 1, hide: true },
        { field: 'AcademicYear', headerName: 'Academic Year', flex: 1 },
    ];

    return (
        <MainCard
            title="View Events (Conducted)"
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
                    components={{
                        Toolbar: Export
                    }}
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
