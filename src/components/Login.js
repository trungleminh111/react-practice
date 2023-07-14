import { useState } from 'react'
import './Login.scss'
const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isShowPassword, setIsShowPassword] = useState(false)

    return (<>
        <div className="login-container col-12 col-sm-4">
            <div className="title">Login</div>
            <div className="text">Email or Username</div>
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
                <i onClick={() => setIsShowPassword(!isShowPassword)} class={`fa-solid ${isShowPassword ? 'fa-eye' : 'fa-eye-slash'}`}></i>
            </div>
            <button className={email && password ? 'active' : ''} disabled={email && password ? false : true}>Login</button>
            <div className='back'>
                Go back
            </div>
        </div>
    </>)
}
export default Login