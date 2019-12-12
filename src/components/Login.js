import React from 'react';
import '../App.css';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export default function Login(props) {

    return (
        <div className="login-page">
            <Paper className={'login-paper'}>
                {/* <div className='login-title'>
                    <Typography variant="h5" component="h3">
                        Login
                    </Typography>
                </div> */}
                <div className='login-content'>
                    <TextField label="login" variant="outlined" fullWidth />
                </div>
                <div className='login-actions'>
                    <Button variant="contained"  color="primary">da</Button>
                </div>
            </Paper>
        </div>
    )
}