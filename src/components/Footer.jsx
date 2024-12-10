import { faFacebookF, faInstagram, faLinkedinIn, faTiktok, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Footer() {
    return (
        <div className="mt-6">
            {/* first */}
            <div className="bg-footer flex">
                <div className="w-1/2 text-white pl-36 py-12">
                    <p className="font-bold text-2xl mb-6">BİZİ İZLƏMƏYİ UNUTMAYIN</p>
                    <p className="w-11/12 text-gray-400">Bizim müştərilər qrupuna qoşulun. Yeni məhsullar və aksiyalardan ilk xəbərdar olun.</p>
                </div>

                <div className="w-1/2 flex justify-center items-center text-white gap-12">
                    <p className="text-gray-400">Bizi izləyin</p>
                    <div className="flex gap-10 cursor-pointer">
                        <FontAwesomeIcon icon={faFacebookF} />
                        <FontAwesomeIcon icon={faInstagram} />
                        <FontAwesomeIcon icon={faLinkedinIn} />
                        <FontAwesomeIcon icon={faYoutube} />
                        <FontAwesomeIcon icon={faTiktok} />
                    </div>
                </div>
            </div>

            {/* second */}
            <div className="grid grid-cols-2 my-16 ml-20">
                <div className="grid grid-cols-4 text-center text-sm">
                    <article>
                        <p className="font-bold mb-8">ŞİRKƏT</p>
                        <p className="text-gray-500 mb-5 cursor-pointer">Haqqımızda</p>
                    </article>

                    <article>
                        <p className="font-bold mb-8">MÜŞTƏRİLƏR</p>
                        <p className="text-gray-500 mb-5 cursor-pointer">Ödəniş və Çatdırılma</p>
                        <p className="text-gray-500 mb-5 cursor-pointer">Qaytarılma siyasəti</p>
                        <p className="text-gray-500 mb-5 cursor-pointer">Müştəri xidmətləri</p>
                    </article>

                    <article>
                        <p className="font-bold mb-8">MAĞAZA</p>
                        <p className="text-gray-500 mb-5 cursor-pointer">Qadınlar</p>
                        <p className="text-gray-500 mb-5 cursor-pointer">Kişilər</p>
                        <p className="text-gray-500 mb-5 cursor-pointer">Uşaqlar</p>
                        <p className="text-gray-500 mb-5 cursor-pointer">Endirim</p>
                    </article>

                    <article>
                        <p className="font-bold mb-8">HESAB</p>
                        <p className="text-gray-500 mb-5 cursor-pointer">Qeydiyyat</p>
                        <p className="text-gray-500 mb-5 cursor-pointer">Sifarişlərim</p>
                    </article>
                </div>

                <div className="ml-36">
                    <div className="flex items-center gap-2 mb-10">
                        <FontAwesomeIcon icon={faEnvelope} />
                        <p className="font-bold cursor-pointer">help@mybrands.az</p>
                    </div>
                    <p className="text-lg">+994504114114</p>
                    <p className="text-gray-500 mb-10">Online mağaza</p>
                    <p className="w-2/3 text-gray-500 text-xs">Müştəri xidmətləri mərkəzimizlə hər gün 09:00 - 18:00-dək əlaqə saxlaya bilərsiniz.</p>
                </div>
            </div>

            {/* third */}
            <div className="flex flex-col mt-36 mb-9">
                <div className="w-11/12 border-t ml-11 mb-7"></div>
                <div className="flex justify-between text-xs mx-10">
                    <p>© MYBRANDS - BÜTÜN HÜQUQLAR QORUNUR</p>
                    <div className="flex gap-10">
                        <p>Məxfilik Siyasəti</p>
                        <p>İstifadənin ümumi müddəaları və şərtləri</p>
                    </div>
                </div>
            </div>
        </div>
    )
}