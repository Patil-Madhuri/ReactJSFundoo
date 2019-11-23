import React, { Component } from 'react';
import ToggleDisplay from 'react-toggle-display';
import Card from '@material-ui/core/Card';
import Home from '../components/Home';
import IconButton from '@material-ui/core/IconButton';
import list from '../assets/icons/list.svg';
import image from '../assets/icons/image.svg';
import pin from '../assets/icons/pin.svg';
import reminders from '../assets/icons/reminders.svg';
import addUser from '../assets/icons/addUser.svg';
import color from '../assets/icons/color.svg';
import archive from '../assets/icons/archive.svg';
import morevert from '../assets/icons/morevert.svg';
import { Button } from '@material-ui/core';
import DisplayNotes from '../components/DisplayNotes';
var noteCtrl = require('../controllers/NoteCtrl.js');

const style = {
    pinIcon: {
        marginLeft: 455,
        marginTop: -65
    },
    closeBtn: {
        marginTop: -70,
        marginLeft: 410
    }
}

class Note extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: true
        }; 
    }
       
    handleClick() {
        this.setState({
            show: !this.state.show
        });
    }

    render() {

        return (
            <div>
                {/* <Home /> */}
                {/************** Title Card ***********/}
                <ToggleDisplay show={this.state.show}>
                    <div className="firstCard" >
                        <Card style={{ 'height': '65px' }}>
                            <input type="text" placeholder="Title" className="form-control titleInput" onClick={() => this.handleClick()} />

                            <div className="firstCardIconBtn">
                                <IconButton className={this.props.button} aria-label="Delete">
                                    <img src={list} alt="list" />
                                </IconButton>
                                <IconButton className={this.props.button} aria-label="Delete">
                                    <img src={image} alt="images" />
                                </IconButton>
                            </div>
                        </Card>
                    </div>
                </ToggleDisplay>

                {/************ Create Note Card **********/}
                <ToggleDisplay if={!this.state.show} >
                    <div className="secondCard">
                        <Card style={{ 'height': '150px' }}>
                            <input type="text" placeholder="Title" className="form-control inputTitle" id="noteTitle" />
                            <IconButton className={this.props.button} aria-label="Delete" style={style.pinIcon} >
                                <img src={pin} alt="pin" />
                            </IconButton>
                            <input type="text" placeholder="Take a note..." className="form-control inputTitle" id="noteDesc" />
                            <div className="noteIcons">
                                <div>
                                    <IconButton className={this.props.button} aria-label="Reminder" >
                                        <img src={reminders} alt="reminders" />
                                    </IconButton>

                                    <IconButton className={this.props.button} aria-label="Collaborator" >
                                        <img src={addUser} alt="collaboraters" />
                                    </IconButton>

                                    <IconButton className={this.props.button} aria-label="Color">
                                        <img src={color} alt="color" />
                                    </IconButton>

                                    <IconButton className={this.props.button} aria-label="image"  >
                                        <img src={image} alt="image1" />
                                    </IconButton>

                                    <IconButton className={this.props.button} aria-label="Archive">
                                        <img src={archive} alt="archive" />
                                    </IconButton>

                                    <IconButton className={this.props.button} aria-label="More Vert"  >
                                        <img src={morevert} alt="archive" />
                                    </IconButton>
                                </div>
                                <Button className={this.props.button} style={style.closeBtn} onClick={() => { this.handleClick(); noteCtrl.createNote() }}>Close</Button>

                            </div>
                        </Card>
                    </div>
                </ToggleDisplay>

                {/************** Display Notes **************/}
                <div>
                    <DisplayNotes />
                </div>
            </div>
        );
    }
}


export default Note;
