const Hero = () => {
  return (
    <div className="flex flex-col md:flex-row items-end justify-between py-32.5 w-full">
      <div className="flex flex-col items-start justify-start h-full">
        <span
          className=" font-heading font-bold text-9xl leading-[120px] text-[#243C4C]
     max-md:text-7xl max-md:leading-[90px]"
        >
          De me Omnia
        </span>
        <span className=" font-sans font-semibold text-xl  text-[#243C4C]">
          A Latin Phrase translating to &apos;All Things About Me&apos;
        </span>
      </div>
      <div className="flex flex-col items-end justify-end text-xl h-full">
        <span className=" font-sans font-bold text  text-[#243C4C] ">
          A Portfolio Website
        </span>
        <span className="font-sans font-semibold text-xl  text-[#243C4C] ">
          By Ryfaem, a Software Developer
        </span>
      </div>
    </div>
  );
};

export default Hero;
