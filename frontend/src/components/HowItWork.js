import { UilUserMd, UilMedkit, UilSchedule } from '@iconscout/react-unicons'
export default function HowItWork() {
    return (
        <div className="w-full">
            <p className="text-[40px] font-bold text-center">How It Works?</p>
            <p className="text-center font-light text-[20px]">
                Discover, book, and experience personalized healthcare effortlessly <br />
                with our userfriendly Doctor Appoinment Website
            </p>
            <div className="w-full flex justify-center items-center">
                <div className="w-2/5 flex justify-between mt-[20px]">
                    <div className='w-auto'>
                        <div className='w-full flex justify-center items-center'>
                            <div className="w-[70px] h-[70px] bg-[#ffffff] border-[3px] relative rounded-[10px] flex items-center justify-center">
                                <div className='w-[15px] h-[15px] bg-[#538BE4] rounded-[10px] absolute top-[-8px] right-[-8px]'>
                                    <p className='text-white font-bold text-[10px] text-center'>1</p>
                                </div>
                                <UilUserMd size="40" color="black" />
                            </div>
                        </div>
                        <p className='font-bold text-[14px] text-center'>Find A Doctor</p>
                    </div>
                    <div className='mt-[30px]'>
                        <svg width="102" height="10" viewBox="0 0 102 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="5" cy="5" r="5" fill="#D9D9D9" />
                            <circle cx="97" cy="5" r="5" fill="#D9D9D9" />
                            <circle cx="28" cy="5" r="5" fill="#D9D9D9" />
                            <circle cx="51" cy="5" r="5" fill="#D9D9D9" />
                            <circle cx="74" cy="5" r="5" fill="#D9D9D9" />
                        </svg>
                    </div>
                    <div className='w-auto'>
                        <div className='w-full flex justify-center items-center'>
                            <div className="w-[70px] h-[70px] bg-[#ffffff] border-[3px] relative rounded-[10px] flex items-center justify-center">
                                <div className='w-[15px] h-[15px] bg-[#538BE4] rounded-[10px] absolute top-[-8px] right-[-8px]'>
                                    <p className='text-white font-bold text-[10px] text-center'>2</p>
                                </div>
                                <UilSchedule size="40" color="black" />
                            </div>
                        </div>
                        <p className='font-bold text-[14px] text-center'>Book Appointment</p>
                    </div>
                    <div className='mt-[30px]'>
                        <svg width="102" height="10" viewBox="0 0 102 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="5" cy="5" r="5" fill="#D9D9D9" />
                            <circle cx="97" cy="5" r="5" fill="#D9D9D9" />
                            <circle cx="28" cy="5" r="5" fill="#D9D9D9" />
                            <circle cx="51" cy="5" r="5" fill="#D9D9D9" />
                            <circle cx="74" cy="5" r="5" fill="#D9D9D9" />
                        </svg>
                    </div>
                    <div className='w-auto'>
                        <div className='w-full flex justify-center items-center'>
                            <div className="w-[70px] h-[70px] bg-[#ffffff] border-[3px] relative rounded-[10px] flex items-center justify-center">
                                <div className='w-[15px] h-[15px] bg-[#538BE4] rounded-[10px] absolute top-[-8px] right-[-8px]'>
                                    <p className='text-white font-bold text-[10px] text-center'>3</p>
                                </div>
                                <UilMedkit size="40" color="black" />
                            </div>
                        </div>
                        <p className='font-bold text-[14px] text-center'>Get Service</p>
                    </div>
                </div>
            </div>
        </div>
    );
}