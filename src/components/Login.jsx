import { Link, NavLink, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png'
import Footer from "./Footer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faHeart, faUser } from '@fortawesome/free-regular-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { login } from "./auth";

export default function Login() {

    const dispatch = useDispatch()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (email === "nubartalibli@gmail.com" && password === "nubar123") {
            const response = await fetch("https://test.mybrands.az/api/v1/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "email": email,
                    "password": password
                })
            }).then(res => res.json())
            console.log(response);
            dispatch(login({ username: "Nubar" }));
            alert("Login Successful!");
            navigate("/");
        } else {
            alert("E-mail or password is wrong.");
        }
    };

    function handleChangeEmail(event) {
        setEmail(event.target.value)
    }
    function handleChangePassword(event) {
        setPassword(event.target.value)
    }

    return (
        <>
            {/* Header */}
            <div className="flex justify-between items-center bg-gray-100 text-xs mb-8 px-16 py-3">
                <div className="flex gap-5">
                    <p>Haqqımızda</p>
                    <p>Müştəri xidmətləri</p>
                    <p>Bloq</p>
                </div>

                <p>AZ</p>
            </div>
            {/* Header */}
            <div className='flex justify-around text-base cursor-pointer'>
                <div className='flex justify-center'>
                    <a href='/'>
                        <img src={logo} alt="logo" className='mr-14' />
                    </a>
                    <NavLink to="/kisiler" className={({ isActive }) => isActive ? 'text-black font-bold' : 'font-bold opacity-35'}>Kişilər</NavLink>
                    <div className='w-px h-8 border-r mr-5 pl-4'></div>
                    <NavLink to="/qadinlar" className={({ isActive }) => isActive ? 'text-black font-bold' : 'font-bold opacity-35'}>Qadınlar</NavLink>
                    <div className='w-px h-8 border-r mr-5 pl-4'></div>
                    <NavLink to="/usaqlar" className={({ isActive }) => isActive ? 'text-black font-bold' : 'font-bold opacity-35'}>Uşaqlar</NavLink>
                </div>

                <div className='flex items-center text-lg gap-6'>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                    <FontAwesomeIcon icon={faHeart} />
                    <FontAwesomeIcon icon={faBagShopping} />
                    <div className='w-px h-8 border-r mr-5 pl-4'></div>
                    <FontAwesomeIcon icon={faUser} />
                    <Link to="/login">Sizin Hesabınız</Link>
                </div>
            </div>
            {/* Login */}
            <form onSubmit={handleSubmit}>
                <div className='flex justify-center relative bg-gray-100 mt-8 pt-14'>
                    <div className='w-1/2 flex flex-col justify-center items-center bg-white border border-white mx-32 my-7 gap-3'>
                        <div className='flex font-bold gap-[235px]'>
                            <p className='absolute top-[85px] left-[360px] bg-blue-950 text-white px-[130px] py-8'>DAXİL OLUN</p>
                            <p className='absolute top-[115px] right-[460px] text-center text-blue-950'>QEYDİYYATDAN KEÇİN</p>
                        </div>
                        <p className='text-2xl font-extrabold mt-32'>E-MAİL İLƏ DAXİL OLUN</p>
                        <p className='w-1/2 text-sm mt-5 opacity-50'>E-mail ünvanı</p>
                        <input type='email' placeholder='E-mail' className='w-1/2 border rounded-md focus:border-black outline-none p-3' value={email} onChange={(e) => setEmail(e.target.value)} required />
                        <p className='w-1/2 text-sm opacity-50'>Şifrə</p>
                        <input type='password' placeholder='Şifrə' className='w-1/2 border rounded-md focus:border-black outline-none p-3' value={password} onChange={(e) => setPassword(e.target.value)} required />
                        <button type="submit" className='w-1/2 bg-blue-950 text-white text-lg rounded-sm mt-3 py-4'>DAXİL OLUN</button>
                        <p className='text-sm  font-bold mt-5 mb-8'>Şifrənizi unutmusunuz?</p>
                        <div className="flex items-center">
                            <div className="w-[250px] border-t border-gray-300"></div>
                            <p className='text-lg font-extrabold px-4'>VƏ YA</p>
                            <div className="w-[250px] border-t border-gray-300"></div>
                        </div>
                        <p className='text-2xl font-extrabold my-5'>DAXİL OLUN</p>
                        <div className='grid grid-cols-2 pb-10 gap-5 cursor-pointer'>
                            <div className='flex justify-center items-center border font-bold px-24 py-4 gap-3 hover:border-black transition-all duration-300'>
                                <img src='https://mybrands.az/img/google_colored_icon.svg' className='w-[24px]' />
                                <p>Google</p>
                            </div>
                            <div className='flex justify-center items-center border font-bold px-24 py-4 gap-3 hover:border-black transition-all duration-300'>
                                <img src='https://mybrands.az/img/facebook_colored_icon.svg' className='w-[24px]' />
                                <p>Facebook</p>
                            </div>
                        </div>
                    </div>
                </div>
            </form>

            <Footer />
        </>
    )
}