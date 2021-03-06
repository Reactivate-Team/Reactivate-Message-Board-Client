import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'
import { v4 as uuid } from 'uuid'

import AuthenticatedRoute from './components/AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from './components/AutoDismissAlert/AutoDismissAlert'
import Header from './components/Header/Header'
import SignUp from './components/auth/SignUp'
import SignIn from './components/auth/SignIn'
import SignOut from './components/auth/SignOut'
import ChangePassword from './components/auth/ChangePassword'
import CreatePost from './components/posts/CreatePost'
import IndexPost from './components/posts/IndexPost'
import UpdatePost from './components/posts/UpdatePost'
import ShowPost from './components/posts/ShowPost'
import CreateComment from './components/comments/CreateComment'
import IndexOwnedPost from './components/posts/IndexOwnedPost'
import UpdateComment from './components/comments/UpdateComment'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: null,
      msgAlerts: []
    }
  }

  setUser = (user) => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  deleteAlert = (id) => {
    this.setState((state) => {
      return { msgAlerts: state.msgAlerts.filter((msg) => msg.id !== id) }
    })
  }

  msgAlert = ({ heading, message, variant }) => {
    const id = uuid()
    this.setState((state) => {
      return {
        msgAlerts: [...state.msgAlerts, { heading, message, variant, id }]
      }
    })
  }

  render () {
    const { msgAlerts, user } = this.state

    return (
      <Fragment>
        <Header user={user} />
        {msgAlerts.map((msgAlert) => (
          <AutoDismissAlert
            key={msgAlert.id}
            heading={msgAlert.heading}
            variant={msgAlert.variant}
            message={msgAlert.message}
            id={msgAlert.id}
            deleteAlert={this.deleteAlert}
          />
        ))}
        <main className='container'>
          <Route
            path='/sign-up'
            render={() => (
              <SignUp msgAlert={this.msgAlert} setUser={this.setUser} />
            )}
          />
          <Route
            path='/sign-in'
            render={() => (
              <SignIn msgAlert={this.msgAlert} setUser={this.setUser} />
            )}
          />
          <AuthenticatedRoute
            user={user}
            path='/sign-out'
            render={() => (
              <SignOut
                msgAlert={this.msgAlert}
                clearUser={this.clearUser}
                user={user}
              />
            )}
          />
          <AuthenticatedRoute
            user={user}
            path='/change-password'
            render={() => (
              <ChangePassword msgAlert={this.msgAlert} user={user} />
            )}
          />
          <AuthenticatedRoute
            user={user}
            path='/create-post'
            render={() => <CreatePost msgAlert={this.msgAlert} user={user} />}
          />
          <AuthenticatedRoute
            user={user}
            exact
            path='/posts'
            render={() => <IndexPost msgAlert={this.msgAlert} user={user} />}
          />
          <AuthenticatedRoute
            user={user}
            path='/posts/:id/edit'
            render={() => <UpdatePost msgAlert={this.msgAlert} user={user} />}
          />
          <AuthenticatedRoute
            user={user}
            exact
            path='/posts/:id'
            render={() => <ShowPost msgAlert={this.msgAlert} user={user} />}
          />
          <AuthenticatedRoute
            user={user}
            path='/posts/:id/create-comment'
            render={() => (
              <CreateComment msgAlert={this.msgAlert} user={user} />
            )}
          />
          <AuthenticatedRoute
            user={user}
            exact
            path='/myposts'
            render={() => (
              <IndexOwnedPost msgAlert={this.msgAlert} user={user} />
            )}
          />
          <AuthenticatedRoute
            user={user}
            exact
            path='/posts/:id/comments/:commentId/edit'
            render={() => (
              <UpdateComment msgAlert={this.msgAlert} user={user} />
            )}
          />
        </main>
      </Fragment>
    )
  }
}

export default App
