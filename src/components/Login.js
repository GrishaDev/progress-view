import React from 'react';
import '../App.css';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';

let name='';

export default function Login(props) {

    const [disabled, setDisabled] = React.useState(true);

    React.useEffect(()=>{
        document.title="Login";
    })
    
    function onInput(e){
        name = e.target.value;
        if(name.length === 0)
            setDisabled(true);
        else
            setDisabled(false);
    }

    function keyPress(e){
        if(e.keyCode === 13 && name.length > 0){
            submitHandle();
         }
    }
    async function submitHandle(){
        try{
            let res = await axios.post('/api/auth',{user: name});
            if(res.status)
                window.location.href='/app';
            else
                alert("error");
        }
        catch{
            alert("error");
        }
    }

    return (
        <div className="login-page">
            <Paper className={'login-paper'}>
                <div className='login-content'>
                    <TextField label="Name" variant="outlined" type="password" fullWidth onKeyDown={keyPress} onChange={onInput} autoFocus/>
                </div>
                <div className='login-actions'>
                    <Button variant="contained"  color="primary" disabled={disabled} onClick={submitHandle}>Enter</Button>
                </div>
            </Paper>
        </div>
    )
}