
import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { fetchAllUser } from '../services/UserService';
import ReactPaginate from 'react-paginate';
import ModalAddNew from './ModalAddNew';
import ModalEditUser from './ModalEditUser';
import ModalConfirm from './ModalConfirm';
import _ from 'lodash'



const TableUsers = (props) => {
    const [listUser, setListUser] = useState([])
    const [totalUsers, setTotalUsers] = useState(0)
    const [totalPages, setTotalPages] = useState(0)

    const [isShowModalAddNewUser, setIsShowModalAddNewUser] = useState(false)

    const [isShowModalEditUser, setIsShowModalEditUser] = useState(false)
    const [dataEditUser, setDataEditUser] = useState({})

    const [isShowModalDeleteUser, setIsShowModalDeleteUser] = useState(false)
    const [dataDeleteUser, setDataDeleteUser] = useState({})

    const handleClose = () => {
        setIsShowModalAddNewUser(false)
        setIsShowModalEditUser(false)
        setIsShowModalDeleteUser(false)
    };

    const handleShow = () => setIsShowModalAddNewUser(true);
    const handleUpdateTable = (user) => {
        setListUser([user, ...listUser])
    }
    const handleEditUserFromModal = (user) => {
        let cloneListUser = _.cloneDeep(listUser)
        let index = listUser.findIndex(item => item.id === user.id)
        cloneListUser[index].first_name = user.first_name

        setListUser(cloneListUser)
    }

    useEffect(() => {
        getUser(1)
    }, [])

    const getUser = async (page) => {
        let res = await fetchAllUser(page)
        if (res && res.data) {
            setListUser(res.data)
            setTotalUsers(res.total)
            setTotalPages(res.total_pages)
        }

    }
    const handlePageClick = (event) => {

        getUser(+event.selected + 1)
    }

    const handleEditUser = (user) => {
        setDataEditUser(user)
        setIsShowModalEditUser(true)
    }
    const handleDeleteUser = (user) => {
        setDataDeleteUser(user)
        setIsShowModalDeleteUser(true)
    }
    const handleDelteUserFromModal = (user) => {
        let cloneListUser = _.cloneDeep(listUser)
        cloneListUser = cloneListUser.filter(item => item.id !== user.id)
        setListUser(cloneListUser)
    }


    return (<>
        <div className="my-3 d-flex d-flex justify-content-between align-items-center">
            <span>  List user:</span>
            <button onClick={handleShow} className='btn btn-primary'>Add new user</button>
        </div>
        <Table striped bordered hover variant="light">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Email</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {listUser && listUser.length > 0 &&
                    listUser.map((item, index) => {
                        return (
                            <tr key={`users-${index}`}>
                                <td>{item.id}</td>
                                <td>{item.email}</td>
                                <td>{item.first_name}</td>
                                <td>{item.last_name}</td>
                                <td>
                                    <button className='btn btn-warning mx-2'
                                        onClick={() => handleEditUser(item)}
                                    >Edit</button>

                                    <button className='btn btn-danger'
                                        onClick={() => handleDeleteUser(item)}
                                    >delete</button>
                                </td>
                            </tr>
                        )
                    })}


            </tbody>
        </Table>
        <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={totalPages}
            previousLabel="< previous"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName="active"
            renderOnZeroPageCount={null}
        />
        <ModalAddNew
            show={isShowModalAddNewUser}
            handleClose={handleClose}
            handleUpdateTable={handleUpdateTable}
        />
        <ModalEditUser
            show={isShowModalEditUser}
            handleClose={handleClose}
            dataEditUser={dataEditUser}
            handleEditUserFromModal={handleEditUserFromModal}
        />
        <ModalConfirm
            show={isShowModalDeleteUser}
            handleClose={handleClose}
            dataDeleteUser={dataDeleteUser}
            handleDelteUserFromModal={handleDelteUserFromModal}
        />
    </>)
}
export default TableUsers