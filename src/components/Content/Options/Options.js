import React from 'react';
import '../../../App.css';
import DeleteIcon from '@material-ui/icons/Delete';

export default function Options(props) {

    return (
        <div className="options" dir="rtl">
            <DeleteIcon onClick={props.delete}/>
        </div>
    )
}