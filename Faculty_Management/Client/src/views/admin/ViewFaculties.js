import React, { useEffect, useState } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { format } from 'date-fns';

import { makeStyles } from '@material-ui/styles';
import { DataGrid } from '@material-ui/data-grid';
import { useConfirm } from 'material-ui-confirm';
import { FormControlLabel, Switch, FormGroup, Button, Stack } from '@material-ui/core';

import configData from './../../config';
import MainCard from '../../ui-component/cards/MainCard';

const axios = require('axios');
const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiDataGrid-columnHeaderCheckbox .MuiDataGrid-columnHeaderTitleContainer': {
            display: 'none'
        }
    }
}));

const ViewEmployees = (props) => {
    const [selectedEmployee, setSelectedEmployee] = useState([]);
    const account = useSelector((state) => state.account);
    const [employees, setEmployees] = useState([]);
    const [isWorking, setIsWorking] = useState(true);

    const classes = useStyles();
    const history = useHistory();
    const confirm = useConfirm();

    const handleOnChange = () => {
        setIsWorking(!isWorking);
        fetchFaculties(!isWorking);
    };

    const fetchFaculties = async (isWorking) => {
        const fetched = await axios.get(configData.API_SERVER + 'admin/get-faculties/' + (isWorking ? '1' : '0'), {
            headers: { 'x-auth-token': account.token }
        });
        for (let i = 0; i < fetched.data.faculties.length; i++) {
            let j = format(new Date(fetched.data.faculties[i].JoinDate), 'dd MMM , yyyy');
            fetched.data.faculties[i].JoinDate = j;
        }
        setEmployees(fetched.data.faculties);
    };

    const onEditClick = () => {
        const employee = employees.find((e) => {
            return e.id === selectedEmployee[0];
        });
        history.push({ pathname: '/admin/edit-faculty', state: employee, replace: true });
    };
    const onDeleteClick = () => {
        const employee = employees.find((e) => {
            return e.id === selectedEmployee[0];
        });
        confirm({ description: `"${employee.FirstName + ' ' + employee.LastName}" will be permanently deleted.` }).then(() => {
            axios
                .post(
                    configData.API_SERVER + 'admin/delete-faculty',
                    { id: selectedEmployee[0] },
                    {
                        headers: { 'x-auth-token': account.token }
                    }
                )
                .then((response) => {
                    if (response.success) {
                        fetchFaculties(isWorking);
                    }
                });
        });
    };

    useEffect(() => {
        fetchFaculties(isWorking);
    }, [employees]);

    const columns = [
        { field: 'Username', headerName: 'Email', flex: 1 },
        { field: 'FirstName', headerName: 'First name', flex: 1 },
        { field: 'LastName', headerName: 'Last name', flex: 1 },
        { field: 'DeptName', headerName: 'Department', flex: 1 },
        { field: 'Designation', headerName: 'Designation', flex: 1 },
        { field: 'JoinDate', headerName: 'Join Date', flex: 1 }
    ];
    return (
        <>
            <MainCard
                title="View Faculties"
                secondary={
                    <FormGroup>
                        <Stack direction="row" spacing={2} alignItems="center">
                            {selectedEmployee.length > 0 && (
                                <>
                                    <Button variant="contained" onClick={onEditClick} size="medium">
                                        Edit
                                    </Button>
                                    <Button color="error" variant="contained" onClick={onDeleteClick} size="medium">
                                        Delete
                                    </Button>
                                </>
                            )}
                            <FormControlLabel onChange={handleOnChange} control={<Switch defaultChecked />} label="Working" />
                        </Stack>
                    </FormGroup>
                }
            >
                <div style={{ height: 650, width: '100%', backgroundColor: 'white' }}>
                    <DataGrid
                        rows={employees}
                        className={classes.root}
                        columns={columns}
                        selectionModel={selectedEmployee}
                        textAlign="center"
                        checkboxSelection={isWorking}
                        hideFooterSelectedRowCount
                        onSelectionModelChange={(selection) => {
                            if (selection.length > 1) {
                                const selectionSet = new Set(selectedEmployee);
                                const result = selection.filter((s) => !selectionSet.has(s));

                                setSelectedEmployee(result);
                            } else {
                                setSelectedEmployee(selection);
                            }
                        }}
                    />
                </div>
            </MainCard>
        </>
    );
};
export default ViewEmployees;
