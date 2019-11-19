import React from 'react';
// import { Link } from 'react-router-dom';
import './Note.css'
import 'bootstrap/dist/css/bootstrap.css'

const NoteCard = (props) => {
    const handleClick = function(){
        props.click()
    }
    return (
        <button className="btn note-card" onClick={handleClick.bind(this)}>
                <div className="card-body">
                    <h5 className="text-left text-capitalize">{props.title}</h5>
                </div>
        </button>
    )
}

export default NoteCard;