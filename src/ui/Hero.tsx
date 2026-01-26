
const Hero = () => {
    return (
        <div className="flex flex-row items-end justify-between">

            <div className="flex flex-col items-start justify-start  h-full">
                <span
                    className=" font-heading font-bold text-[128px] leading-[120px] text-[#243C4C]
     max-md:text-[96px] max-md:leading-[90px]"
                >
                    De me Omnia
                </span>
                <span className=" font-sans font-semibold text-2xl  text-[#243C4C]">
                    A Latin Phrase translating to &apos;All Things About Me&apos;
                </span>
            </div>
            <div className="flex flex-col items-end justify-end h-full">
                <span className=" font-sans font-semibold text  text-[#243C4C] ">
                    A Portfolio Website
                </span>
                <span className="font-sans font-semibold text-2xl  text-[#243C4C] ">
                    By Ryfaem, a Software Developer
                </span>
            </div>
        </div>

    )
}

export default Hero