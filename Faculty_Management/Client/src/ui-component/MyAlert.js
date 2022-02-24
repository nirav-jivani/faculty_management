import { React } from 'react';

import { Alert, Snackbar } from '@material-ui/core';

const MyAlert = (props) => {
    const handleAlertClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        props.setMessage('');
    };

    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
            }}
            open={props.message !== ''}
            autoHideDuration={4000}
            onClose={handleAlertClose}
        >
            <Alert variant="filled" onClose={handleAlertClose}>
                {props.message}
            </Alert>
        </Snackbar>
    );
};

export default MyAlert;
