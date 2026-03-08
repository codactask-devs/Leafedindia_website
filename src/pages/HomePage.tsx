import NavBar from '../shared/NavBar';

const HomePage = () => {
    return (
        <div className="min-h-screen bg-[#fdfcf0] relative overflow-x-hidden">
            <div className="absolute inset-0 z-0">
                <div className="h-[96px] bg-[#0a5d3c] w-full"></div>
                <div className="flex h-full w-full">
                    <div className="flex-1 h-full bg-[#fdfcf0]"></div>
                    <div className="w-[18%] h-full bg-[#fb923c] hidden md:block"></div>
                </div>
            </div>

            <div className="relative z-10">
                <NavBar />

                <div className="pt-[160px]">
                </div>
            </div>
        </div>
    )
}

export default HomePage;

