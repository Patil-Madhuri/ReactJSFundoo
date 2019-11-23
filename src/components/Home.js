import React, { Component } from 'react';
import ToggleDisplay from 'react-toggle-display';
import menu from '../assets/icons/menu.svg';
import refresh from '../assets/icons/refresh.svg';
import listview from '../assets/icons/listview.svg';
import apps from '../assets/icons/apps.svg';
import notification from '../assets/icons/notification.svg';
import account from '../assets/icons/account.svg';
import notes from '../assets/icons/notes.svg';
import reminders from '../assets/icons/reminders.svg';
import trash from '../assets/icons/trash.svg';
import archive from '../assets/icons/archive.svg';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Button from '@material-ui/core/Button';
import { Navbar } from 'mdbreact';
import IconButton from '@material-ui/core/IconButton';
import Drawer from 'material-ui/Drawer';
import { Card } from '@material-ui/core';
import Note from './Note';
var userCtrl = require('../controllers/UserCtrl.js');
var noteCtrl = require('../controllers/NoteCtrl.js');

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            open: false,
            show: true,
            name : null,
            email : null
         };         
        this.handleToggle = this.handleToggle.bind(this);

    }
    handleClick() {
        this.setState({
            show: !this.state.show,
            notes: [],

        });
    }
    componentDidMount() {
        var self = this;
        noteCtrl.getNotes(function (notesList) {
            self.setState({ notes: notesList });
        });
    }

    handleToggle = () => this.setState({ open: !this.state.open });

    getUserData =() =>{
        var name = localStorage.getItem('name');
        var email = localStorage.getItem('email');
        console.log(name);
        console.log(email);      
        this.setState({
            name : name,
            email : email
        })
    }
    render() {
        
        return (
            <div>
                
                <Navbar className="homeBar">
                    <IconButton className={this.props.button} aria-label="Delete" onClick={this.handleToggle}>
                        <img src={menu} alt="menu" />
                    </IconButton>

                    <span className="title">Google Keep</span>
                    <span>
                        <input className="form-control mr-sm-2 searchBar" type="text" placeholder="Search" />
                    </span>

                    <IconButton className={this.props.button} aria-label="Delete">
                        <img src={refresh} alt="refresh" />
                    </IconButton>

                    <IconButton className={this.props.button} aria-label="Delete">
                        <img src={listview} alt="listview" />
                    </IconButton>

                    <IconButton className={this.props.button} aria-label="Delete">
                        <img src={apps} alt="apps" />
                    </IconButton>

                    <IconButton className={this.props.button} aria-label="Delete">
                        <img src={notification} alt="notification" />
                    </IconButton>

                    <IconButton className={this.props.button} aria-label="Delete" onClick={() => {this.handleClick();this.getUserData()}}>
                        <img src={account} alt="account" />
                    </IconButton>
                </Navbar>

              
              <Note />
                {/******************************************SideBar*********************************************/}
                <MuiThemeProvider>
                    <div >
                        <Drawer open={this.state.open} containerStyle={{ top: 64 }} >
                                <Button  href="/home/notes" className="{this.props.button} sidebarBtn" style={{'textTransform': 'initial'}}>
                                 <img src={notes} alt="notes" className="noteBtn"  />
                                    Notes
                            </Button>

                                <Button  href="" className="{this.props.button} sidebarBtn"  style={{'textTransform': 'initial'}}>
                                    <img src={reminders} alt="Reminders" className="reminderBtn"/>
                                    Reminders
                            </Button>

                                <Button href="/home/archive" className="{this.props.button} sidebarBtn"  style={{'textTransform': 'initial'}}>
                                <img src={archive} alt="Archive" className="archiveBtn" />
                                    Archive
                            </Button>
                                <Button href="/home/trash" className="{this.props.button} sidebarBtn"  style={{'textTransform': 'initial'}}>
                                <img src={trash} alt="Trash" className="trashBtn" />
                                    Trash
                            </Button>
                        </Drawer>
                    </div>
                </MuiThemeProvider>

                  {/******** SignOut Card *******/}
                  <div>
                <ToggleDisplay if={!this.state.show} > 
                    <Card className="signout-card">
                        {this.state.name}
                        <br />
                        {this.state.email}
                    </Card>
                    </ToggleDisplay>
                </div>

            </div>
        );
    }
}

export default Home;