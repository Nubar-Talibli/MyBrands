import { useEffect, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import { NavLink } from "react-router-dom";

export default function Brands() {

    const [brands, setBrands] = useState([]);

    async function getBrands() {
        const brand = await fetch("https://test.mybrands.az/api/v1/products/manufacturers").then(res => res.json())
        setBrands(brand);
        // console.log(brand);
    }

    const removeItem = () => {
        setBrands((prevBrand) => prevBrand.slice(1, 7));
    };


    useEffect(() => {
        const fetchData = async () => {
            try {
                await getBrands(),
                    removeItem()
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

            <div className="flex flex-col m-10">
                {/* First div */}
                <div className="flex items-center text-sm gap-2">
                    <NavLink to="/" className="opacity-50 ml-4">Ana Səhifə</NavLink>
                    <p className="text-[11px] opacity-50">&gt;</p>
                    <p>Brendlər</p>
                </div>

                {/* Second div */}
                <div className="flex justify-center items-center mt-10 gap-5">
                    {brands.map((brand) => {
                        return (
                            <div key={brand.id} className="border border-slate-200 rounded-sm hover:border-black transition-all duration-300">
                                <img src={brand.logo_url} />
                            </div>
                        )
                    })}
                </div>
            </div>

            <Footer />
        </>
    )
}