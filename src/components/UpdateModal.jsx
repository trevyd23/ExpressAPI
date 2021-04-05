/* eslint-disable no-unused-expressions */
/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  Button, Container, Form, FormGroup, Input, Modal, ModalBody, ModalHeader,
} from 'reactstrap'
import { getItems, updateItem } from '../redux/actions/itemActions'

const UpdateModal = ({
  isOn = false, setToggle, nameItem, priceItem, id,
}) => {
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)

  const dispatch = useDispatch()

  const onChange = (e) => {
    // eslint-disable-next-line radix
    e.target.name === 'name' ? setName(e.target.value) : setPrice(parseInt(e.target.value))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const newItem = {
      name,
      price,
    }

    dispatch(updateItem(id, newItem))

    setTimeout(() => {
      dispatch(getItems())
    }, 2500)

    setToggle()
  }

  return (
    <Container style={{ width: '10rem', height: '10rem', marginBottom: -100 }} className="modal-container">
      <Modal isOpen={isOn} toggle={setToggle}>
        <ModalHeader toggle={setToggle}>Update Item</ModalHeader>
        <ModalBody>
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Input
                style={{ marginBottom: '1rem' }}
                type="text"
                name="name"
                id="itemName"
                placeholder={nameItem}
                onChange={onChange}
                required
              />
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">$</span>
                </div>
                <Input type="number" name="price" id="itemPrice" placeholder={priceItem} onChange={onChange} required />
              </div>
              <Button color="dark" style={{ marginTop: '2rem' }} block>Submit Updated Item</Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </Container>

  )
}

export default UpdateModal
