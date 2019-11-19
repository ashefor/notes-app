import React from 'react';
import './FullNote.css'

class FullNote extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            postBody: '',
            postTitle: ''
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
                postTitle: props.post.title
            };
        }
        return null;
    }
    render() {
        const { postBody, postTitle } = this.state;
        const { post } = this.props
        if (!post) {
            return <div className="noteBody"> Please select a post</div>
        } else {
            return (
                <article className="noteBody">
                    <div>
                        <h4 className="text-capitalize">{postTitle}</h4>
                        <textarea className="w-100" value={postBody} onChange={this.inputHandler} />
                    </div>
                </article>
            )
        }
    }
}

export default FullNote