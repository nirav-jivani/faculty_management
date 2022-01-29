import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useState } from 'react';
import { useHistory } from 'react-router';
// material-ui
import { useTheme } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { Divider, Grid, Stack, Typography, useMediaQuery } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { Switch } from '@material-ui/core';
import { FormGroup } from '@material-ui/core';
import { Radio, RadioGroup } from '@material-ui/core';
import { FormControlLabel, FormControl, FormLabel } from '@material-ui/core';
// // project imports
// import AuthWrapper1 from './../AuthWrapper1';
// import AuthCardWrapper from './../AuthCardWrapper';
import MainCard from '../../ui-component/cards/MainCard';
import AuthFooter from './../../ui-component/cards/AuthFooter';

// assets

//===============================|| AUTH3 - REGISTER ||===============================//
const axios = require('axios');
function Register() {
    const [mode, setMode] = useState(true);
    const [file, setFile] = useState(null);
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));
    const history = useHistory();
    const [user, setUser] = useState({
        firstname: '',
        middlename: '',
        lastname: '',
        yoe: '',
        username: '',
        password: '',
        joindate: '',
        birthdate: '',
        leavedate: '',
        gender: '',
        userType: '',
        initials: ''
    });
    function HandleInput(e) {
        // document.getElementById("error").hidden=true;
        let name = e.target.name;
        let value = e.target.value;
        setUser({ ...user, [name]: value });
    }
    async function Register_Clicked(e) {
        console.log('aayo');
        e.preventDefault();
        let fetched = await axios.post('/register', user);
        console.log(fetched);
        if (fetched.status === 201) {
            document.getElementById('error_grid').hidden = false;
        } else if (fetched.data.message === 'Success') {
            localStorage.setItem('userData', JSON.stringify(fetched.data.user));
            history.replace('/Home/index');
        } else {
            console.log(fetched.data.user);
            localStorage.setItem('userData', JSON.stringify(fetched.data.user));
            history.push('/dashboard/default');
        }
    }
    function Mode_Change(e) {
        setMode(!mode);
    }
    function fileUpload(e) {
        setFile(e.target.files[0]);
        console.log(file);
    }
    async function Register_Clicked_File(e) {
        e.preventDefault();
        let formData = new FormData();
        formData.append('file', file);
        formData.append('data', 'jaydev');
        console.log(file);
        console.log(formData);
        let fetched = await axios.post('/registerEmployeesUsingFile', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        if (fetched.data.message != null) {
            console.log('success');
        } else {
            history.push('/home/index');
        }
    }
    return (
        <MainCard title="Register Employees">
            <Grid xs={12} display={'flex'} justifyContent={'flex-end'}>
                <FormGroup>
                    <FormControlLabel control={<Switch defaultChecked onChange={Mode_Change} />} label="Manually" />
                </FormGroup>
            </Grid>
            {mode && (
                <>
                    <div>
                        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Grid item xs={6}>
                                <TextField
                                    name="username"
                                    InputLabelProps={{ required: true }}
                                    onChange={HandleInput}
                                    InputProps={{ style: { fontSize: 20, width: '98%' } }}
                                    label="Email"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    name="password"
                                    onChange={HandleInput}
                                    type={'password'}
                                    InputProps={{ style: { fontSize: 20 } }}
                                    label="Password"
                                    fullWidth
                                    id="fullWidth"
                                />
                            </Grid>
                        </Grid>
                        <br />

                        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Grid item xs={4}>
                                <TextField
                                    name="firstname"
                                    InputLabelProps={{ required: true }}
                                    onChange={HandleInput}
                                    InputProps={{ style: { fontSize: 20, width: '98%' } }}
                                    label="Firstname"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    name="middlename"
                                    onChange={HandleInput}
                                    InputProps={{ style: { fontSize: 20, width: '98%' } }}
                                    label="Middlename"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    name="lastname"
                                    InputLabelProps={{ required: true }}
                                    onChange={HandleInput}
                                    InputProps={{ style: { fontSize: 20 } }}
                                    label="Lastname"
                                    fullWidth
                                />
                                <br />
                                <br />
                            </Grid>
                        </Grid>

                        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-end' }}>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    name="birthdate"
                                    InputLabelProps={{ shrink: true, required: true }}
                                    onChange={HandleInput}
                                    InputProps={{ style: { fontSize: 20, width: '98%' } }}
                                    type={'date'}
                                    fullWidth
                                    label="Birth Date"
                                    id="fullWidth"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    name="joindate"
                                    InputLabelProps={{ shrink: true, required: true }}
                                    onChange={HandleInput}
                                    InputProps={{ style: { fontSize: 20 } }}
                                    type="date"
                                    fullWidth
                                    label="Join Date"
                                    id="fullWidth"
                                />
                                <br />
                                <br />
                            </Grid>
                        </Grid>
                        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Grid item xs={4}>
                                <TextField
                                    fullWidth
                                    name="yoe"
                                    InputLabelProps={{ required: true }}
                                    onChange={HandleInput}
                                    InputProps={{ style: { fontSize: 20, width: '98%' } }}
                                    fullWidth
                                    label="Year of Experience"
                                    id="fullWidth"
                                />
                                <br />
                                <br />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    fullWidth
                                    name="initials"
                                    onChange={HandleInput}
                                    InputProps={{ style: { fontSize: 20, width: '98%' } }}
                                    fullWidth
                                    label="Initials"
                                    id="fullWidth"
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    fullWidth
                                    name="userType"
                                    InputLabelProps={{ required: true }}
                                    onChange={HandleInput}
                                    InputProps={{ style: { fontSize: 20 } }}
                                    fullWidth
                                    label="User Type"
                                    id="fullWidth"
                                />
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Gender</FormLabel>
                                <RadioGroup aria-label="gender" name="controlled-radio-buttons-group">
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <FormControlLabel
                                            name="gender"
                                            onChange={HandleInput}
                                            value="F"
                                            control={<Radio />}
                                            label="Female"
                                        />
                                        <FormControlLabel name="gender" onChange={HandleInput} value="M" control={<Radio />} label="Male" />
                                    </div>
                                </RadioGroup>
                            </FormControl>
                            <Grid item xs={12}>
                                <Divider />
                            </Grid>
                        </Grid>
                        <Button onClick={Register_Clicked} fullWidth size="large" type="submit" variant="contained" color="secondary">
                            Register
                        </Button>
                    </div>
                    <div></div>
                </>
            )}
            {!mode && (
                <>
                    {/* <form method='post' encType='multipart/form-data'> */}
                    <input
                        style={{
                            width: '100%',
                            textDecoration: 'none',
                            backgroundColor: 'grey',
                            color: '#fff',
                            fontSize: '20px',
                            borderRadius: '4px'
                        }}
                        type="file"
                        name="file"
                        id="file"
                        onChange={fileUpload}
                        class="inputfile"
                        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                    />
                    <br />
                    <br />
                    <Button onClick={Register_Clicked_File} fullWidth size="large" type="submit" variant="contained" color="secondary">
                        Register
                    </Button>
                    {/* </form> */}
                </>
            )}
        </MainCard>
    );
}

export default Register;
