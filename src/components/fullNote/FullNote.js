import React from 'react';
import './FullNote.css';
import axios from 'axios'

class FullNote extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            postBody: '',
            postTitle: '',
            createdAt: ''
        };
    }
    inputHandler = (evt) => {
        this.setState({
            postBody: evt.target.value
        })
    }
    static getDerivedStateFromProps(props, state) {
        if (props.post.body !== state.postBody && props.post.title !== state.postTitle) {
            return {
                postBody: props.post.body,
                postTitle: props.post.title,
                createdAt: props.post.created
            };
        }
        return null;
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.post.body !== prevState.postBody && prevProps.post.title !== prevState.postTitle) {
            return {
                postBody: this.props.post.body,
                postTitle: this.props.post.title
            };
        }
        return null;
    }

    savePostHandler = () => {
        const noteID = this.props.post.id;
        const maxId = this.props.maxId;
        if (noteID) {
            const note = {
                body: this.state.postBody,
            }
            axios.patch('https://my-json-server.typicode.com/ashefor/notes-app/posts/' + noteID, note)
                .then(response => {
                    if (response.status === 200) {
                        this.props.onChildClick(response.data)
                    }
                })
        } else {
            const note = {
                id: maxId + 1,
                body: this.state.postBody,
                created: this.state.createdAt,
                title: ''
            }
            axios.post('https://my-json-server.typicode.com/ashefor/notes-app/posts', note)
                .then(response => {
                    if (response.status === 201) {
                        this.props.onChildClick(response.data);
                    }
                })
        }
    }
    render() {
        const { postBody, createdAt } = this.state;
        const { post, goBack } = this.props;
        if (!post) {
            return <div className="noteBody"> Please select a post</div>
        } else {
            return (
                <div>
                    <button onClick={goBack} className="btn btn-sm btn-outline-primary d-block d-md-none my-2 ml-2"><span>Notes</span></button>
                    <article className="noteBody">
                        <div>
                            <div className="text-center">
                                <small>
                                    <span>
                                        {new Date(createdAt).toDateString()}
                                    </span>
                                </small>
                            </div>
                            {/* <h4 className="text-capitalize mt-3 my-3">
                            {postTitle}
                        </h4> */}
                            <div className="mt-4 my-4">
                                <textarea className="w-100" value={postBody} onChange={this.inputHandler} />
                            </div>
                        </div>
                        {postBody.length ?
                            <button style={{ float: 'right' }} onClick={this.savePostHandler} className="btn btn-success">
                                Save
                        </button> : null}
                    </article>
                </div>
            )
        }
    }
}

export default FullNote