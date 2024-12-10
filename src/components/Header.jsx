import logo from '../assets/logo.png'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBagShopping, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faHeart, faUser } from '@fortawesome/free-regular-svg-icons';
import { Link, NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function Header() {

    const [activeItem, setActiveItem] = useState("")
    const [categories, setCategories] = useState([])
    const [subCategories, setSubCategories] = useState([])
    const [brands, setBrands] = useState([])
    const username = useSelector(state => state.auth.username);
    const customOrder = [2, 5, 1, 4, 6];
    const categorySubMapping = {
        1: [7, 23, 39, 21, 41, 25, 34, 27, 38, 28, 36, 68, 33, 24, 20, 35, 66, 31, 37, 42, 92, 29, 30, 32, 40, 26],
        2: [15, 39, 55, 41, 13, 16, 17, 18, 76, 29, 72, 60, 8, 10, 9, 69, 14, 36, 12, 62, 35, 61, 92],
        4: [58, 59, 78, 81, 83, 85, 86, 88, 93],
        5: [44, 45, 46, 48, 49, 51, 52, 53, 54, 55, 56, 64, 65, 70],
        6: [79, 80, 82, 84, 89]
    }
    const subtitles = {
        brands: ""
    }

    async function getCategory() {
        const category = await fetch('https://test.mybrands.az/api/v1/products/categories?key=parent').then(res => res.json())
        setCategories(category)
        // console.log(category);
    }

    async function getSubCategory() {
        const subCategory = await fetch(`https://test.mybrands.az/api/v1/products/categories?key=category`).then(res => res.json())
        setSubCategories(subCategory)
        // console.log(subCategory);
    }

    async function getBrands() {
        const brand = await fetch(`https://test.mybrands.az/api/v1/products/filter-items`).then(res => res.json()).then(res => res.manufacturers)
        setBrands(brand)
        // console.log(brand);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                await getCategory(),
                    await getSubCategory(),
                    await getBrands()
            }
            catch (error) {
                console.error("is error", error)
            }
        }
        fetchData();
    }, [])

    return (
        <>
            {/* first */}
            <div className="flex justify-between items-center bg-gray-100 text-xs mb-8 px-16 py-3">
                <div className="flex gap-5">
                    <p>Haqqımızda</p>
                    <p>Müştəri xidmətləri</p>
                    <p>Bloq</p>
                </div>

                <p>AZ</p>
            </div>

            {/* second */}
            <div className='flex justify-around cursor-pointer'>
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
                    <NavLink to="/wishlist">
                        <FontAwesomeIcon icon={faHeart} />
                    </NavLink>
                    <NavLink to="/basket">
                        <FontAwesomeIcon icon={faBagShopping} />
                    </NavLink>
                    <div className='w-px h-8 border-r mr-5 pl-4'></div>
                    <FontAwesomeIcon icon={faUser} />
                    <Link to="/login">{username ? `Hello ${username}` : "Sizin Hesabınız"}</Link>
                </div>
            </div>

            {/* third */}
            <div className='relative flex gap-10 border-t border-b mt-8 pt-5 pb-5 pl-14 cursor-pointer'>
                <Link to="/butun-mehsullar" className='text-sm font-bold'>Bütün Məhsullar</Link>

                <NavLink to="/brands" className="relative" onMouseEnter={() => setActiveItem("brands")} onMouseLeave={() => setActiveItem("")}>
                    <p className='text-sm font-bold'>Brendlər</p>
                    {activeItem == "brands" && (
                        <div className="w-full fixed top-[185px] left-0 bg-white border-t z-50">
                            <p className='font-bold my-10 pl-16'>Kateqoriyalar üzrə</p>
                            <div className='w-1/2 grid grid-cols-2 mb-14 px-16 gap-3'>
                                {brands.map((br) => {
                                    return (
                                        <div key={br.id}>
                                            <p className='hover:underline'>{br.title}</p>
                                        </div>
                                    )
                                })
                                }
                            </div>
                        </div>
                    )}
                </NavLink>

                {categories && (
                    categories.filter((element) => element.id != 3).sort((a, b) => customOrder.indexOf(a.id) - customOrder.indexOf(b.id)).map((category) => {
                        return (
                            <div key={category.id} className='relative' onMouseEnter={() => setActiveItem(category.id)} onMouseLeave={() => setActiveItem("")}>
                                <NavLink to={`/${category.title_az.toLowerCase()}`} className='text-sm font-bold'>{category.title_az}</NavLink>
                                {activeItem == category.id && (
                                    <div className="w-screen fixed top-[185px] left-0 bg-white z-50">
                                        <p className='font-bold my-10 pl-16'>Kateqoriyalar üzrə</p>
                                        <div className='w-1/2 grid grid-cols-2 mb-14 px-16 gap-3'>
                                            {subCategories.filter((sub) => categorySubMapping[category.id]?.includes(sub.id)).map((subCategory) => {
                                                return (
                                                    <div key={subCategory.id}>
                                                        <p className='hover:underline'>{subCategory.title_az}</p>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )
                    })
                )}
            </div>
        </>
    )
}
