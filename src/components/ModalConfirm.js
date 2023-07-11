import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteUser } from '../services/UserService';
import { toast } from 'react-toastify';


const ModalConfirm = (props) => {
    const { show, handleClose, dataDeleteUser, handleDelteUserFromModal } = props

    const confirmDelete = async () => {
        let res = await deleteUser(dataDeleteUser.id)
        if (res && res.statusCode === 204) {
            toast.success("xóa user thành công")
            handleClose()
            handleDelteUserFromModal(dataDeleteUser)
        }
        else {
            toast.error("xóa user thất bại")
        }
    }

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Delete a user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="body-add-new">
                        This action can't be undone!
                        Do want to delete this user?<br /> <b>email = {dataDeleteUser.email}?</b>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => confirmDelete()}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default ModalConfirm