import React, { useEffect, useReducer } from 'react'
import axios from 'axios';
import { useParams, useHistory, Link, useRouteMatch } from 'react-router-dom';
import classes from './post.module.scss';
import Comments from '../../Comments/Comments';
import { Route } from 'react-router-dom';

const initialState = {
  loading: true,
  error: '',
  post: {}
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_POST':
      return {
        loading: false,
        post: action.payload,
        error: ''
      }

    case 'FETCH_ERROR_POST':
      return {
        loading: false,
        error: 'something went wrog',
        post: {}
      }
    default:
      return state;
  }
}


function Post() {
  const [post, dispatch] = useReducer(reducer, initialState);
  const { id } = useParams();
  let match = useRouteMatch();

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts/'+id)
      .then((response) => {
        dispatch({ type: 'FETCH_POST', payload: response.data })
      })
      .catch((response) => {
        dispatch({ type: 'FETCH_ERROR_POST' })
      })
  }, [])

  return (
    <div>
      {post.loading ? 'loading' : 
        <div className="container center" key={post.id}>
          <div className="card">
          <h2>{post.post.id}</h2>
          <small>Title</small>
          <p>{post.post.title}</p>
            <hr/>
            <strong>Descripion</strong>              
            <p>
              {post.post.body}                  
            </p>
            <Link to={`${match.url}/comments`}>Comments</Link>

            <Route path={`${match.url}/comments`} exact component={Comments} />
          </div>
        </div>          
      }
      {post.error ? post.error : null }
       
    </div>
  )
}

export default Post;
