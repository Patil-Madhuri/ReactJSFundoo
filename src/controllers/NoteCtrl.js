var firebase = require('../controllers/firebase.js');
var noteCtrl = require('../controllers/NoteCtrl.js')

module.exports = {
    userKey: localStorage.getItem("userKey"),
    createNote: function () {
      
        var notetitle = document.getElementById('noteTitle').value;
        var notedesc = document.getElementById('noteDesc').value;
        var database = firebase.firebase.database();
        if (notetitle !== "" && notedesc !== "") {
            var noteRef = database.ref('notes');
            noteRef.push({
                UserId: this.userKey,
                NoteTitle: notetitle,
                NoteDesc: notedesc,
                isPin : false,
                isTrash : false,
                isArchive : false,
              
            })
        }    
    },
    getNotes:  function (callback) {
        console.log("inside getNotes()");
        
        var database = firebase.firebase.database();
        var noteRef = database.ref('notes');
        var notes;
         noteRef.orderByChild('UserId').equalTo(this.userKey).on('value',function(snapshot) {
                var notesResponse = snapshot.val();
                console.log("Notes: ",notesResponse);
                notes = notesResponse;   
                return callback(notes);
        });
       
     },

    isPinNote(noteKey,note){  
        
        if(note.isPin === false){
            note.isPin = true;
        }        
        else{
            note.isPin = false;
        }
        noteCtrl.updateNote(noteKey,note);
    },

    isArchiveNote(noteKey,note){                
        if(note.isArchive === false){
            note.isArchive = true;
        }        
        else{
            note.isArchive = false;
        }
        noteCtrl.updateNote(noteKey,note);
    },

    isTrashNote(noteKey,note){             
        if(note.isTrash === false){
            note.isTrash = true;
        }        
        else{
            note.isTrash = false;
        }
        noteCtrl.updateNote(noteKey,note);
    },

    deleteNoteForever(noteKey,note){
        var database = firebase.firebase.database();
        var noteRef = database.ref('notes');
        noteRef.child(noteKey).remove();
    }

}
exports.updateNote = (key,note) =>{
    var database = firebase.firebase.database();
        var noteRef = database.ref('notes');
        noteRef.child(key).update(note);
}