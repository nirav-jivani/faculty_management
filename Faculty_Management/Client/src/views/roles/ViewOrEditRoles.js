import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { useConfirm } from 'material-ui-confirm';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Button, Box } from '@material-ui/core';

import configData from './../../config';
import MainCard from '../../ui-component/cards/MainCard';

const axios = require('axios');

const ViewOrEditRoles = (props, { ...others }) => {
    const account = useSelector((state) => state.account);
    const history = useHistory();
    const location = useLocation();
    const confirm = useConfirm();

    const [employee, setEmployee] = useState(location.state);
    const [roles, setRoles] = useState([]);
    const [checkedRoles, setCheckedRoles] = useState();

    const [isEdit, setIsEdit] = useState(false);

    const fetchRoles = async () => {
        const response = await axios.get(configData.API_SERVER + 'admin/get-roles/' + employee.id, {
            headers: { 'x-auth-token': account.token }
        });
        if (response.data.success) {
            let temp1 = response.data.roles;
            var obj = {};
            for (var i = 0; i < temp1.length; i++) {
                obj[temp1[i].id] = response.data.empRoles.includes(temp1[i].RoleName);
            }
            setCheckedRoles(obj);
            setRoles(temp1);
        }
    };

    const onSaveClick = () => {
        confirm({ description: `New roles will be assigned to "${employee.FirstName + ' ' + employee.LastName}".` }).then(() => {
            axios
                .post(
                    configData.API_SERVER + 'admin/update-roles',
                    { id: employee.id, roles: checkedRoles },
                    {
                        headers: { 'x-auth-token': account.token }
                    }
                )
                .then((response) => {
                    if (response.data.success) {
                        props.setAlertMessage('Saved successfully');
                        setIsEdit(!isEdit);
                    }
                });
        });
    };
    const onEditClick = () => {
        setIsEdit(!isEdit);
    };

    useEffect(() => {
        fetchRoles();
    }, []);

    const handleOnChange = (r) => {
        let t = checkedRoles[r.id];
        setCheckedRoles((prev) => {
            return { ...prev, [r.id]: !t };
        });
    };

    return (
        <>
            <MainCard title="Roles">
                {isEdit ? (
                    <h4>Assign new roles to {`"${employee.FirstName} ${employee.LastName}"`}</h4>
                ) : (
                    <h4>Currently assigned roles to {`"${employee.FirstName} ${employee.LastName}"`}</h4>
                )}
                <FormGroup>
                    {roles.map((r) => (
                        <FormControlLabel
                            control={<Checkbox onChange={() => handleOnChange(r)} disabled={!isEdit} checked={checkedRoles[r.id]} />}
                            label={r.RoleName}
                        />
                    ))}
                </FormGroup>
                <Box sx={{ mt: 2 }}>
                    {isEdit ? (
                        <Button variant="contained" onClick={onSaveClick} size="medium">
                            Save
                        </Button>
                    ) : (
                        <Button variant="contained" onClick={onEditClick} size="medium">
                            Edit
                        </Button>
                    )}
                </Box>
            </MainCard>
        </>
    );
};
export default ViewOrEditRoles;
