import { useCart } from "react-use-cart";
import Header from "./Header";
import Footer from "./Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { NavLink } from "react-router-dom";

export default function Cart() {

    const { isEmpty, totalUniqueItems, items, updateItemQuantity, removeItem } = useCart();
    const totalQuantity = items.reduce((sum, item) => sum + (item.quantity ?? 0), 0)
    // console.log(items);

    if (isEmpty) {
        return (
            <>
                <Header />
                <div className="h-[500px] bg-gray-100 flex flex-col justify-center items-center gap-5">
                    <img src="https://mybrands.az/img/basket_gray_icon.svg" className="bg-white border rounded-3xl text-3xl mb-5 p-5" />
                    <p className="text-blue-950 text-3xl font-extrabold">SƏBƏTDƏ MƏHSUL YOXDUR</p>
                    <p>Səbətdə məhsul yoxdur</p>
                    <NavLink to="/" className="border rounded bg-blue-950 text-white text-lg font-bold mt-5 px-32 py-4">MƏHSULLARI GÖSTƏR</NavLink>
                </div>
                <Footer />
            </>
        )
    }

    return (
        <>
            <Header />
            <div className="p-10 bg-gray-100">
                {/* First div */}
                <div className="flex items-center text-sm gap-2">
                    <NavLink to="/" className="opacity-50 ml-4">Əsas Səhifə</NavLink>
                    <p className="text-[11px] opacity-50">&gt;</p>
                    <p>Səbət</p>
                </div>
                {/* Second div */}
                <div className="grid grid-cols-2 mt-10">
                    {/* Basket Left */}
                    <div className="flex flex-col gap-5">
                        {/* 01 */}
                        <div className="flex justify-between items-center border border-white rounded bg-white py-4 px-5">
                            <p className="text-lg font-extrabold">MƏNİM SƏBƏTİM</p>
                            <p className="text-sm">Səbətinizdə {totalQuantity} məhsul var.</p>
                        </div>
                        {/* 02 */}
                        <div className="flex flex-col items-center gap-5">
                            {items.map((item) => {
                                return (
                                    <div key={item.id} className="w-full relative flex border border-white rounded bg-white p-5 gap-7">
                                        {/* Image */}
                                        <img src={item.image} alt={item.name} className="w-[100px]"/>
                                        {/* Details */}
                                        <div className="flex flex-col">
                                            <div className="flex items-center mt-5 gap-5">
                                                <p className="flex items-center text-red-600 text-2xl font-semibold">₼ {item.price}</p>
                                                <p className="flex items-center font-semibold line-through">₼ {item.originalPrice}</p>
                                            </div>
                                            <p>{item.name}</p>
                                            <p>{item.color}, {item.size}</p>
                                            <div className="w-[180px] flex justify-center border-2 text-lg mt-5 gap-10">
                                                <button onClick={() => updateItemQuantity(item.id, (item.quantity ?? 0) - 1)} className="border-r-2 pr-2">&mdash;</button>
                                                <p className="border-r-2 pr-5">{item.quantity}</p>
                                                <button onClick={() => updateItemQuantity(item.id, (item.quantity ?? 0) + 1)}> + </button>
                                            </div>
                                        </div>
                                        {/* Logo */}
                                        <div className="cursor-pointer">
                                            <FontAwesomeIcon icon={faTrashCan} onClick={() => removeItem(item.id)} className="absolute top-[30px] left-[580px] border rounded-full bg-gray-200 p-2"/>
                                            <FontAwesomeIcon icon={faHeart} className="absolute top-[30px] left-[620px] border rounded-full bg-gray-200 p-2" />
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        {/* 03 */}
                        <div className="border border-white rounded bg-white py-8 px-7">
                            <p className="text-2xl font-extrabold mb-8">ÇATDIRILMA ƏRAZİSİ</p>
                            <div className="flex mb-5 gap-10">
                                <label>
                                    <input type="radio" name="location" value="baku"></input> Bakı: 5 AZN
                                </label>
                                <label>
                                    <input type="radio" name="location" value="absheron"></input> Abşeron: 10 AZN
                                </label>
                                <label>
                                    <input type="radio" name="location" value="rayonlar"></input> Rayonlar: 15 AZN
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Cost Right */}
                    <div className="h-[530px] flex flex-col bg-white border border-white rounded mx-7 mr-16 p-10 pr-20 pl-14 gap-5">
                        <p className="text-2xl font-extrabold">SİFARİŞ XÜLASƏSİ</p>
                        <div className="w-[450px] border-t border-gray-300"></div>
                        <div className="flex justify-between text-lg">
                            <p>Cəmi</p>
                            <p>₼ {items.reduce((total, item) => total + (item.price ?? 0) * (item.quantity ?? 0), 0).toFixed(2)}</p>
                        </div>
                        <div className="w-[450px] border-t border-gray-300"></div>
                        <div className="flex justify-between text-2xl font-semibold">
                            <p>Cəmi</p>
                            <p>₼ {items.reduce((total, item) => total + (item.price ?? 0) * (item.quantity ?? 0), 0).toFixed(2)}</p>
                        </div>
                        <button className="bg-blue-950 text-white text-lg font-semibold rounded mt-5 py-5">SİFARİŞİ TAMAMLA</button>
                        <p className="text-center text-red-500 text-lg font-semibold">ÖDƏMƏ ÜSULLARINI LƏĞV ETMƏK</p>
                        <p className="text-lg font-extrabold mt-5">QƏBUL EDİRİK</p>
                        <div className="flex gap-3">
                            <img src="https://mybrands.az/img/visa_icon.svg" />
                            <img src="https://mybrands.az/img/mastercard_icon.svg" />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

