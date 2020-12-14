export default function SearchCategories({ categories }) {
    function selectCategory(index) {

    }

    return (
        <div className="flex flex-wrap items-center bg-opacity-0">
            {categories.map((x, index) => {
                return (
                    // Images Buttons
                    <div className=" h-64 w-4/12 p-3 my-3">
                        <button
                            className="wrapper-button flex-shrink-0 relative overflow-hidden bg-orange-500 rounded-lg shadow-lg"
                            style={{ backgroundImage: `url(${x.image})` }}
                            onClick={() => selectCategory(index)}
                        >
                            <svg
                                className="absolute bottom-0 left-0 mb-8"
                                viewBox="0 0 375 283"
                                fill="none"
                                style={{
                                    transform: 'scale(1.5)',
                                    opacity: 0.1,
                                }}
                            >
                                <rect
                                    x="159.52"
                                    y="175"
                                    width="152"
                                    height="152"
                                    rx="8"
                                    transform="rotate(-45 159.52 175)"
                                    fill="white"
                                />
                                <rect
                                    y="107.48"
                                    width="152"
                                    height="152"
                                    rx="8"
                                    transform="rotate(-45 0 107.48)"
                                    fill="white"
                                />
                            </svg>
                            <div className="relative pt-10 px-10 flex items-center justify-center">
                                <div
                                    className="block absolute w-48 h-48 bottom-0 left-0 -mb-24 ml-3"
                                    style={{
                                        background:
                                            'radial-gradient(black, transparent 60%)',
                                        transform:
                                            'rotate3d(0, 0, 1, 20deg) scale3d(1, 0.6, 1)',
                                        opacity: 0.2,
                                    }}
                                ></div>
                                <img
                                    className="relative w-40 h-32 object-cover"
                                    src={x.image}
                                    alt=""
                                />
                            </div>
                            <div className="relative text-white px-6 pb-6 mt-6">
                                <span className="block opacity-75 -mb-1">
                                    Indoor
                                </span>
                                <div className="flex justify-between">
                                    <span className="block font-semibold text-xl">
                                        {x.title}
                                    </span>
                                    <span className="block bg-white rounded-full text-orange-500 text-xs font-bold px-3 py-2 leading-none flex items-center">
                                        $36.00
                                    </span>
                                </div>
                            </div>
                        </button>
                    </div>
                )
            })}
        </div>
    )
}
