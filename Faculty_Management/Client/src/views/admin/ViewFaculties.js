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
                        <FormControlLabel onChange={handleOnChange} control={<Switch defaultChecked />} label="Working" />
                    </FormGroup>
                }
            >
                <div style={{ height: 650, width: '100%', backgroundColor: 'white' }}>
                    <DataGrid
                        rows={employees}
                        columns={columns}
                        textAlign="center"
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        rowCount={100}
                        checkboxSelection
                    />
                </div>
            </MainCard>
        </>
    );
};
export default ViewEmployees;
