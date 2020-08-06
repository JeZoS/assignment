import React, { Component } from 'react'
import axios from "axios"
import { Link } from 'react-router-dom'

const api = axios.create({
    baseURL:`http://localhost:8000`
})

class Register extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      errors: {}
    }

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
      password: this.state.password
    }
    api.post('/user',user).then(res=>{
        localStorage.token=res.data.token;
        console.log(res.data)
    })
    
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 mt-5 mx-auto">
            <form noValidate onSubmit={this.onSubmit}>
              <h1 className="h3 mb-3 font-weight-normal">Please sign up</h1>
              <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  placeholder="Enter email"
                  value={this.state.email}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.onChange}
                />
              </div>
              <button
                onClick={e=>this.onSubmit(e)}
                className="btn btn-lg btn-primary btn-block"
              >
                Sign up
              </button>
              <button className="btn btn-lg btn-primary btn-block">
                <Link to="/login" style={{textDecoration:"none",color:"white"}} >Login</Link>
              </button>
              <button className="btn btn-lg btn-primary btn-block">
                <Link to="/post" style={{textDecoration:"none",color:"white"}} >Posts</Link>
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Register