import { React, useState } from 'react';
// material-ui
import { Grid, Link, Button } from '@material-ui/core';
import MuiTypography from '@material-ui/core/Typography';

// project imports
import SubCard from './../../../ui-component/cards/SubCard';
import MainCard from './../../../ui-component/cards/MainCard';
import { gridSpacing } from './../../../store/constant';
import WorkshopForm from './../forms/WorkshopForm';
//==============================|| TYPOGRAPHY ||==============================//

const EventConducted = () => {
    const [showForm, setShowForm] = useState(false);
    const [btnText, setBtnText] = useState('Add Workshop');
    const handleOnClick = () => {
        showForm === true ? setBtnText('Add Workshop') : setBtnText('Show Workshops');
        setShowForm(!showForm);
    };
    return (
        <MainCard
            title="Workshops Conducted"
            secondary={
                <Button onClick={handleOnClick} variant="contained" fullWidth size="small">
                    {btnText}
                </Button>
            }
        >
            {showForm && <WorkshopForm />}
            {!showForm && (
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12} sm={6}>
                        <SubCard title="Competitive Coding">
                            <Grid container direction="column" spacing={1}>
                                <Grid item>
                                    <MuiTypography variant="subtitle1" gutterBottom>
                                        subtitle1. Lorem ipsum dolor sit connecter adieu siccing eliot. Quos blanditiis tenetur
                                    </MuiTypography>
                                </Grid>
                                <Grid item>
                                    <MuiTypography variant="subtitle2" gutterBottom>
                                        subtitle2. Lorem ipsum dolor sit connecter adieu siccing eliot. Quos blanditiis tenetur
                                    </MuiTypography>
                                </Grid>
                            </Grid>
                        </SubCard>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <SubCard title="Competitive Coding">
                            <Grid container direction="column" spacing={1}>
                                <Grid item>
                                    <MuiTypography variant="subtitle1" gutterBottom>
                                        subtitle1. Lorem ipsum dolor sit connecter adieu siccing eliot. Quos blanditiis tenetur
                                    </MuiTypography>
                                </Grid>
                                <Grid item>
                                    <MuiTypography variant="subtitle2" gutterBottom>
                                        subtitle2. Lorem ipsum dolor sit connecter adieu siccing eliot. Quos blanditiis tenetur
                                    </MuiTypography>
                                </Grid>
                            </Grid>
                        </SubCard>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <SubCard title="Competitive Coding">
                            <Grid container direction="column" spacing={1}>
                                <Grid item>
                                    <MuiTypography variant="subtitle1" gutterBottom>
                                        subtitle1. Lorem ipsum dolor sit connecter adieu siccing eliot. Quos blanditiis tenetur
                                    </MuiTypography>
                                </Grid>
                                <Grid item>
                                    <MuiTypography variant="subtitle2" gutterBottom>
                                        subtitle2. Lorem ipsum dolor sit connecter adieu siccing eliot. Quos blanditiis tenetur
                                    </MuiTypography>
                                </Grid>
                            </Grid>
                        </SubCard>
                    </Grid>
                </Grid>
            )}
        </MainCard>
    );
};

export default EventConducted;
