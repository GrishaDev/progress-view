import React from 'react';
import '../../App.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import FormDialog from './Dialog/Dialog';
import Fab from '@material-ui/core/Fab';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

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

    function logout(){
        window.location.href='/';
    }

    let menu_items=[];
    let categories = [];
    let graphs = [];

    let graphs_button;

    if(props.data.length > 0){
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
        graphs_button= <Button color="inherit" onClick={handleClick}>Graphs</Button>;
    }

    return (
        <div className='header-root'>
            <AppBar position="static">
                <Toolbar>
                    {/* <IconButton edge="start" className='header-button' color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton> */}

                    {/* <Typography variant="h6" className='logo-title'>
                        Hey
                    </Typography> */}
                    {/* <Fab color="primary" aria-label="add" onClick={logout}> */}
                        <ArrowBackIcon className="leave"  onClick={logout} />
                    {/* </Fab> */}

                    <Typography variant="h6" className='header-title'>
                        {props.title}
                    </Typography>
                    <Button color="inherit" onClick={dialogClick}>Add</Button>
                    {graphs_button}
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
