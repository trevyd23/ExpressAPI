/* eslint-disable react/prop-types */
import React, { useEffect } from 'react'
import {
  Button, Container, Modal, ModalBody, ModalHeader,
} from 'reactstrap'

const SuccessModal = ({
  onSuccess, isOpen, message, setOpen,
}) => {
  useEffect(() => {
    onSuccess()
  }, [onSuccess])

  const toggle = () => {
    setOpen(!isOpen)
  }

  return (
    <Container style={{ alignItems: 'center', justifyContent: 'center' }}>
      { isOpen
        ? (
          <Modal isOpen={isOpen} toggle={toggle}>
            <ModalHeader toggle={toggle}>Request processed</ModalHeader>
            <ModalBody>
              {message}
              <Button color="dark" onClick={toggle} style={{ marginTop: '2rem' }} block>OK</Button>
            </ModalBody>
          </Modal>
        )
        : <div />}
    </Container>
  )
}

export default SuccessModal
