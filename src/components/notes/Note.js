import React from 'react';
// import { Link } from 'react-router-dom';
import './Note.css'
import 'bootstrap/dist/css/bootstrap.css'

const NoteCard = (props) => {
    const handleClick = function (index) {
        props.click(index);
    }
    const style = {
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
    }
    return (
        <div className="note-card w-100" onClick={handleClick.bind(this)} >
            <div className="card-body text-left">
                <h5 className="text-capitalize" style={style}>
                    {props.body}
                </h5>
                <span>
                    {new Date(props.date).toLocaleDateString()}
                </span>
            </div>
        </div>
    )
}

export default NoteCard;