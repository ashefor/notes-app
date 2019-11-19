import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Note from '../../components/notes/Note';
import './Notes.css'
import FullNote from '../../components/fullNote/FullNote';
import axios from 'axios';

class Home extends Component {
    constructor() {
        super()
        this.state = {
            allNotes: [],
            isLoaded: false,
            error: null,
            post: {}
        }
    }
    style = {
        backgroundColor: 'black'
    }
    componentDidMount() {
        axios.get('https://my-json-server.typicode.com/ashefor/notes-app/posts')
            .then((response) => {
                this.setState({
                    allNotes: response.data,
                    isLoaded: true,
                });
            }).catch(error => {
                this.setState({
                    isLoaded: true,
                    error
                })
            })
    }
    noteClickhandler = (id) => {
        this.setState(prevState => {
            const found = prevState.allNotes.find(p => p.id === id);
            return {
                post: found
            }
        })
    }
    render() {
        const { allNotes, isLoaded, error, post } = this.state;
        let renderPost = null;
        if (error) {
            renderPost = <div>Error: {error.message}</div>
        } else if (!isLoaded) {
            renderPost = <div>loading...</div>
        } else {
            renderPost = (
                <div className="notesDiv">
                    {
                        allNotes.map((note) => <Note style={this.style}
                            click={() => this.noteClickhandler(note.id)}
                            key={note.id}
                            title={note.title}
                            id={note.id}
                            body={note.body} />)
                    }
                </div>
            )
        }
        return (
            <div className="container-fluid">
                <div className="row no-gutters notecontainer">
                    <div className="col-md-2">
                        <h4 >Notes</h4></div>
                    <section className="col-md-4 notesTitleSection h-100">
                        {renderPost}
                    </section>
                    <section className="col-md-6 h-100">
                        <FullNote post={post} />
                    </section>
                </div>
            </div>
        )
    }
}

export default Home;