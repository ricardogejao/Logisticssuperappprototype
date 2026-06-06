import imgImageCarga24HLogo from "figma:asset/ff739edded819fddd1a75bb2025d56cf2c451f00.png";

function Container() {
  return (
    <div className="absolute h-[596.846px] left-0 top-[426.32px] w-[393.719px]" data-name="Container">
      <div className="absolute inset-[-17.98%_-46.04%_0_-10.92%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 618 704.171">
          <g filter="url(#filter0_f_15_1734)" id="Container">
            <circle cx="309" cy="309" fill="url(#paint0_radial_15_1734)" id="Ellipse 1" r="149" />
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="916.846" id="filter0_f_15_1734" width="735" x="-117" y="-52.6758">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
              <feGaussianBlur result="effect1_foregroundBlur_15_1734" stdDeviation="80" />
            </filter>
            <radialGradient cx="0" cy="0" gradientTransform="translate(309 309) rotate(90) scale(149)" gradientUnits="userSpaceOnUse" id="paint0_radial_15_1734" r="1">
              <stop stopColor="#FE9700" stopOpacity="0.2" />
              <stop offset="1" stopColor="#FF7A00" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function Text() {
  return (
    <div className="absolute h-[31.999px] left-[83.99px] top-[15.99px] w-[106.985px]" data-name="Text">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[32px] left-0 not-italic text-[#0f172b] text-[24px] text-nowrap top-[-0.15px] tracking-[-0.5297px]">Carga24h</p>
    </div>
  );
}

function Container1() {
  return <div className="absolute bg-[rgba(255,215,95,0.21)] blur-2xl filter left-[-19.2px] opacity-90 rounded-[2.06422e+07px] size-[102.398px] top-[-19.2px]" data-name="Container" />;
}

function ImageCarga24HLogo() {
  return (
    <div className="absolute left-0 rounded-[16px] shadow-[0px_10px_15px_-3px_rgba(126,42,12,0.05),0px_4px_6px_-4px_rgba(126,42,12,0.05)] size-[63.999px] top-0" data-name="Image (Carga24h Logo)">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[16px]">
        <div className="absolute bg-[rgba(255,255,255,0)] inset-0 rounded-[16px]" />
        <img alt="" className="absolute max-w-none object-50%-50% object-cover rounded-[16px] size-full" src={imgImageCarga24HLogo} />
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="absolute left-0 size-[63.999px] top-0" data-name="Container">
      <Container1 />
      <ImageCarga24HLogo />
    </div>
  );
}

function Container3() {
  return (
    <div className="absolute h-[63.999px] left-0 top-0 w-[329.721px]" data-name="Container">
      <Text />
      <Container2 />
    </div>
  );
}

function Text1() {
  return (
    <div className="absolute content-stretch flex h-[42.448px] items-start left-0 top-[40.78px] w-[208.385px]" data-name="Text">
      <p className="bg-clip-text font-['Inter:Bold',sans-serif] font-bold leading-[41.4px] not-italic relative shrink-0 text-[36px] text-[rgba(0,0,0,0)] text-nowrap tracking-[-0.5309px]" style={{ WebkitTextFillColor: "transparent", backgroundImage: "linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 100%), linear-gradient(90deg, rgb(245, 73, 0) 0%, rgb(225, 113, 0) 100%)" }}>
        do motorista.
      </p>
    </div>
  );
}

function Heading() {
  return (
    <div className="absolute h-[82.781px] left-0 top-[104px] w-[329.721px]" data-name="Heading 1">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[41.4px] left-0 not-italic text-[#0f172b] text-[36px] text-nowrap top-[0.38px] tracking-[-0.5309px]">O app parceiro</p>
      <Text1 />
    </div>
  );
}

function Paragraph() {
  return (
    <div className="absolute h-[58.5px] left-0 top-[210.77px] w-[319.993px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[29.25px] left-0 not-italic text-[#62748e] text-[18px] top-[0.69px] tracking-[-0.4395px] w-[295px]">Conecte-se às melhores cargas com segurança e simplicidade.</p>
    </div>
  );
}

function Container4() {
  return (
    <div className="absolute h-[269.269px] left-[32px] top-[195.39px] w-[329.721px]" data-name="Container">
      <Container3 />
      <Heading />
      <Paragraph />
    </div>
  );
}

function Button() {
  return (
    <div className="bg-gradient-to-r from-[#ff6900] h-[55.992px] relative rounded-[14px] shadow-[0px_8px_30px_0px_rgba(249,115,22,0.25)] shrink-0 to-[#fe9a00] w-[329.721px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[16px] py-[8px] relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[28px] not-italic relative shrink-0 text-[18px] text-center text-nowrap text-white tracking-[-0.4395px]">Criar conta</p>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="h-[55.992px] relative rounded-[14px] shrink-0 w-[329.721px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[16px] py-[8px] relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[24px] not-italic relative shrink-0 text-[#45556c] text-[16px] text-center text-nowrap tracking-[-0.3125px]">Entrar</p>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-col gap-[15.995px] h-[127.978px] items-start relative shrink-0 w-full" data-name="Container">
      <Button />
      <Button1 />
    </div>
  );
}

function Container6() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[192.592px] items-start left-0 pb-0 pt-[32.615px] px-[31.999px] rounded-tl-[14px] rounded-tr-[14px] top-[660.06px] w-[393.719px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0.615px_0px_0px] border-[rgba(255,255,255,0.5)] border-solid inset-0 pointer-events-none rounded-tl-[14px] rounded-tr-[14px]" />
      <Container5 />
    </div>
  );
}

export default function LogisticsSuperAppPrototype() {
  return (
    <div className="bg-white relative size-full" data-name="Logistics SuperApp Prototype">
      <Container />
      <Container4 />
      <Container6 />
    </div>
  );
}