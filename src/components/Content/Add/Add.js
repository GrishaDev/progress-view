import React from 'react';
import '../../../App.css';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import AddDialog from './AddDialog/AddDialog';
import { getThemeProps } from '@material-ui/styles';

export default function Add(props){

    const [open, setOpen] = React.useState(false);

    const dialogClick = () => {
       setOpen(true);
    }; 

    const dialogClose = () => {
        setOpen(false);
    };


    return (
        <div className="add-div">
            <Fab color="primary" aria-label="add" onClick={dialogClick}>
                <AddIcon/>
            </Fab>
            <AddDialog open={open} dialogClose={dialogClose} title={props.title}/>
        </div>
    );
}
