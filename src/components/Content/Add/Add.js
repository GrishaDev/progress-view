import React from 'react';
import '../../../App.css';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import AddDialog from './AddDialog/AddDialog';

export default function Add(props){

    const [open, setOpen] = React.useState(false);

    const dialogClick = () => {
       setOpen(true);
    }; 

    const dialogClose = () => {
        setOpen(false);
    };

    function dialogDone(date,value,category, graph, special, special_data){
        props.newValue(date,value,category,graph, special, special_data);
        dialogClose();
    }

    return (
        <div className="add-div">
            <Fab color="primary" aria-label="add" onClick={dialogClick}>
                <AddIcon/>
            </Fab>
            <AddDialog open={open} dialogClose={dialogClose} title={props.title} newValue={dialogDone} category={props.category}
            graph={props.graph} gym={props.gym}/>
        </div>
    );
}
