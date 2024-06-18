"use client";
import PollCreateForm from "./components/PollCreateForm";

function VercelLogo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      aria-label="Vercel Logo"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 19"
      {...props}
    >
      <path
        clipRule="evenodd"
        d="M12.04 2L2.082 18H22L12.04 2z"
        fill="#000"
        fillRule="evenodd"
        stroke="#000"
        strokeWidth="1.5"
      />
    </svg>
  );
}

// DARICK — This is the entry point/template!
export default async function Home() {
  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-2 lg:px-8 h-screen">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm m-auto">
        <img className="mx-auto h-80 w-auto" src="https://github.com/daria-github/2-truths-frame/blob/46b2b6f01033528cdf55b3000444756b762d5139/public/eyeGraphic.png?raw=true" alt="XMTP Logo" />
        <h2 className="-mt-14 text-center text-4xl font-semibold leading-9 text-white font-playfair drop-shadow-lg"><span className="text-5xl italic font-bold">2</span> Truths and a Lie</h2>
        <p className="mt-1 text-center text-lg font-normal text-gray-400 leading-6 font-playfair">Enter your 2 truths and 1 lie statements and a frame will be created for others to guess.</p>
        <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-sm">
          <PollCreateForm />
        </div>
      </div>
    </div>
  );
}
