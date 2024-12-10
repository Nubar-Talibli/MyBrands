import { useEffect, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";

export default function Home() {

    const [campaigns, setCampaigns] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [sale, setSale] = useState([]);
    const [trend, setTrend] = useState([]);
    const baseURL = "https://test.mybrands.az";

    async function getBanner() {
        const banner = await fetch('https://test.mybrands.az/api/v1/campaigns').then(res => res.json())
        setCampaigns(banner);
        // console.log(banner);
    }

    async function getTrend() {
        const topSale = await fetch('https://test.mybrands.az/api/v1/products/top-sale-trend-products/').then(res => res.json()).then(res => res.top_sale_products)
        setSale(topSale);
        // console.log(topSale);
        const topTrend = await fetch('https://test.mybrands.az/api/v1/products/top-sale-trend-products/').then(res => res.json()).then(res => res.trend_products)
        setTrend(topTrend);
        // console.log(topTrend);
    }

    const removeItem = () => {
        setSale((prevSale) => prevSale.slice(0, 3));
        setTrend((prevTrend) => prevTrend.slice(0, 3));
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                await getBanner(),
                    await getTrend(),
                    removeItem()
            }
            catch (error) {
                console.error("is error", error)
            }
        }
        fetchData();
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % campaigns.length);
        }, 7000);
        return () => clearInterval(interval);
    }, [campaigns])

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex == 0 ? campaigns.length - 1 : prevIndex - 1));
    }
    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % campaigns.length);
    }

    if (campaigns.length === 0) {
        return <div>Yükleniyor...</div>;
    }

    return (
        <>
            <Header />

            {/* Banner */}
            <div className="relative w-full overflow-hidden mt-10">
                <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                    {campaigns.map((campaign, index) => (
                        <img key={index} src={campaign.cover_photo_az} alt={campaign.title_az} className="mr-16 ml-14 object-cover" />
                    ))}
                </div>

                <button onClick={prevSlide} className="absolute top-1/2 left-20 bg-gray-300/35 text-white rounded-sm px-5 py-3"><FontAwesomeIcon icon={faArrowLeft} /></button>
                <button onClick={nextSlide} className="absolute top-1/2 right-20 bg-gray-300/35 text-white rounded-sm px-5 py-3"><FontAwesomeIcon icon={faArrowRight} /></button>

                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                    {campaigns.map((_, index) => (
                        <div
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`w-3 h-3 rounded-full cursor-pointer ${currentIndex === index ? "bg-white" : "bg-gray-300 opacity-30"}`}
                        ></div>
                    ))}
                </div>
            </div>

            {/* Trend */}
            <div className="mx-9 my-16">
                <p className="text-3xl font-extrabold mb-7">HAZIRDA TREND</p>
                <div className="grid grid-cols-6">
                    {([...sale, ...trend]).map((item, index) => {
                        const originalPrice = item.price;
                        const discount = item.discount;
                        const discountedPrice = originalPrice - (originalPrice * (discount / 100));
                        return (
                            <div key={item.id || index} className="flex flex-col items-start text-sm p-2 cursor-pointer">
                                <img src={`${baseURL}${item.image.items[0].file}`} alt="Product Image" className="h-[300px] relative mb-4" />
                                <FontAwesomeIcon icon={faHeart} className="absolute top-[1230px] bg-white rounded-full text-xl ml-3 p-2" />
                                <p>{item.product.title_az}</p>
                                <div className="flex gap-5">
                                    <p className="flex items-center text-red-600 text-base font-bold mt-5">₼ {discountedPrice.toFixed(2)}</p>
                                    <p className="flex items-center text-gray-500 text-base font-bold line-through mt-5">₼ {item.price}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* Yeni */}
            <div className="flex justify-center gap-5">
                <div>
                    <img src="https://mybrands.az/fit650x650/center/pages/43/2022.03.09_m_shirt.png" alt="yeni" className="relative" />
                    <div className="absolute top-[1900px]">
                        <p className="text-white text-4xl font-bold ml-16">YENİ KÖYNƏKLƏR</p>
                        <button className="bg-white border font-bold mt-10 ml-16 px-6 py-4">İNDİ AL</button>
                    </div>
                </div>

                <div>
                    <img src="https://mybrands.az/fit650x650/center/pages/43/2022.03.09_m_shoes.png" alt="yeni" />
                    <div className="absolute top-[1900px]">
                        <p className="text-white text-4xl font-bold ml-16">YENİ AYAQQABILAR</p>
                        <button className="bg-white border font-bold mt-10 ml-16 px-6 py-4">İNDİ AL</button>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    )
}