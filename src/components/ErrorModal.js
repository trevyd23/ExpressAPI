import React, { Component, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Container, Modal, ModalBody, ModalHeader, Toast, ToastBody, ToastHeader } from 'reactstrap';

const ErrorModal = () => {
    const [modalOpen, setModalOpen] = useState(false)
    const itemErrorMessage = useSelector(state => state.items.errorMessage)
    const userErrorMessage = useSelector(state => state.user.errorMessage)
    const cartErrorMessage = useSelector(state => state.cart.errorMessage)

    useEffect(() => {
        itemErrorMessage || userErrorMessage ? setModalOpen(true) : setModalOpen(false)
    }, [itemErrorMessage, userErrorMessage, cartErrorMessage])


    const toggle = () => {
        setModalOpen(!modalOpen)
    }

    return (
        <Container style={{ alignItems: "center", justifyContent: "center" }} >
            { modalOpen ?
                <Modal isOpen={modalOpen} toggle={toggle}>
                    <ModalHeader toggle={toggle}>Error processing request</ModalHeader>
                    <ModalBody>
                        {itemErrorMessage !== '' ? itemErrorMessage.toString() : userErrorMessage}
                        <Button color='dark' onClick={toggle} style={{ marginTop: '2rem' }} block>OK</Button>
                    </ModalBody>
                </Modal>
                : <div></div>}
        </Container>
    )
}

export default ErrorModal