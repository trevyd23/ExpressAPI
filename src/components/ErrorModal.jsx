/* eslint-disable max-len */
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import {
  Button, Container, Modal, ModalBody, ModalHeader,
} from 'reactstrap'

const ErrorModal = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const itemErrorMessage = useSelector((state) => state.items.errorMessage)
  const userErrorMessage = useSelector((state) => state.user.errorMessage)
  const cartErrorMessage = useSelector((state) => state.cart.errorMessage)

  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    itemErrorMessage !== null || userErrorMessage !== null || cartErrorMessage !== null ? setModalOpen(true) : setModalOpen(false)
  }, [itemErrorMessage, userErrorMessage, cartErrorMessage])

  const toggle = () => {
    setModalOpen(!modalOpen)
  }

  return (
    <Container style={{ alignItems: 'center', justifyContent: 'center' }}>
      { modalOpen
        ? (
          <Modal isOpen={modalOpen} toggle={toggle}>
            <ModalHeader toggle={toggle}>Error processing request</ModalHeader>
            <ModalBody>
              {itemErrorMessage !== null ? itemErrorMessage.toString() : userErrorMessage}
              <Button color="dark" onClick={toggle} style={{ marginTop: '2rem' }} block>OK</Button>
            </ModalBody>
          </Modal>
        )
        : <div />}
    </Container>
  )
}

export default ErrorModal
