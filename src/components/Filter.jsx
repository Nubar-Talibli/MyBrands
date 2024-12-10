import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

const Filter = ({ onFilterChange }) => {

    const [filterItems, setFilterItems] = useState([]);
    const [activeDropdown, setActiveDropdown] = useState("");
    const [selectedFilters, setSelectedFilters] = useState({
        kateqoriyalar: "",
        altKateqoriyalar: "",
        brend: ""
    });

    async function getFilter() {
        const filter = await fetch('https://test.mybrands.az/api/v1/products/filter-items').then(res => res.json())
        setFilterItems(filter)
        console.log(filter);
    }

    const toggleDropdown = (dropdownName) => {
        setActiveDropdown(activeDropdown == dropdownName ? "" : dropdownName);
    };

    const handleChange = (dropdownName, selectedOption) => {
        const updatedFilters = {
            ...selectedFilters,
            [dropdownName]: selectedOption,
        };

        setSelectedFilters(updatedFilters);
        onFilterChange(updatedFilters);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                await getFilter()
            }
            catch (error) {
                console.error("is error", error)
            }
        }
        fetchData();
    }, [])

    return (
        <>
            <div className="flex flex-col text-xl border gap-5">
                {/* Qiymətlər */}
                <div className="border-b relative">
                    <p className="block w-full py-5 pr-52 pl-10" onClick={() => toggleDropdown("qiymetler")}>Qiymətlər</p>
                    <FontAwesomeIcon icon={faChevronDown} className="absolute top-[25px] right-[20px] text-sm cursor-pointer" onClick={() => toggleDropdown("qiymetler")} />
                    {activeDropdown == "qiymetler" && (
                        <div className="text-sm pl-10">
                            <div className="flex mb-7 gap-5">
                                <input type="number" placeholder="Min" className="w-[100px] bg-gray-100 p-2" />
                                <input type="number" placeholder="Max" className="w-[100px] bg-gray-100 p-2" />
                            </div>

                            <div className="flex flex-col justify-start mb-5 gap-3">
                                <label className="flex items-center gap-2">
                                    <input type="radio" className="cursor-pointer"/> 0 - 100 AZN
                                </label>
                                <label className="flex items-center gap-2">
                                    <input type="radio" className="cursor-pointer"/> 100 - 200 AZN
                                </label>
                                <label className="flex items-center gap-2">
                                    <input type="radio" className="cursor-pointer"/> 200 - 300 AZN
                                </label>
                                <label className="flex items-center gap-2">
                                    <input type="radio" className="cursor-pointer"/> &gt; 300 AZN
                                </label>
                            </div>
                        </div>
                    )}
                </div>
                {/* Kolleksiyalar */}
                <div className="border-b relative">
                    <p className="block w-full pb-5 pl-10" onClick={() => toggleDropdown("kolleksiyalar")}>Kolleksiyalar</p>
                    <FontAwesomeIcon icon={faChevronDown} className="absolute top-[10px] right-[20px] text-sm cursor-pointer" onClick={() => toggleDropdown("kolleksiyalar")} />
                    {activeDropdown == "kolleksiyalar" && (
                        <div className="flex flex-col text-base mb-5 pl-10 gap-2">
                            {filterItems.seasons &&
                                filterItems.seasons.map((season) => {
                                    return (
                                        <div key={season.id}>
                                            <label className="flex items-center gap-2">
                                                <input type="radio" name="kolleksiyalar" value={season.title} className="cursor-pointer" onChange={() => handleChange("kolleksiyalar", season.title)} checked={selectedFilters.kolleksiyalar == season.title} />
                                                {season.title}
                                            </label>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    )}
                </div>
                {/* Kateqoriyalar 38 */}
                <div className="border-b relative">
                    <p className="block w-full pb-5 pl-10" onClick={() => toggleDropdown("kateqoriyalar")}>Kateqoriyalar</p>
                    <FontAwesomeIcon icon={faChevronDown} className="absolute top-[10px] right-[20px] text-sm cursor-pointer" onClick={() => toggleDropdown("kateqoriyalar")} />
                    {activeDropdown == "kateqoriyalar" && (
                        <div className="flex flex-col text-base mb-5 pl-10 gap-2">
                            {filterItems.categories &&
                                filterItems.categories.slice(0, 38).map((category) => {
                                    return (
                                        <div key={category.id}>
                                            <label className="flex items-center gap-2">
                                                <input type="radio" name="kateqoriyalar" value={category.id} className="cursor-pointer" onChange={() => handleChange("kateqoriyalar", category.id)} checked={selectedFilters.kateqoriyalar == category.id} />
                                                {category.title_az}
                                            </label>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    )}
                </div>
                {/* Alt-Kateqoriyalar */}
                <div className="border-b relative">
                    <p className="block w-full pb-5 pl-10" onClick={() => toggleDropdown("altKateqoriyalar")}>Alt-kateqoriyalar</p>
                    <FontAwesomeIcon icon={faChevronDown} className="absolute top-[10px] right-[20px] text-sm cursor-pointer" onClick={() => toggleDropdown("altKateqoriyalar")} />
                    {activeDropdown == "altKateqoriyalar" && (
                        <div className="flex flex-col text-base mb-5 pl-10 gap-2">
                            {filterItems.sub_categories &&
                                filterItems.sub_categories.slice(0, 38).map((subCategory) => {
                                    return (
                                        <div key={subCategory.id}>
                                            <label className="flex items-center gap-2">
                                                <input type="radio" name="altKateqoriyalar" value={subCategory.title_az} className="cursor-pointer" onChange={() => handleChange("altKateqoriyalar", subCategory.title_az)} checked={selectedFilters.altKateqoriyalar == subCategory.title_az} />
                                                {subCategory.title_az}
                                            </label>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    )}
                </div>
                {/* Brend */}
                <div className="border-b relative">
                    <p className="block w-full pb-5 pl-10" onClick={() => toggleDropdown("brend")}>Brend</p>
                    <FontAwesomeIcon icon={faChevronDown} className="absolute top-[10px] right-[20px] text-sm cursor-pointer" onClick={() => toggleDropdown("brend")} />
                    {activeDropdown == "brend" && (
                        <div className="flex flex-col text-base mb-5 pl-10 gap-2">
                            {filterItems.manufacturers &&
                                filterItems.manufacturers.map((brend) => {
                                    return (
                                        <div key={brend.id}>
                                            <label className="flex items-center gap-2">
                                                <input type="radio" name="brend" value={brend.title_az} className="cursor-pointer" onChange={() => handleChange("brend", brend.title)} checked={selectedFilters.brend == brend.title} />
                                                {brend.title}
                                            </label>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    )}
                </div>
                {/* Ölçü */}
                <div className="border-b relative">
                    <p className="block w-full pb-5 pl-10" onClick={() => toggleDropdown("size")}>Ölçü</p>
                    <FontAwesomeIcon icon={faChevronDown} className="absolute top-[10px] right-[20px] text-sm cursor-pointer" onClick={() => toggleDropdown("size")} />
                    {activeDropdown == "size" && (
                        <div className="flex flex-col text-base mb-5 pl-10 gap-2">
                            {filterItems.sizes &&
                                filterItems.sizes.map((size) => {
                                    return (
                                        <div key={size.id}>
                                            <label className="flex items-center gap-2">
                                                <input type="radio" name="size" value={size.title_az} className="cursor-pointer" onChange={() => handleChange("size", size.title_az)} checked={selectedFilters.size == size.title_az} />
                                                {size.title_az}
                                            </label>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    )}
                </div>
                {/* Rəng */}
                <div className="border-b relative">
                    <p className="block w-full pb-5 pl-10" onClick={() => toggleDropdown("color")}>Rəng</p>
                    <FontAwesomeIcon icon={faChevronDown} className="absolute top-[10px] right-[20px] text-sm cursor-pointer" onClick={() => toggleDropdown("color")} />
                    {activeDropdown == "color" && (
                        <div className="flex flex-col text-base mb-5 pl-10 gap-2">
                            {filterItems.colors &&
                                filterItems.colors.map((color) => {
                                    return (
                                        <div key={color.id}>
                                            <label className="flex items-center gap-2">
                                                <input type="radio" name="color" value={color.title_az} className="cursor-pointer" onChange={() => handleChange("color", color.title_az)} checked={selectedFilters.color == color.title_az} />
                                                {color.title_az}
                                            </label>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default Filter;