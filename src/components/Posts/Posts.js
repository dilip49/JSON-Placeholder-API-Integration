import React, {useState,useEffect ,useReducer} from 'react'
import axios from 'axios';
import {Link, useHistory} from 'react-router-dom';
import './Posts.scss';

const initialState = {
  loading: true,
  error: '',
  posts: {}
}

const reducer = (state, action) =>{
  switch(action.type){
    case 'FETCH_SUCCESS':
      return {
        loading: false,        
        posts: action.payload,
        error: ''
      }

    case 'FETCH_ERROR':
      return {
        loading: false,
        error: 'something went wrog',
        posts: {}
      } 
   default:
      return state;   
  }
}

function Posts() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const history = useHistory();

  console.log(state)
  
  useEffect(()=>{
    axios.get('https://jsonplaceholder.typicode.com/posts')
    .then((response)=>{
      dispatch({type: 'FETCH_SUCCESS', payload: response.data})      
    })
    .catch((response)=>{
      dispatch({type: 'FETCH_ERROR'})
    })
  }, [])

    function deleteHandler(){
     debugger;
    }

  return (
    <div>
      <h1 style={{textAlign: "center"}}><Link to="/newpost">NewPost</Link></h1>
      {state.loading ? 'loading' : 
        state.posts.map((post)=>{
          return(
            <div className="container center" key={post.id}>
              <div className="card">
              <h2>{post.title}</h2>
                <hr/>              
                <p>
                  {post.body}
                </p> 
               <button onClick={()=> history.push(`/posts/${post.id}`)}>View</button>
               <button onClick={deleteHandler}>Delete</button>
              </div>
            </div>
          )
        })

      }
      {state.error ? state.error : null }
       
    </div>
  )
}

export default Posts
