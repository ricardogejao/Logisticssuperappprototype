import svgPaths from "./svg-czr634e9b3";
import imgImageTrackerThings from "./001afb802913c097e150531d4ad7edc4cf79510a.png";
import imgImagePneusGoodyear from "./2e52c76fba273b14321fa4c14aafcbc421511df9.png";
import imgImage5 from "./ea554afe6a3b099537a402fc3936e4a5d86faf3c.png";

function Icon() {
  return (
    <div className="absolute left-[126.73px] size-[15.993px] top-[12px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9925 15.9925">
        <g id="Icon">
          <path d={svgPaths.p309d4500} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33271" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#01a3f8] h-[39.995px] relative rounded-[20048800px] shrink-0 w-[154.715px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Bold',sans-serif] font-bold leading-[18px] left-[63px] not-italic text-[12px] text-center text-white top-[11.79px] whitespace-nowrap">Ativar rastreador</p>
        <Icon />
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="h-[39.995px] relative shrink-0 w-[241.819px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <Button />
      </div>
    </div>
  );
}

function DigitalAccount() {
  return (
    <div className="absolute content-stretch flex h-[39.99px] items-start left-[23.99px] top-[368.89px] w-[242.238px]" data-name="DigitalAccount">
      <Container1 />
    </div>
  );
}

function DigitalAccount1() {
  return <div className="absolute bg-[rgba(255,255,255,0.05)] blur-[64px] left-[170.22px] rounded-[21528900px] size-[159.992px] top-[-39.99px]" data-name="DigitalAccount" />;
}

function ImageTrackerThings() {
  return (
    <div className="absolute inset-[35.15%_-0.09%_33.6%_5.53%]" data-name="Image (TrackerThings)">
      <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgImageTrackerThings} />
    </div>
  );
}

function Layer() {
  return (
    <div className="absolute contents inset-[35.15%_-0.09%_33.6%_5.53%]" data-name="layer1">
      <ImageTrackerThings />
    </div>
  );
}

function ImageGoodyear() {
  return (
    <div className="h-[127.991px] relative shrink-0 w-[175.992px]" data-name="Image (Goodyear)">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <Layer />
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="absolute content-stretch flex h-[127.991px] items-center left-0 pl-[-15.99px] top-[-23.99px] w-[175.992px]" data-name="Container">
      <ImageGoodyear />
    </div>
  );
}

function Text() {
  return (
    <div className="h-[14.988px] relative shrink-0 w-[199.992px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[15px] left-0 not-italic text-[#01a3f8] text-[10px] top-[0.28px] tracking-[2.1172px] uppercase whitespace-nowrap">Rastreamento</p>
      </div>
    </div>
  );
}

function Heading() {
  return (
    <div className="h-[44.973px] relative shrink-0 w-[199.992px]" data-name="Heading 4">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[22.5px] left-[0.16px] not-italic text-[18px] text-white top-[1.03px] tracking-[-0.4395px] w-[234px]">Não perca oportunidades de mais fretes</p>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[1.995px] h-[61.956px] items-start left-0 top-[88px] w-[199.992px]" data-name="Container">
      <Text />
      <Heading />
    </div>
  );
}

function Paragraph() {
  return (
    <div className="absolute h-[38.998px] left-0 top-[161.94px] w-[219.992px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[19.5px] left-0 not-italic text-[12px] text-[rgba(255,255,255,0.8)] top-[0.57px] w-[216px]">Ative o rastreador e acesse cargas que exigem monitoramento.</p>
    </div>
  );
}

function ImagePneusGoodyear() {
  return (
    <div className="absolute h-[96px] left-[-23.84px] overflow-clip top-[225.01px] w-[290px]" data-name="Image (Pneus Goodyear)">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImagePneusGoodyear} />
      <div className="absolute h-[116px] left-0 top-[-5px] w-[290px]" data-name="image 5">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-full left-[-0.04%] max-w-none top-[-3.08%] w-[100.08%]" src={imgImage5} />
        </div>
      </div>
    </div>
  );
}

function DigitalAccount2() {
  return (
    <div className="absolute h-[320.906px] left-[23.99px] top-[23.99px] w-[242.238px]" data-name="DigitalAccount">
      <Container2 />
      <Container3 />
      <Paragraph />
      <ImagePneusGoodyear />
    </div>
  );
}

export default function Container() {
  return (
    <div className="bg-[#071325] border-[#04a4f5] border-l-[3.85px] border-solid overflow-clip relative rounded-[32px] shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)] size-full" data-name="Container">
      <DigitalAccount />
      <DigitalAccount1 />
      <DigitalAccount2 />
    </div>
  );
}