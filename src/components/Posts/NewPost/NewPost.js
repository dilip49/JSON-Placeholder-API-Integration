import React, { Component } from 'react'
import axios from 'axios'

class NewForm extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       userId: '',
       title: '',
       body: '',
       post: {}
    }
  }


  changeHandler = (event) =>{
    this.setState({
      [event.target.name] : event.target.value
    })
  }
  
  submitHandler = (e) =>{
    e.preventDefault()
    console.log(this.state)
    axios.post('https://jsonplaceholder.typicode.com/posts', {userId: this.state.userId,
                                                              title: this.state.title, 
                                                              body: this.state.body }
                                                              )
    .then(response => {
      this.setState({post: response.data})
      console.log(response)
    })
    .catch(error => {
      console.log(error)
    })

  }

  render() {
    const {userId, title, body, post} = this.state
    console.log(post)
    return (
      <div>
        <form onSubmit={this.submitHandler}>
          <div>
            <input 
              type="text" 
              name="userId" 
              value={userId} 
              onChange={this.changeHandler}
            />
          </div>
          <div>
            <input 
              type="text" 
              name="title" 
              value={title}
              onChange={this.changeHandler} 
            />
          </div>
          <div>
            <input
             type="text"
             name="body" 
             value={body} 
             onChange={this.changeHandler}
            />
          </div>
          <button type="submit">Submit</button>
        </form>  
            {
              Object.keys(post).length === 0 ? null :
              <div>
                <p>Post Created</p>
            <p>PostId: {post.id}</p>
             
              <p>Title: {post.title}</p>
              <p>Title: {post.body}</p>
              </div>
            }
      </div>
    )
  }
}

export default NewForm
