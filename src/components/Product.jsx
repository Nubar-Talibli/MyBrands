import { useEffect, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faHeart } from "@fortawesome/free-regular-svg-icons";
import { faClockRotateLeft } from "@fortawesome/free-solid-svg-icons";
import { useCart } from "react-use-cart";
import { useWishlist } from "react-use-wishlist";

export default function Product() {

    const [items, setItems] = useState("")
    const { id, categoryId } = useParams()
    const { addItem } = useCart();
    const { addWishlistItem } = useWishlist();
    const navigate = useNavigate()
    const originalPrice = items.variations && items.variations[0]?.price;
    const discount = items.variations && items.variations[0]?.discount;
    const discountedPrice = originalPrice && discount ? originalPrice - (originalPrice * (discount / 100)) : 0;

    async function getItem() {
        const baseUrl = "https://test.mybrands.az/api/v1/products/";
        const url = categoryId ? `${baseUrl}?categories=${categoryId}` : `${baseUrl}${id}`;
        try {
            const item = await fetch(url).then(res => res.json());
            setItems(item);
            // console.log(item);
        } catch (error) {
            console.error("Error fetching item:", error);
        }
    }

    const handleAddToCart = () => {
        const product = {
            id: items.id,
            name: items.title_az,
            price: discountedPrice?.toFixed(2),
            originalPrice: originalPrice,
            quantity: 1,
            image: items.variations[0]?.image?.items[0]?.file,
            color: items.variations[0]?.color.title_az,
            size: items.variations[0]?.size.title_az
        };

        addItem(product);
        navigate('/basket');
    };

    const handleAddWishList = () => {
        const wishlistItem = {
            id: items.id,
            categoryId: items.categories[0].title_az.toLowerCase(),
            name: items.title_az,
            halfName: items.title_az.split(",")[1],
            price: discountedPrice?.toFixed(2),
            originalPrice: originalPrice,
            image: items.variations[0]?.image?.items[0]?.file,
            color: items.variations[0]?.color.title_az,
            size: items.variations[0]?.size.title_az
        };

        addWishlistItem(wishlistItem);
        navigate('/wishlist');
    };

    useEffect(() => {
        getItem();
    }, [id, categoryId]);

    return (
        <>
            <Header />

            <div className="m-10">
                {/* First div */}
                <div className="flex items-center text-sm gap-2">
                    <NavLink to="/" className="opacity-50 ml-4">Ana Səhifə</NavLink>
                    <p className="text-[11px] opacity-50">&gt;</p>
                    <NavLink to="/butun-mehsullar" className="opacity-50">Bütün Məhsullar</NavLink>
                    <p className="text-[11px] opacity-50">&gt;</p>
                    <p>{items.title_az}</p>
                </div>

                {/* Second div */}
                <div className="flex mt-10 gap-7">
                    {/* Small Photos */}
                    <div className="w-[80px] flex flex-col ml-40">
                        {items.variations && items.variations[0]?.image?.items ? (
                            items.variations[0].image.items.map((item, index) => (
                                <img key={index} src={item.file} alt={"Variation Item"} className="mb-4" />
                            ))
                        ) : (
                            <p>Loading images...</p>
                        )}
                    </div>

                    {/* Main Photos */}
                    <div className="w-[500px]">
                        {items.variations && items.variations[0]?.image?.items?.[0]?.file ? (
                            <img
                                src={items.variations[0].image.items[0].file}
                                alt="Main Image"
                            />
                        ) : (
                            <p>Photo is Loading...</p>
                        )}
                    </div>

                    {/* Details */}
                    <div className="flex flex-col items-center ml-12 gap-5">
                        <p className="text-2xl font-semibold">{items.title_az?.split(",")[0]}</p>
                        <p className="opacity-35">{items.title_az?.split(",")[1]}</p>

                        <div className="flex items-center mt-5 gap-5">
                            {items.variations && items.variations[0] ? (
                                <>
                                    <p className="flex items-center text-red-600 text-2xl font-semibold">
                                        ₼ {discountedPrice?.toFixed(2)}
                                    </p>
                                    <p className="flex items-center font-semibold line-through">
                                        ₼ {items.variations[0]?.price}
                                    </p>
                                </>
                            ) : (
                                <p>Loading...</p>
                            )}
                        </div>

                        <p className="underline text-xs cursor-pointer">Çatdırılma və geri qaytarılma haqqında məlumat</p>

                        <div className="flex font-semibold mt-3 gap-10 cursor-pointer">
                            {items.variations && items.variations[0].size.title_az}
                        </div>

                        <p className="underline text-xs mt-5 cursor-pointer">Ölçü cədvəli</p>
                        <FontAwesomeIcon icon={faCircle} className="text-2xl mt-5 cursor-pointer" />
                        <p>{items.variations && items.variations[0].color.title_az}</p>

                        <div className="flex items-center text-red-600 font-semibold mt-5 gap-3">
                            <FontAwesomeIcon icon={faClockRotateLeft} />
                            <p>MƏHDUD SAYDA</p>
                        </div>

                        <button className="text-white bg-blue-950 text-lg font-semibold px-[173px] py-4" onClick={handleAddToCart}>SƏBƏTƏ ƏLAVƏ ET</button>
                        <button className="relative text-blue-950 bg-gray-100 text-lg font-semibold px-[80px] py-4" onClick={handleAddWishList}>ARZUOLUNANLAR SİYAHISINA ƏLAVƏ ET</button>
                        <FontAwesomeIcon icon={faHeart} className="absolute top-[890px] right-[500px] text-2xl" />
                    </div>
                </div>

                {/* Third div */}
                <div className="flex mt-14 gap-10">
                    <div className="flex flex-col border text-sm p-10 gap-2">
                        <p className="text-lg font-extrabold mb-3">MƏHSUL HAQQINDA ƏSAS MƏLUMAT</p>
                        <p className="mb-4">Məhsulun kodu: {items.sku}</p>
                        <p>- {items.title_az?.split(",")[1]}</p>
                        <p>- {items.categories && items.categories[0].title_az}</p>
                        <p>- {items.gender?.title_az}</p>
                        <p>- {items.season?.title}</p>
                        <p>- {items.manufacturer?.title}</p>
                    </div>

                    <div className="flex flex-col border p-10">
                        <p className="text-lg font-extrabold">MƏHSUL HAQQINDA ƏTRAFLI MƏLUMAT</p>
                    </div>

                    <div className="flex flex-col border text-sm p-10 gap-1">
                        <p className="text-lg font-extrabold mb-3">SEÇİLMİŞ PARAMETRLƏR</p>
                        <p>Ölçü: {items.variations && items.variations[0].size.title_az}</p>
                        <p>Rəngi: {items.variations && items.variations[0].color.title_az}</p>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    )
}