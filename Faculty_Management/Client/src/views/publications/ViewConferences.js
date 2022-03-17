import { React, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

// material-ui
import { useConfirm } from 'material-ui-confirm';
import { makeStyles } from '@material-ui/styles';
import { DataGrid, GridToolbarExport, GridToolbarContainer } from '@material-ui/data-grid';
import { Button, Stack } from '@material-ui/core';

// project imports
import configData from './../../config';
import MainCard from './../../ui-component/cards/MainCard';

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
            <GridToolbarExport csvOptions={{ allColumns: true, fileName: configData.EXPORTED_FILENAMES.reaserch_paper_conference }} />
        </GridToolbarContainer>
    );
};

const ViewConferences = (props) => {
    const classes = useStyles();
    const confirm = useConfirm();
    const account = useSelector((state) => state.account);
    const [conferences, setConferences] = useState([]);
    const [selectedConference, setSelectedConference] = useState([]);

    const history = useHistory();

    const getConferences = () => {
        axios
            .get(configData.API_SERVER + 'publications/get-conferences', {
                headers: { 'x-auth-token': account.token }
            })
            .then((response) => {
                setConferences(response.data);
            });
    };

    useEffect(() => {
        getConferences();
    }, []);

    const onEditClick = () => {
        let conference = conferences.find((e) => e.id === selectedConference[0]);
        conference.type = 'Conference';
        history.push({ pathname: '/publications/edit-conference', state: conference, replace: true });
    };

    const onDeleteClick = async () => {
        const conference = conferences.find((e) => e.id === selectedConference[0]);
        confirm({ description: `Conference "${conference.ConferenceTitle}" will be permanently deleted.` }).then(() => {
            axios
                .post(
                    configData.API_SERVER + 'publications/delete-conference',
                    { id: selectedConference[0] },
                    {
                        headers: { 'x-auth-token': account.token }
                    }
                )
                .then((response) => {
                    if (response.data.success) {
                        setConferences((prev) => prev.filter((e) => e.id !== conference.id));
                        props.setAlertMessage('Deleted Successfully');
                    }
                });
        });
    };

    const columns = [
        { field: 'ResearchTitle', headerName: 'Research Paper Title', flex: 1 },
        { field: 'Publisher', headerName: 'Punblisher', flex: 1 },
        { field: 'PublicationDate', headerName: 'Publication Date', hide: true },
        { field: 'ConferenceTitle', headerName: 'Conference Title', flex: 1 },
        { field: 'ConferenceName', headerName: 'Conference Name', flex: 1 },
        { field: 'Organizer', headerName: 'Organizer', hide: true },
        { field: 'StartDate', headerName: 'Start Date', hide: true },
        { field: 'EndDate', headerName: 'End Date', hide: true },
        { field: 'Level', headerName: 'Level', hide: true },
        { field: 'City', headerName: 'City', hide: true },
        { field: 'State', headerName: 'State', hide: true },
        { field: 'Country', headerName: 'Country', hide: true },
        { field: 'Pages', headerName: 'Pages', hide: true },
        { field: 'DOI', headerName: 'Digital Object Identifier', hide: true },
        { field: 'ISBN', headerName: 'ISBN/ISSN', hide: true },
        { field: 'AffiliatingInstitute', headerName: 'Affiliating Institute', hide: true },
        { field: 'AcademicYear', headerName: 'Academic Year', flex: 1 }
    ];

    return (
        <MainCard
            title="View Conferences"
            secondary={
                <Stack direction="row" spacing={2} alignItems="center">
                    {selectedConference.length > 0 && (
                        <>
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
                {conferences.length > 0 && (
                    <DataGrid
                        components={{
                            Toolbar: Export
                        }}
                        rows={conferences}
                        className={classes.root}
                        columns={columns}
                        selectionModel={selectedConference}
                        textAlign="center"
                        checkboxSelection
                        hideFooterSelectedRowCount
                        onSelectionModelChange={(selection) => {
                            if (selection.length > 1) {
                                const selectionSet = new Set(selectedConference);
                                const result = selection.filter((s) => !selectionSet.has(s));
                                setSelectedConference(result);
                            } else {
                                setSelectedConference(selection);
                            }
                        }}
                    />
                )}
            </div>
        </MainCard>
    );
};

export default ViewConferences;
