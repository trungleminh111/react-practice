import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { loginApi } from '../services/UserService'
import './Login.scss'


const Login = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isShowPassword, setIsShowPassword] = useState(false)
    const [loadingAPI, setLoadingAPI] = useState(false)
    useEffect(() => {
        let token = localStorage.getItem("token")
        if (token) {
            navigate("/")
        }
    }, [])

    const handleLogin = async () => {
        if (!email || !password) {
            toast.error("Email/Password is required")
            return;
        }
        setLoadingAPI(true)
        let res = await loginApi(email, password)
        if (res && res.token) {
            localStorage.setItem("token", res.token)
            navigate("/")
        }
        else {
            if (res && res.status === 400) {
                toast.error(res.data.error)

            }
        }
        setLoadingAPI(false)
        console.log(res);
    }

    return (<>
        <div className="login-container col-12 col-sm-4">
            <div className="title">Login</div>
            <div className="text">Email or Username(eve.holt@reqres.in)</div>
            <input type="text"
                placeholder='Email or Username'
                value={email}
                onChange={(event) => setEmail(event.target.value)}
            />
            <div className='input-showpassword'>
                <input type={isShowPassword ? 'text' : 'password'}
                    placeholder='Password'
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
                <i onClick={() => setIsShowPassword(!isShowPassword)} className={`fa-solid ${isShowPassword ? 'fa-eye' : 'fa-eye-slash'}`}></i>
            </div>
            <button className={email && password ? 'active' : ''}
                disabled={email && password ? false : true}
                onClick={() => handleLogin()}
            > {loadingAPI && <i className='fa-solid fa-sync fa-spin'></i>} &nbsp; Login</button>
            <div className='back'>
                Go back
            </div>
        </div>
    </>)
}
export default Login