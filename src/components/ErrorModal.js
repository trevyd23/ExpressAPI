import React, { Component, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Container, Modal, ModalBody, ModalHeader, Toast, ToastBody, ToastHeader } from 'reactstrap';

const ErrorModal = () => {
    const [modalOpen, setModalOpen] = useState(false)
    const errorMessage = useSelector(state => state.items.errorMessage)

    useEffect(() => {
        console.log("error message?", errorMessage);
        errorMessage !== '' ? setModalOpen(true) : setModalOpen(false)
    }, [errorMessage])


    const toggle = () => {
        setModalOpen(!modalOpen)
    }

    return (
        <Container style={{ width: '10rem', height: '10rem', alignItems: "center", justifyContent: "center" }} >
            { modalOpen ?
                <div className="p-3 my-2 rounded bg-docs-transparent-grid" style={{ width: '20rem', alignSelf: "center" }}>
                    <Toast>
                        <ToastHeader>
                            Error processing Request
                </ToastHeader>
                        <ToastBody>
                            {errorMessage.toString()}
                            <Button color='dark' onClick={toggle} style={{ marginTop: '2rem' }} block>OK</Button>
                        </ToastBody>
                    </Toast>
                </div>
                : <div></div>}
        </Container>
    )
}

export default ErrorModal