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
            <GridToolbarExport csvOptions = {{ allColumns: true, fileName : configData.EXPORTED_FILENAMES.reaserch_paper_journal }} />
        </GridToolbarContainer>
    );
}

const ViewJournals = (props) => {
    const classes = useStyles();
    const confirm = useConfirm();
    const account = useSelector((state) => state.account);
    const [journals, setJournals] = useState([]);
    const [selectedJournal, setSelectedJournal] = useState([]);
    
    const history = useHistory();
    
    const getConferences = () => {
        axios
        .get(configData.API_SERVER + 'publications/get-journals', {
            headers: { 'x-auth-token': account.token }
        })
        .then((response) => {
            console.log(response.data)
            setJournals(response.data);
            });
    };
    
    useEffect(() => {
        getConferences();
    }, []);

    const onEditClick = () => {
        let journal = journals.find((e) => e.id === selectedJournal[0]);
        journal.type = 'Journal';
        history.push({ pathname: '/publications/edit-journal', state: journal, replace: true });
    };
    
    const onDeleteClick = async () => {
        const journal = journals.find((e) => e.id === selectedJournal[0]);
        confirm({ description: `Journal "${journal.JournalTitle}" will be permanently deleted.` }).then(() => {
            axios
            .post(
                configData.API_SERVER + 'publications/delete-journal',
                    { id: selectedJournal[0] },
                    {
                        headers: { 'x-auth-token': account.token }
                    }
                )
                .then((response) => {
                    if (response.data.success) {
                        props.setAlertMessage('Deleted Successfully');
                    }
                });
        });
    };
    
    const columns = [
        { field: 'ResearchTitle', headerName: 'Research Paper Title', flex: 1 },
        { field: 'Publisher', headerName: 'Punblisher', flex: 1 },
        { field: 'PublicationDate', headerName: 'Publication Date', hide: true },
        { field: 'JournalTitle', headerName: 'Journal Title', flex: 1 },
        { field: 'Link', headerName: 'Link', hide: true },
        { field: 'Level', headerName: 'Level', hide: true },
        { field: 'Pages', headerName: 'Pages', hide: true },
        { field: 'VolumeNo', headerName: 'Volume No', hide: true },
        { field: 'PublicationNo', headerName: 'Publication No', hide: true },
        { field: 'DOI', headerName: 'Digital Object Identifier', hide: true },
        { field: 'ISBN', headerName: 'ISBN/ISSN', hide: true },
        { field: 'ImpactFactor', headerName: 'Impact Factor', hide: true },
        { field: 'ImpactFactorYear', headerName: 'Impact Factor Year', hide: true },
        { field: 'ImpactFactorAgency', headerName: 'Impact Factor Agency', hide: true },
        { field: 'HIndex', headerName: 'H-Index', hide: true },
        { field: 'AcademicYear', headerName: 'Academic Year', flex: 1 },
    ];

    return (
        <MainCard
            title="View Journals"
            secondary={
                <Stack direction="row" spacing={2} alignItems="center">
                    {selectedJournal.length > 0 && (
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
                <DataGrid
                    components={{
                        Toolbar: Export
                    }}
                    rows={journals}
                    className={classes.root}
                    columns={columns}
                    selectionModel={selectedJournal}
                    textAlign="center"
                    checkboxSelection
                    hideFooterSelectedRowCount
                    onSelectionModelChange={(selection) => {
                        if (selection.length > 1) {
                            const selectionSet = new Set(selectedJournal);
                            const result = selection.filter((s) => !selectionSet.has(s));
                            setSelectedJournal(result);
                        } else {
                            setSelectedJournal(selection);
                        }
                    }}
                />
            </div>
        </MainCard>
    );
};

export default ViewJournals;
