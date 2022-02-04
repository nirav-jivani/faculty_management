import React, { useEffect, useState } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import configData from './../../config';
import MainCard from '../../ui-component/cards/MainCard';
import { format } from 'date-fns';
import { useSelector } from 'react-redux';

import { FormControlLabel, Switch, FormGroup, Button } from '@material-ui/core';

const axios = require('axios');

const ViewEmployees = () => {
    const account = useSelector((state) => state.account);
    const [employees, setEmployees] = useState([]);
    const [isWorking, setIsWorking] = useState(true);

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

    useEffect(async () => {
        fetchFaculties(isWorking);
    }, []);

    const columns = [
        { field: 'Username', headerName: 'Email', width: 230 },
        { field: 'FirstName', headerName: 'First name', width: 250 },
        { field: 'LastName', headerName: 'Last name', width: 250 },
        { field: 'DeptName', headerName: 'Department', width: 250 },
        { field: 'Designation', headerName: 'Designation', width: 250 },
        { field: 'JoinDate', headerName: 'Join Date', width: 230 }
    ];
    return (
        <>
            <MainCard
                title="View Faculties"
                secondary={
                    <FormGroup>
                        <FormControlLabel onChange={handleOnChange} control={<Switch defaultChecked />} label="Working" />
                    </FormGroup>
                }
            >
                <div style={{ height: 650, width: '100%', backgroundColor: 'white' }}>
                    <DataGrid
                        rows={employees}
                        columns={columns}
                        pageSize={10}
                        textAlign="center"
                        rowsPerPageOptions={[10]}
                        checkboxSelection
                    />
                </div>
            </MainCard>
        </>
    );
};
export default ViewEmployees;
