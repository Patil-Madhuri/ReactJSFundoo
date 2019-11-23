import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import IconButton from '@material-ui/core/IconButton';
import morevert from '../assets/icons/morevert.svg';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Home from './Home';
var noteCtrl = require('../controllers/NoteCtrl.js');

class TrashNotes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notes: [],
            anchorEl: null
        }
    }
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
    render() {
        var noteKey, note;
        const { anchorEl } = this.state;
        return (
            Object.keys(this.state.notes).map((key) => {
                noteKey = key;
                note = this.state.notes[key];

                if (note.isTrash === true) {
                    return (
                        <div>
                            <Home />

                            <Card className="note-card" >
                                <div> {note.NoteTitle}
                                </div>
                                <div>{note.NoteDesc}</div>
                                    <div>
                                        <IconButton className={this.props.button} aria-label="More Vert" aria-owns={this.state.anchorEl ? 'menu' : null}
                                            aria-haspopup="true"
                                            onClick={(event) => this.handleClick(event)}>
                                            <img src={morevert} alt="menu" />
                                        </IconButton>
                                        <Menu id="menu"
                                            anchorEl={anchorEl}
                                            open={Boolean(anchorEl)}
                                            onClose={this.handleClose}>
                                            <MenuItem onClick={(event) => { this.handleClick(event); noteCtrl.deleteNoteForever(noteKey, note); this.handleClose() }}>Delete Forever</MenuItem>
                                            <MenuItem onClick={(event) => { this.handleClick(event); noteCtrl.isTrashNote(noteKey, note); this.handleClose() }}>Restore</MenuItem>
                                        </Menu>
                                    </div>
                            </Card >
                        </div >
                    );
                }
                else {
                    <Home />
                }
            })
        )
    }

}

export default TrashNotes;