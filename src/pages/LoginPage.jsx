import React, { useCallback, useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import {
  Button, Col, Container, Form, FormGroup, Input, Label, Spinner, Fade,
} from 'reactstrap'
import '../cssStyles/login.css'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../redux/actions/UserActions'
import ErrorModal from '../components/ErrorModal'
import SuccessModal from '../components/SuccessModal'
import 'bootstrap/dist/css/bootstrap.min.css'

const LoginPage = () => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated)
  const fetching = useSelector((state) => state.user.isFetching)
  const user = useSelector((state) => state.user.user)

  const [toggle, setToggle] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState(0)
  // eslint-disable-next-line no-unused-vars
  const [fade, setFade] = useState(true)

  const dispatch = useDispatch()
  const history = useHistory()

  const { height } = window.screen

  const navigatetoShoppingList = useCallback(() => {
    setToggle(false)
    history.push('/shopping')
  }, [history])

  useEffect(() => {
    if (isAuthenticated) {
      setTimeout(() => {
        navigatetoShoppingList()
      }, 3000)
    }
  }, [email, isAuthenticated, navigatetoShoppingList])

  const toggleUpdate = useCallback(() => {
    setToggle(!toggle)
  }, [toggle])

  const showMessage = useCallback(() => {
    toggleUpdate()
    // navigatetoShoppingList()
  }, [toggleUpdate])

  useEffect(() => {
    if (isAuthenticated) {
      if (!toggle) showMessage()
    }
  }, [isAuthenticated, showMessage, toggle])

  const onChange = (e) => {
    // eslint-disable-next-line no-unused-expressions
    e.target.name === 'email' ? setEmail(e.target.value) : setPassword(e.target.value)
  }

  const onSubmit = (e) => {
    const credentials = {
      email,
      password,
    }

    dispatch(loginUser(credentials))

    e.preventDefault()
  }

  return (
    <>
      <SuccessModal isOpen={toggle} setOpen={toggleUpdate} onSuccess={() => { }} message={`Welcome ${user.name}`} />
      <ErrorModal />
      <Container
        style={{
          height: `${height}px`, display: 'flex', alignItems: 'center', background: 'radial-gradient(circle, rgba(2,0,36,1) 0%, rgba(57,57,91,1) 20%, rgba(0,212,255,1) 100%)',
        }}
        fluid
      >
        <Fade in={fade} tag="h5" className="mt-4" style={{ width: '100%' }}>
          <Container
            style={{
              height: '400px', width: '400px', padding: 20, borderRadius: '80px', border: '2px solid gray',
            }}
            className="loginContainer"
          >
            <div className="header" style={{ display: 'flex', justifyContent: 'center', marginBottom: 50 }}>
              <h2 style={{ color: 'white', fontSize: 40 }}>Sign In</h2>
            </div>
            <Form>
              <Col>
                <FormGroup>
                  <Label style={{ color: 'white', fontSize: 25 }}>Email</Label>
                  <Input
                    onChange={onChange}
                    type="email"
                    name="email"
                    id="exampleEmail"
                    placeholder="myemail@email.com"
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label style={{ color: 'white', fontSize: 25 }} for="examplePassword">Password</Label>
                  <Input
                    onChange={onChange}
                    type="password"
                    name="password"
                    id="examplePassword"
                    placeholder="********"
                  />
                </FormGroup>
              </Col>
              <Container style={{ display: 'flex', justifyContent: 'center' }}>
                <Link to="/shopping" onClick={onSubmit}>
                  <Button style={{ width: '100px' }} className="btn">
                    {' '}
                    {!fetching ? 'Submit' : 'Loading...'}

                    {fetching ? (
                      <Spinner
                        style={{ width: '1rem', height: '0.9rem', backgroundColor: 'red' }}
                        type="grow"
                        color="light"
                      />
                    ) : null}
                  </Button>
                </Link>
              </Container>
            </Form>

          </Container>
        </Fade>
      </Container>
    </>
  )
}

export default LoginPage
