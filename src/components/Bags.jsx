import { useEffect, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faSquare } from "@fortawesome/free-regular-svg-icons";
import Filter from "./Filter";
import { NavLink } from "react-router-dom";

export default function Bags() {

    const [bags, setBags] = useState([]);

    async function getBags() {
        const product = await fetch("https://test.mybrands.az/api/v1/products/?categories=1").then(res => res.json()).then(res => res.results)
        setBags(product);
        // console.log(product);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                await getBags()
            }
            catch (error) {
                console.error("is error", error)
            }
        }
        fetchData();
    }, [])

    return (
        <>
            <Header />

            <div className="m-10">
                {/* First div */}
                <div className="flex items-center text-sm gap-2">
                    <NavLink to="/" className="opacity-50 ml-4">Ana Səhifə</NavLink>
                    <p className="text-[11px] opacity-50">&gt;</p>
                    <p>Çanta və aksesuarlar</p>
                </div>

                {/* Second div */}
                <div className="flex mt-10 gap-10">
                    {/* Filter Part */}
                    <Filter />

                    {/* Product Part */}
                    <div className="flex flex-col">
                        <div className="flex justify-center items-center gap-[600px]">
                            <div className="flex items-center gap-3">
                                <FontAwesomeIcon icon={faSquare} className="cursor-pointer" />
                                <p>Endirim</p>
                            </div>
                            <select className="form-select border border-black rounded-sm focus:border-transparen focus:outline-none p-2">
                                <option value="1">Tarix üzrə</option>
                                <option value="2">Ən çox satılanlar</option>
                                <option value="3">A-dan Z-yə</option>
                                <option value="4">Z-dən A-ya</option>
                                <option value="5">Qiymətlər çoxdan-aza doğru</option>
                                <option value="6">Qiymətlər azdan-çoxa doğru</option>
                            </select>
                        </div>

                        <div className="grid grid-cols-3 mt-8">
                            {bags.map((element) => {
                                const originalPrice = element.price;
                                const discount = element.discount;
                                const discountedPrice = originalPrice - (originalPrice * (discount / 100));
                                return (
                                    <NavLink to={`${element.product.id}`} key={element.id} className="flex flex-col items-start relative text-sm p-2 cursor-pointer">
                                        <img src={element.image.items[0].file} alt="Product Image" className="h-[400px] mb-4" />
                                        <FontAwesomeIcon icon={faHeart} className="absolute top-[350px] bg-white rounded-full text-xl ml-3 p-2" />
                                        <p>{element.product.title_az}</p>
                                        <div className="flex gap-5">
                                            <p className="flex items-center text-red-600 text-base font-bold mt-5">₼ {discountedPrice.toFixed(2)}</p>
                                            <p className="flex items-center text-gray-500 text-base font-bold line-through mt-5">₼ {element.actual_price}</p>
                                        </div>
                                    </NavLink>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    )
}