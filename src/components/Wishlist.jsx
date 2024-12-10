import { useWishlist } from "react-use-wishlist";
import Header from "./Header";
import Footer from "./Footer";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faTrashCan } from "@fortawesome/free-regular-svg-icons";

export default function Wishlist() {

    const { isWishlistEmpty, totalWishlistItems, items, removeWishlistItem } = useWishlist()
    console.log(items);

    if (isWishlistEmpty) {
        return (
            <>
                <Header />
                <div className="h-[500px] bg-gray-100 flex flex-col justify-center items-center gap-5">
                    <FontAwesomeIcon icon={faHeart} className="bg-white border rounded-3xl text-3xl mb-5 p-5" />
                    <p className="text-blue-950 text-3xl font-extrabold">ARZUOLUNANLAR SİYAHINIZ BOŞDUR</p>
                    <p>Məhsulu seçin</p>
                    <NavLink to="/" className="border rounded bg-blue-950 text-white text-lg font-bold mt-5 px-32 py-4">MƏHSULLARI GÖSTƏR</NavLink>
                </div>
                <Footer />
            </>
        )
    }

    return (
        <>
            <Header />
            <div className="p-10">
                {/* First div */}
                <div className="flex items-center text-sm gap-2">
                    <NavLink to="/" className="opacity-50 ml-4">Əsas Səhifə</NavLink>
                    <p className="text-[11px] opacity-50">&gt;</p>
                    <p>Wish List</p>
                </div>
                {/* Second div */}
                <div className="grid grid-cols-4 mt-10">
                    {items.map((item) => {
                        return (
                            <div key={item.id} className="relative mb-10">
                                <NavLink to={`/${item.categoryId}/${item.id}`}>
                                    <img src={item.image} alt={item.name} className="h-[421px]" />
                                </NavLink>
                                <FontAwesomeIcon icon={faTrashCan} onClick={() => removeWishlistItem(item.id)} className="absolute top-[350px] left-[20px] border rounded-full bg-white p-3 cursor-pointer"></FontAwesomeIcon>
                                <p className="mt-3">{item.name}</p>
                                <p className="opacity-50">{item.halfName}</p>
                                <p className="font-semibold mt-5">₼ {item.price}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
            <Footer />
        </>
    )
}