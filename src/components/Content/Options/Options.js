import React from 'react';
import '../../../App.css';
import DeleteIcon from '@material-ui/icons/Delete';
import Wtf from './Wtf/Wtf';

export default function Options(props) {

    const [open, setOpen] = React.useState(false);

    const dialogClick = () => {
       setOpen(true);
    }; 

    const dialogClose = () => {
        setOpen(false);
    };

    const dialogDone = () => {
        props.delete();
        setOpen(false);
    };

    return (
        <div className="options" dir="rtl">
            <DeleteIcon onClick={dialogClick}/>
            <Wtf open={open} dialogClose={dialogClose} dialogDone={dialogDone} title={props.title}/>
        </div>
    )
}