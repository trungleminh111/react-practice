import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { putUpdateUser } from '../services/UserService';
import { toast } from 'react-toastify';


const ModalEditUser = (props) => {
    const { show, handleClose, dataEditUser, handleEditUserFromModal } = props
    const [name, setName] = useState("")
    const [job, setJob] = useState("")
    const handleEditUser = async () => {
        let res = await putUpdateUser(name, job)
        if (res && res.updatedAt) {
            handleEditUserFromModal({
                first_name: name,
                id: dataEditUser.id
            })
            handleClose()
            toast.success("cập nhật user thành công")
        }

    }
    useEffect(() => {
        if (show) {
            setName(dataEditUser.first_name)
        }
    }, [dataEditUser])


    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Edit a user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="body-add-new">
                        <form>
                            <div className="form-group">
                                <label for="name">Name</label>
                                <input type="text"
                                    className="form-control"
                                    id="name"
                                    placeholder="Enter name"
                                    value={name}
                                    onChange={(event) => setName(event.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label for="exampleInputEmail1">Job</label>
                                <input type="text"
                                    className="form-control"
                                    id="exampleInputEmail1"
                                    placeholder="Enter email"
                                    value={job}
                                    onChange={(event) => setJob(event.target.value)}
                                />
                            </div>

                        </form>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleEditUser()}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default ModalEditUser