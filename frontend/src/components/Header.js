import { useState } from 'react';

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="w-screen h-[60px] flex justify-center bg-white shadow-md">
            <div className="w-11/12 lg:w-4/5 h-full flex items-center justify-between">
                <div className="flex items-center">
                    <p className="font-bold text-[28px] lg:text-[35px]">Health</p>
                    <p className="font-bold text-[28px] lg:text-[35px] text-[#3499AF]">Care</p>
                </div>
                <div className="flex lg:hidden">
                    <button onClick={toggleMenu} className="text-[#3499AF] focus:outline-none">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
                        </svg>
                    </button>
                </div>
                <div className={`lg:flex items-center ${isOpen ? 'block' : 'hidden'} lg:block`}>
                    <div className="flex flex-col lg:flex-row gap-[20px] lg:gap-[40px] items-center">
                        <a href='/' className="py-2 lg:py-0">
                            <i className="text-[20px] lg:text-[25px] font-semibold">Home</i>
                        </a>
                        <a href='/' className="py-2 lg:py-0">
                            <i className="text-[20px] lg:text-[25px] font-semibold">Function</i>
                        </a>
                        <a href='/' className="py-2 lg:py-0">
                            <i className="text-[20px] lg:text-[25px] font-semibold">Function</i>
                        </a>
                        <a href='/' className="py-2 lg:py-0">
                            <i className="text-[20px] lg:text-[25px] font-semibold">Function</i>
                        </a>
                        <button className="w-[80px] lg:w-[100px] h-[35px] lg:h-[40px] bg-[#3499AF] rounded-[30px] font-bold text-[16px] lg:text-[20px] text-white mt-2 lg:mt-0">Login</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
