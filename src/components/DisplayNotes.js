import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import IconButton from '@material-ui/core/IconButton';
import image from '../assets/icons/image.svg';
import pin from '../assets/icons/pin.svg';
import reminders from '../assets/icons/reminders.svg';
import addUser from '../assets/icons/addUser.svg';
import color from '../assets/icons/color.svg';
import archive from '../assets/icons/archive.svg';
import morevert from '../assets/icons/morevert.svg';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Modal from "react-responsive-modal";
var noteCtrl = require('../controllers/NoteCtrl.js');

const style = {
    pinIcon: {
        marginLeft: 246,
        marginTop: -41

    }
}
class DisplayNotes extends Component {

    constructor(props) {
        super(props);
        this.state = {
            notes: [],
            anchorEl: null,
            open: false,
            notettitle: '',
            notedesc: ''
        }
    }
    onOpenModal = () => {
        this.setState({ open: true });
    };

    onCloseModal = () => {
        this.setState({ open: false });
    };
    componentDidMount() {
        var self = this;
        noteCtrl.getNotes(function (notesList) {
            self.setState({ notes: notesList });
        });
    }
    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    render() {
        var noteKey, note;
        const { anchorEl } = this.state;
        const { open } = this.state;
        if (this.state.notes !== null) {
            return (
                Object.keys(this.state.notes).map((key) => {
                    noteKey = key;
                    note = this.state.notes[key];
                    if (note.isPin === true) {
                        return (
                            <div>
                                <div style={{ 'marginLeft': '245px' }}> Pinned Note</div>
                                <Card className="note-card" >
                                    <div>
                                        <div onClick={this.onOpenModal}>{note.NoteTitle}</div>

                                        <IconButton className={this.props.button} aria-label="Pin" style={style.pinIcon} onClick={() => noteCtrl.isPinNote(noteKey, note)}>
                                            <img src={pin} alt="pin" />
                                        </IconButton>
                                    </div>
                                    <div onClick={this.onOpenModal}>{note.NoteDesc}</div>
                                    <div>
                                        <div>
                                            <IconButton className={this.props.button} aria-label="Reminder" aria-owns={this.state.anchorEl ? 'reminderMenu' : null}
                                                aria-haspopup="true"
                                                onClick={(event) => this.handleClick(event)}>
                                                <img src={reminders} alt="reminders" />
                                            </IconButton>

                                            <Menu id="reminderMenu"
                                                anchorEl={anchorEl}
                                                open={Boolean(anchorEl)}
                                                onClose={this.handleClose}>
                                                <MenuItem onClick={(event) => { this.handleClick(event); noteCtrl.isPinNote(noteKey, note); noteCtrl.isTrashNote(noteKey, note); this.handleClose() }}>Delete note</MenuItem>
                                                <MenuItem onClick={this.handleClose}>Add label</MenuItem>
                                            </Menu>
                                            <IconButton className={this.props.button} aria-label="Collaborator" >
                                                <img src={addUser} alt="collaboraters" />
                                            </IconButton>

                                            <IconButton className={this.props.button} aria-label="Color">
                                                <img src={color} alt="color" />
                                            </IconButton>

                                            <IconButton className={this.props.button} aria-label="image"  >
                                                <img src={image} alt="image1" />
                                            </IconButton>

                                            <IconButton className={this.props.button} aria-label="Archive" onClick={() => noteCtrl.isArchiveNote(noteKey, note)}>
                                                <img src={archive} alt="archive" />
                                            </IconButton>
                                            <IconButton className={this.props.button} aria-label="More Vert" aria-owns={this.state.anchorEl ? 'menu' : null}
                                                aria-haspopup="true"
                                                onClick={(event) => this.handleClick(event)}>
                                                <img src={morevert} alt="menu" />
                                            </IconButton>
                                            <Menu id="menu"
                                                anchorEl={anchorEl}
                                                open={Boolean(anchorEl)}
                                                onClose={this.handleClose}>
                                                <MenuItem onClick={(event) => { this.handleClick(event); noteCtrl.isPinNote(noteKey, note); noteCtrl.isTrashNote(noteKey, note); this.handleClose() }}>Delete note</MenuItem>
                                                <MenuItem onClick={this.handleClose}>Add label</MenuItem>
                                            </Menu>
                                        </div>
                                    </div>
                                </Card >
                                <div>
                                    <Modal open={open} onClose={this.onCloseModal} >
                                        <input type="text" className="form-control inputTitle" id="noteTitle" defaultValue={this.state.notettitle}
                                            onChange={e => this.handleChange(e)} />
                                        <input type="text" className="form-control inputTitle" id="noteDesc" defaultValue={this.state.notedesc}
                                            onChange={e => this.handleChange(e)} />
                                    </Modal>
                                </div >
                            </div >
                        );

                    }
                    else {
                        if (note.isPin === false && note.isArchive === false && note.isTrash === false) {
                            return (
                                <div>
                                    <Card className="note-card" >
                                        <div>
                                            <div onClick={this.onOpenModal}>{note.NoteTitle}</div>

                                            <IconButton className={this.props.button} aria-label="Pin" style={style.pinIcon} onClick={() => noteCtrl.isPinNote(noteKey, note)}>
                                                <img src={pin} alt="pin" />
                                            </IconButton>
                                        </div>
                                        <div onClick={this.onOpenModal}>{note.NoteDesc}</div>
                                        <div>
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

                                                <IconButton className={this.props.button} aria-label="Archive" onClick={() => noteCtrl.isArchiveNote(noteKey, note)}>
                                                    <img src={archive} alt="archive" />
                                                </IconButton>
                                                <IconButton className={this.props.button} aria-label="More Vert" aria-owns={this.state.anchorEl ? 'menu' : null}
                                                    aria-haspopup="true"
                                                    onClick={(event) => this.handleClick(event)}>
                                                    <img src={morevert} alt="menu" />
                                                </IconButton>
                                                <Menu id="menu"
                                                    anchorEl={anchorEl}
                                                    open={Boolean(anchorEl)}
                                                    onClose={this.handleClose}>
                                                    <MenuItem onClick={(event) => { this.handleClick(event); noteCtrl.isTrashNote(noteKey, note); this.handleClose() }}>Delete note</MenuItem>
                                                    <MenuItem onClick={this.handleClose}>Add label</MenuItem>
                                                </Menu>
                                            </div>
                                        </div>
                                    </Card >
                                    <div>
                                        <Modal open={open} onClose={this.onCloseModal} >
                                            <input type="text" placeholder="Title" className="form-control inputTitle" id="noteTitle" value={note.NoteTitle} />
                                            <input type="text" placeholder="Take a note..." className="form-control inputTitle" id="noteDesc" value={note.NoteDesc} />
                                        </Modal>
                                    </div >
                                </div >


                            );
                        }
                    }

                })




            );
        } else {
            return <div></div>

        }
    }
}

export default DisplayNotes;