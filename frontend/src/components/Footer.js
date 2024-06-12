export default function Footer() {
    return (
        <footer className="bg-[#3499AF] text-white py-8 mt-[20px]">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold">My Company</h1>
                        <p className="text-[#ffffff]">© 2024 All rights reserved.</p>
                    </div>
                    <div className="flex space-x-4">
                        <a href="https://facebook.com" className="text-gray-400 hover:text-white">
                            <svg className="w-6 h-6" fill="#ffffff" viewBox="0 0 24 24">
                                {/* Facebook Icon */}
                                <path d="M22.675 0h-21.35c-.734 0-1.325.591-1.325 1.325v21.351c0 .734.591 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.672c0-3.1 1.893-4.788 4.658-4.788 1.325 0 2.463.099 2.796.143v3.24l-1.918.001c-1.504 0-1.796.715-1.796 1.763v2.313h3.586l-.467 3.622h-3.119v9.294h6.116c.733 0 1.325-.59 1.325-1.324v-21.35c0-.734-.592-1.325-1.325-1.325z" />
                            </svg>
                        </a>
                        <a href="https://twitter.com" className="text-gray-400 hover:text-white">
                            <svg className="w-6 h-6" fill="#ffffff" viewBox="0 0 24 24">
                                {/* Twitter Icon */}
                                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.723-.951.563-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-2.719 0-4.923 2.205-4.923 4.923 0 .386.044.762.128 1.124-4.09-.205-7.719-2.165-10.148-5.144-.424.729-.666 1.577-.666 2.482 0 1.713.871 3.223 2.188 4.108-.807-.026-1.566-.248-2.229-.616v.062c0 2.392 1.701 4.384 3.953 4.834-.415.113-.853.173-1.304.173-.319 0-.63-.031-.931-.089.631 1.967 2.462 3.397 4.632 3.438-1.696 1.329-3.832 2.119-6.151 2.119-.399 0-.79-.023-1.175-.069 2.193 1.406 4.798 2.224 7.607 2.224 9.125 0 14.118-7.561 14.118-14.118 0-.215-.005-.429-.014-.642.971-.701 1.813-1.576 2.475-2.576z" />
                            </svg>
                        </a>
                        <a href="https://instagram.com" className="text-gray-400 hover:text-white">
                            <svg className="w-6 h-6" fill="#ffffff" viewBox="0 0 24 24">
                                {/* Instagram Icon */}
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.054 1.97.24 2.423.405.538.192.921.421 1.327.827.406.406.635.789.827 1.327.165.453.351 1.253.405 2.423.059 1.266.071 1.646.071 4.851s-.012 3.585-.071 4.85c-.054 1.17-.24 1.97-.405 2.423-.192.538-.421.921-.827 1.327-.406.406-.789.635-1.327.827-.453.165-1.253.351-2.423.405-1.266.059-1.646.071-4.85.071s-3.585-.012-4.85-.071c-1.17-.054-1.97-.24-2.423-.405-.538-.192-.921-.421-1.327-.827-.406-.406-.635-.789-.827-1.327-.165-.453-.351-1.253-.405-2.423-.059-1.266-.071-1.646-.071-4.85s.012-3.585.071-4.85c.054-1.17.24-1.97.405-2.423.192-.538.421-.921.827-1.327.406-.406.789-.635 1.327-.827.453-.165 1.253-.351 2.423-.405 1.266-.059 1.646-.071 4.85-.071m0-2.163c-3.259 0-3.667.014-4.947.072-1.281.058-2.162.271-2.908.58-.781.326-1.438.766-2.09 1.419-.654.653-1.093 1.31-1.419 2.09-.309.746-.522 1.627-.58 2.908-.059 1.28-.072 1.688-.072 4.947s.014 3.667.072 4.947c.058 1.281.271 2.162.58 2.908.326.781.766 1.438 1.419 2.09.653.654 1.31 1.093 2.09 1.419.746.309 1.627.522 2.908.58 1.28.059 1.688.072 4.947.072s3.667-.014 4.947-.072c1.281-.058 2.162-.271 2.908-.58.781-.326 1.438-.766 2.09-1.419.654-.653 1.093-1.31 1.419-2.09.309-.746.522-1.627.58-2.908.059-1.28.072-1.688.072-4.947s-.014-3.667-.072-4.947c-.058-1.281-.271-2.162-.58-2.908-.326-.781-.766-1.438-1.419-2.09-.653-.654-1.31-1.093-2.09-1.419-.746-.309-1.627-.522-2.908-.58-1.28-.059-1.688-.072-4.947-.072zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.205 0-4-1.795-4-4s1.795-4 4-4 4 1.795 4 4-1.795 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.441 0 .796.645 1.441 1.441 1.441.796 0 1.441-.645 1.441-1.441 0-.796-.645-1.441-1.441-1.441z" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}