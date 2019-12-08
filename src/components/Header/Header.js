import React from 'react';
import '../../App.css';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import FormDialog from './Dialog/Dialog';

function Header(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [open, setOpen] = React.useState(false);

    const dialogClick = () => {
       setOpen(true);
    };
    const dialogClose = () => {
        setOpen(false);
    };

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    function handleOption(category,graph) {
        props.onGraphChange(category,graph);
        setAnchorEl(null);
    };

    function dialogDone(category,graph,valueType){
        props.newGraph(category,graph,valueType);
        dialogClose();
    }

    let menu_items=[];
    let categories = [];
    let graphs = [];

    props.data.map((obj,index)=>{
        menu_items.push(<p key={index} className='category-title'>{obj.name}</p>);
        categories.push(obj.name);

        if(obj.graphs.length > 0){
            obj.graphs.map((obj,indexx)=>{
                menu_items.push(<MenuItem key={index + ','+indexx} onClick={ () => handleOption(index,indexx) }>{obj.name}</MenuItem>);
                graphs.push(obj);
            });
        }
    });

    return (
        <div className='header-root'>
            <AppBar position="static">
                <Toolbar>
                    {/* <IconButton edge="start" className='header-button' color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton> */}
                    <Typography variant="h6" className='header-title'>
                        Hey
                    </Typography>
                    <Typography variant="h6" className='header-title'>
                        {props.title}
                    </Typography>
                    <Button color="inherit" onClick={dialogClick}>Add</Button>
                    <Button color="inherit" onClick={handleClick}>Graphs</Button>
                    <FormDialog open={open} dialogClose={dialogClose} categories={categories} newGraph={dialogDone}/>
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        {menu_items}
                    </Menu>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default Header;
