import React, { useEffect, useReducer } from 'react'
import axios from 'axios';
import { useParams, useHistory, Link, useRouteMatch } from 'react-router-dom';
import './Comments.css';

const initialState = {
  loading: true,
  error: '',
  comments: {}
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_COMMENTS':
      return {
        loading: false,
        comments: action.payload,
        error: ''
      }

    case 'FETCH_ERROR_COMMENTS':
      return {
        loading: false,
        error: 'something went wrog',
        comments: {}
      }
    default:
      return state;
  }
}

function Comments() {
  
  const [comments, dispatch] = useReducer(reducer, initialState);
  let match = useRouteMatch();

  console.log(comments)
  console.log(match.url.split("/")[2])

  useEffect(() => {
    axios.get(`https://jsonplaceholder.typicode.com/posts/${match.url.split("/")[2]}/comments`)
      .then((response) => {
        dispatch({ type: 'FETCH_COMMENTS', payload: response.data })
      })
      .catch((response) => {
        dispatch({ type: 'FETCH_ERROR_COMMENTS' })
      })
  }, [])

  return (
    <div>
      <div className="container">
      {comments.loading ? 'loading' : 
        comments.comments.map((comment)=>{
            return(
            <div className="body" key={comment.id}>
                <strong>{comment.id}</strong>
                <small>{comment.email}</small>
            <hr/>
                <span className="tip tip-up">{comment.email}</span>
                <div className="message">
                  <span>{comment.body}</span>
                </div>
            </div>
          )
        })
        }
      </div>
    </div>
  )
}

export default Comments
