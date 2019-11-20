import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Note from '../../components/notes/Note';
import './Notes.css';
import '../../animate.css'
import FullNote from '../../components/fullNote/FullNote';
import axios from 'axios';

class Home extends Component {
    constructor() {
        super()
        this.state = {
            allNotes: [],
            isLoaded: false,
            error: null,
            post: '',
            maxId: 0,
            width: 0,
            height: 0
        }

        this.refreshBrowserHandler = this.refreshBrowserHandler.bind(this);
    }
    Loadingstyle = {
        position: 'absolute',
        width: '100%',
        textAlign: 'center',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)'
    }
    fullNoteStyle = {
        display: 'none'
    }
    componentDidMount() {
        window.addEventListener('resize', this.showDimensions)
        axios.get('https://my-json-server.typicode.com/ashefor/notes-app/posts')
            .then((response) => {
                const max = Math.max.apply(null, response.data.map(s => s.id));
                this.setState({
                    allNotes: response.data,
                    isLoaded: true,
                    maxId: max
                });
            }).catch(error => {
                this.setState({
                    isLoaded: true,
                    error
                })
            })
    }
    showDimensions = () => {
        this.setState(prevState => {
            if (prevState.width !== window.innerWidth) {
                return {
                    width: window.innerWidth
                }
            }
        })
        const righSection = document.querySelector('.righSection')
        const leftsection = document.querySelector('.notesTitleSection')
        if (leftsection) {
            if (this.state.width > 767) {
                leftsection.classList.remove('d-none');
                leftsection.classList.add('d-block');
                righSection.classList.remove('d-none');
                righSection.classList.add('d-block');
            } else if (this.state.width < 768 && leftsection.classList.contains('d-block')) {
                righSection.classList.remove('d-block');
                righSection.classList.add('d-none');
            }
        }
    }
    componentDidUpdate() {
        this.showDimensions();
        window.addEventListener('resize', this.showDimensions);
        this.setState(prevState => {
            const maxi = Math.max.apply(null, prevState.allNotes.map(s => s.id));
            if (maxi !== this.state.maxId) {
                return {
                    maxId: maxi
                }
            }
        })
    }
    backButtonHandler = () => {
        const righSection = document.querySelector('.righSection')
        const leftsection = document.querySelector('.notesTitleSection')
        leftsection.classList.remove('d-none');
        leftsection.classList.add('animated', 'fadeInLeft', 'faster');
        righSection.classList.remove('d-block', 'animated', 'fadeInLeft', 'faster');
        righSection.classList.add('d-none');
    }
    noteClickhandler = (id, index) => {
        const nodeList = Array.from(document.querySelectorAll('.note-card'));
        nodeList.forEach(node => {
            node.classList.remove('active');
        })
        nodeList[index].classList.add('active');
        this.setState(prevState => {
            const found = prevState.allNotes.find(p => p.id === id);
            return {
                post: found
            }
        })
        const leftsection = document.querySelector('.notesTitleSection');
        const righSection = document.querySelector('.righSection')
        if (leftsection && this.state.width < 768) {
            leftsection.classList.remove('animated', 'fadeInLeft', 'faster');
            leftsection.classList.add('d-none');
            righSection.classList.remove('d-none');
            righSection.classList.add('animated', 'fadeInLeft', 'faster');
        }
    }
    refreshBrowserHandler() {
        window.location.reload();
    }

    addNewNoteHandler = () => {
        this.setState({
            post: {
                body: '',
                title: '',
                created: Date.now()
            }
        })
    }
    callNewPostFromChild = (post) => {
        this.setState(prevState => {
            const index = prevState.allNotes.findIndex(note => note.id === post.id)
            if (index !== -1) {
                prevState.allNotes.splice(index, 1, post);
                return {
                    allNotes: prevState.allNotes
                }
            } else {
                prevState.allNotes.push(post);
                return {
                    allNotes: [...prevState.allNotes]
                }
            }
        })
    }

    render() {
        const { allNotes, isLoaded, error, post, maxId } = this.state;
        let renderPost = null;
        if (error) {
            renderPost = <div style={this.Loadingstyle}>
                <span
                    style={{ color: 'red' }}>
                    Error: {error.message}
                </span> - <span
                    style={{ color: 'green', textDecoration: 'underline', cursor: 'pointer' }}
                    onClick={this.refreshBrowserHandler}>Try again</span></div>
        } else if (!isLoaded) {
            renderPost = <div style={this.Loadingstyle}>Loading Notes...</div>
        } else {
            renderPost = (
                <>
                    <section className="col-md-4 notesTitleSection h-100">
                        <div className="notesDiv">
                            {
                                allNotes.map((note, index) => <Note style={this.style}
                                    click={() => this.noteClickhandler(note.id, index)}
                                    key={note.id}
                                    title={note.title}
                                    date={note.created}
                                    id={note.id}
                                    body={note.body} />)
                            }
                        </div>
                    </section>
                    <section className="col-md-6 h-100 righSection d-none">
                        <FullNote post={post}
                            onChildClick={this.callNewPostFromChild}
                            maxId={maxId}
                            goBack={this.backButtonHandler} />
                    </section>
                </>
            )
        }
        return (
            <div className="container-fluid">
                <div className="row no-gutters notecontainer">
                    <div className="col-md-2">
                        <div className="app-title">
                            <div className="text-center add-note">
                                <h4>Notes</h4>
                                <button
                                    onClick={this.addNewNoteHandler}
                                    className="btn btn-outline-primary">Add new note
                                </button>
                            </div>
                        </div>
                    </div>
                    {renderPost}
                </div>
            </div>
        )
    }
}

export default Home;