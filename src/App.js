import React, {Component} from 'react';
import './App.scss';
import { Route, Switch } from 'react-router-dom';
import Posts from './components/Posts/Posts';
import Post from './components/Posts/Post/Post';
import NewPost from './components/Posts/NewPost/NewPost';
class App extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
       name: "dilip"
    }
  }
  
  handleClick = () => {
    this.setState({
      name: "Wangoes"
    })
  }

  render() {
    return (
      <div>
        <Switch>
            <Route path="/posts/:id" component={Post} />
            <Route path="/newpost" component={NewPost} />
            <Route path="/" component={Posts} /> 
                   
        </Switch> 
      </div>
    )
  }
}

export default App

