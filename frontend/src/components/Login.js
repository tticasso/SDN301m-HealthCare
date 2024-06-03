import { UilLock, UilEnvelopeAlt } from "@iconscout/react-unicons";
export default function Login() {
    return (
        <div className="w-[420px] h-[600px] bg-white rounded-[30px] flex items-center justify-center">
            <div className="w-[324px]">
                <div className="flex w-full justify-center mb-[40px]">
                    <p className="font-bold text-[40px]">Health</p>
                    <p className="font-bold text-[40px] text-[#3499AF]">Care</p>
                </div>
                <div className="w-full mb-[10px]">
                    <i className="text-[#3499AF]">Email address</i>
                    <div className="w-full flex justify-center">
                        <UilEnvelopeAlt size={35} color="#3499AF" />
                        <input type="text" placeholder="example@gmail.com" className="w-full h-[36px] ml-[5px] pl-[10px] border-2 border-[#3499AF] rounded-md" />
                    </div>
                </div>
                <div className="w-full mb-[10px]">
                    <i className="text-[#3499AF]">Password</i>
                    <div className="w-full flex justify-center">
                        <UilLock size={35} color="#3499AF" />
                        <input type="text" placeholder="***********" className="w-full h-[36px] ml-[5px] pl-[10px] border-2 border-[#3499AF] rounded-md" />
                    </div>
                </div>
                <a href="/" className="font-bold italic text-[16px]">Forgot Password?</a>
                <div className="w-full flex justify-center items-center mt-[40px]">
                    <button className="w-[200px] h-[50px] bg-[#3499AF] rounded-[30px] text-white">Login</button>
                </div>
                <div className="w-full flex justify-center items-center mt-[5px]">
                    <i>Do not have an account?</i>
                    <a href="/" className="font-bold italic ml-[2px]">Signup here!</a>
                </div>
            </div>
        </div>
    );
}