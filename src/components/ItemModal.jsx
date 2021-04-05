/* eslint-disable no-unused-expressions */
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Input, Container,
} from 'reactstrap'
import { addItem } from '../redux/actions/itemActions'
import '../index.css'

const ItemModal = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)

  const dispatch = useDispatch()

  const onChange = (e) => {
    // eslint-disable-next-line no-unused-expressions
    // eslint-disable-next-line radix
    e.target.name === 'name' ? setName(e.target.value) : setPrice(parseInt(e.target.value))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const newItem = {
      name,
      price,
    }

    dispatch(addItem(newItem))

    setModalOpen(!modalOpen)
  }

  const toggle = () => {
    setModalOpen(!modalOpen)
  }

  return (
    <Container
      style={{
        width: '10rem', height: '10rem', alignItems: 'center', justifyContent: 'center',
      }}
      className="modal-container"
    >
      <Button color="dark" onClick={toggle} className="button" style={{ marginBottom: '2rem' }}>Add New Item</Button>
      <Modal isOpen={modalOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>New Item</ModalHeader>
        <ModalBody>
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Input
                style={{ marginBottom: '1rem' }}
                type="text"
                name="name"
                id="itemName"
                placeholder="Name of new item"
                onChange={onChange}
                required
              />
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">$</span>
                </div>
                <Input type="number" name="price" id="itemPrice" placeholder="Price of new item" onChange={onChange} required />
              </div>
              <Button color="dark" style={{ marginTop: '2rem' }} block>Submit Item</Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </Container>

  )
}

export default ItemModal
