import React, { Component } from 'react'
import axios from "axios"

const api = axios.create({
  baseURL:`http://localhost:8000`
})

class Posts extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      post: '',
      posts: []
    }
    api.get('/post').then(res=>{
      console.log(res.data)
      this.setState({posts:res.data})
    });


    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }
  onSubmit(e) {
    e.preventDefault()

    const user = {
      email: this.state.email,
      post: this.state.post,
      token: localStorage.token
    }
    api.post('/post',user).then(res=>{
      console.log(res.data);
    })
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 mt-5 mx-auto">
            <form noValidate onSubmit={this.onSubmit}>
              <h1 className="h3 mb-3 font-weight-normal">Post something</h1>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  name="post"
                  placeholder="post"
                  value={this.state.post}
                  onChange={this.onChange}
                />
              </div>
              <h6>Cannot post if not logged in...</h6>
              <button
                type="submit"
                className="btn btn-lg btn-primary"
              >
                Post
              </button>
            </form>
          </div>
        </div>
        {this.state.posts.map(item=>
          <div  className="container" style={{textAlign:"center",padding:"10px"}} ><span style={{fontSize:"40px",marginRight:"10px"}}>{item.realpost}</span><span> by {item.idemail}</span></div>
        )}
      </div>
    )
  }
}

export default Posts