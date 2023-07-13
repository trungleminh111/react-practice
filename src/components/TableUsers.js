
import { useEffect, useState } from 'react';
import { CSVLink, CSVDownload } from "react-csv";
import Table from 'react-bootstrap/Table';
import { fetchAllUser } from '../services/UserService';
import ReactPaginate from 'react-paginate';
import ModalAddNew from './ModalAddNew';
import ModalEditUser from './ModalEditUser';
import ModalConfirm from './ModalConfirm';
import Papa from 'papaparse'
import './TableUsers.scss'
import _, { debounce } from 'lodash'
import { toast } from 'react-toastify';




const TableUsers = (props) => {
    const [listUser, setListUser] = useState([])
    const [totalUsers, setTotalUsers] = useState(0)
    const [totalPages, setTotalPages] = useState(0)

    const [isShowModalAddNewUser, setIsShowModalAddNewUser] = useState(false)

    const [isShowModalEditUser, setIsShowModalEditUser] = useState(false)
    const [dataEditUser, setDataEditUser] = useState({})

    const [isShowModalDeleteUser, setIsShowModalDeleteUser] = useState(false)
    const [dataDeleteUser, setDataDeleteUser] = useState({})

    const [sortBy, setSortBy] = useState("asc")
    const [sortField, setSortField] = useState("id")

    const [dataExport, setDataExport] = useState([])



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
    const handleSort = (sortBy, sortField) => {
        setSortBy(sortBy);
        setSortField(sortField)
        let cloneListUser = _.cloneDeep(listUser)
        cloneListUser = _.orderBy(cloneListUser, [sortField], [sortBy])
        setListUser(cloneListUser)
    }
    const handleSearch = debounce((event) => {

        let term = event.target.value
        if (term) {
            console.log('tex');
            let cloneListUser = _.cloneDeep(listUser)
            cloneListUser = cloneListUser.filter(item => item.email.includes(term))
            console.log(cloneListUser);
            setListUser(cloneListUser)

        }
        else {
            getUser(1)
        }
    }, 500)

    const getUserExport = (event, done) => {
        let result = []
        if (listUser && listUser.length > 0) {
            result.push(["Id", "Email", "First Name", "Last Name", "Avatar "])
            listUser.map((item, index) => {
                let arr = []
                arr[0] = item.id
                arr[1] = item.email
                arr[2] = item.first_name
                arr[3] = item.last_name
                arr[4] = item.avatar
                result.push(arr)
            })
            setDataExport(result)
            done()
        }
    }

    const handleImportCSV = (even) => {
        if (even.target && even.target.files && even.target.files[0]) {

            let file = even.target.files[0];
            if (file.type !== "text/csv") {
                toast.error("file không đúng định dạng")
                return;
            }
            Papa.parse(file, {

                complete: function (results) {
                    let rawCSV = results.data

                    if (rawCSV.length > 0) {
                        if (rawCSV[0] && rawCSV[0].length === 3) {
                            if (rawCSV[0][0] !== "email" ||
                                rawCSV[0][1] !== "first_name" ||
                                rawCSV[0][2] !== "last_name") {
                                toast.error("Wrong format CSV file!")
                            }
                            else {
                                let result = []

                                rawCSV.map((item, index) => {
                                    if (index > 0 && item.length === 3) {
                                        let obj = {}
                                        obj.email = item[0]
                                        obj.first_name = item[1]
                                        obj.last_name = item[2]
                                        result.push(obj)

                                    }
                                })
                                setListUser(result)
                            }

                        } else {
                            toast.error("Wrong format CSV file!")
                        }
                    }
                    else {
                        toast.error("Not found data on CSV file!")
                    }

                }
            });
        }

    }

    return (<>
        <div className="my-3 d-flex d-flex justify-content-between align-items-center">
            <span>  List user:</span>
            <div>
                <label htmlFor="import" className='btn btn-outline-primary'>
                    <i className="fa-solid fa-upload"></i>
                    Import
                </label>
                <input type="file" id='import' hidden
                    onChange={(event) => handleImportCSV(event)}
                />

                <CSVLink data={dataExport}
                    filename={"my-file.csv"}
                    target="_blank"
                    asyncOnClick={true}
                    onClick={getUserExport}
                >
                    <button className='btn btn-outline-secondary mx-1'>
                        <i className="fa-solid fa-download"></i> Export
                    </button>
                </CSVLink>
                <button
                    onClick={handleShow}
                    className='btn btn-outline-success'
                >
                    <i className='fa-solid fa-circle-plus mx-1'></i>
                    Add new </button>
            </div>
        </div>
        <div className='col-4 mb-3'>
            <input type="text"
                className='form-control'
                placeholder='Search user by email ...'
                // value
                onChange={(event) => handleSearch(event)}
            />
        </div>
        <Table striped bordered hover variant="light">
            <thead>
                <tr>
                    <th className='d-flex  justify-content-between align-items-center'>ID
                        <div className="sort">
                            <i className='fa-solid fa-arrow-down-long'
                                onClick={() => handleSort("desc", "id")
                                }
                            ></i>
                            <i className='fa-solid fa-arrow-up-long'
                                onClick={() => handleSort("asc", "id")}
                            ></i>
                        </div>
                    </th>
                    <th>Email</th>
                    <th className='d-flex  justify-content-between align-items-center'>First Name
                        <div className="sort">
                            <i className='fa-solid fa-arrow-down-long'
                                onClick={() => handleSort("desc", "first_name")
                                }
                            ></i>
                            <i className='fa-solid fa-arrow-up-long'
                                onClick={() => handleSort("asc", "first_name")}
                            ></i>
                        </div>
                    </th>
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