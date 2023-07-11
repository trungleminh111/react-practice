import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { postCreateUser } from '../services/UserService';
import { toast } from 'react-toastify';


const ModalAddNew = (props) => {
    const { show, handleClose, handleUpdateTable } = props
    const [name, setName] = useState("")
    const [job, setJob] = useState("")


    const handleSaveUser = async () => {
        let res = await postCreateUser(name, job)
        console.log(res);
        if (res && res.id) {
            handleClose()
            setName('')
            setJob('')
            toast.success("Thêm mới thành công")
            handleUpdateTable({ first_name: name, email: job, id: res.id })
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
                    <Modal.Title>Add new user</Modal.Title>
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
                    <Button variant="primary" onClick={() => handleSaveUser()}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default ModalAddNew