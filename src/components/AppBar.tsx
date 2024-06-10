import { FC } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import { useAutoConnect } from '../contexts/AutoConnectProvider';
import NetworkSwitcher from './NetworkSwitcher';
import NavElement from './nav-element';
import useUserBitzStore from 'stores/useUserBitzStore';
import { FlaskRound } from 'lucide-react';

const WalletMultiButtonDynamic = dynamic(
  async () =>
    (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
  { ssr: false },
);

export const AppBar: React.FC = () => {
  const { autoConnect, setAutoConnect } = useAutoConnect();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { bitzBalance, cooldown } = useUserBitzStore();

  const FlaskBottleAnimation = () => {
    return (
      <div className="relative w-full h-full">
        {cooldown <= 0 && cooldown != -2 && (
          <>
            <div
              className="absolute rounded-full w-[0.4rem] h-[0.4rem] top-[-15px] left-[10px] bg-[#35d9fa] animate-ping-slow"
              style={{ animationDelay: '1s' }}
            ></div>
            <div
              className="absolute rounded-full w-[0.3rem] h-[0.3rem] top-[-8px] left-[4px] bg-[#35d9fa] animate-ping-slow"
              style={{ animationDelay: '0.5s' }}
            ></div>
            <div className="absolute rounded-full w-1 h-1 top-[-5px] left-[13px] bg-[#35d9fa] animate-ping-slow"></div>
          </>
        )}
        <FlaskRound className="fill-[#35d9fa]" />
      </div>
    );
  };

  const BitzScore = () => {
    return (
      <div className="shadow-sm shadow-[#35d9fa] rounded-lg justify-center">
        <div className="text-sm tracking-wide hover:bg-transparent">
          {bitzBalance === -2 ? (
            <span className="flex items-center gap-0.5 blinkMe text-lg p-2">
              ... <FlaskBottleAnimation />
            </span>
          ) : (
            <>
              {bitzBalance === -1 ? (
                <div className="flex items-center gap-0.5 text-base p-2">
                  0 <FlaskBottleAnimation />
                </div>
              ) : (
                <div className="flex items-center gap-0.5 text-base p-2">
                  {bitzBalance} <FlaskBottleAnimation />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <div>
      {/* NavBar / Header */}
      <div className="flex h-20 flex-row mb-4 bg-black text-neutral-content bg-opacity-11 justify-between">
        <div className="flex flex-row justify-around align-center">
          <div className="flex justify-center items-center content-center ml-4">
            <img
              src="/itheumLogo.png"
              alt="Itheum Logo"
              className="w-[57px] h-[57px] p-[8x]"
            />
          </div>
          <div className="flex flex-col justify-center items-start content-center ml-4 text-center text-xs md:text-base">
            <h4 className="text-white font-semibold font-epilogue">Itheum</h4>
            <h4 className="bg-gradient-to-r bg-clip-text text-transparent from-violet-500 to-teal-400 font-semibold font-epilogue">
              Get Bitz XP
            </h4>
          </div>
          {/* <div className="dropdown dropdown-end z-50 self-center m-1">
            <div
              tabIndex={0}
              className="btn btn-square btn-ghost text-right mx-3"
            >
              <svg
                className="w-7 h-7"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="p-2 shadow menu dropdown-content bg-base-100 rounded-box sm:max-w-[40svh]"
            >
              <li>
                <div className="flex flex-col bg-opacity-100">
                  <label className="cursor-pointer gap-5 label">
                    <a>Autoconnect</a>
                    <input
                      type="checkbox"
                      checked={autoConnect}
                      onChange={(e) => setAutoConnect(e.target.checked)}
                      className="toggle"
                    />
                  </label>
                  <NetworkSwitcher />
                </div>
              </li>
            </ul>
          </div> */}
        </div>

        {/* Nav Links */}
        {/* <div className="flex items-center gap-3 mr-6">
          <div className="hidden md:inline-flex items-center justify-items gap-6">
            <NavElement
              label="Home"
              href="/"
              navigationStarts={() => setIsNavOpen(false)}
            />
            <NavElement
              label="Basics"
              href="/basics"
              navigationStarts={() => setIsNavOpen(false)}
            />
            <NavElement
              label="Gallery"
              href="/gallery"
              navigationStarts={() => setIsNavOpen(false)}
            />
            <NavElement
              label="Bitz"
              href="/getbitz"
              navigationStarts={() => setIsNavOpen(false)}
            />
          </div>
          <label
            htmlFor="my-drawer"
            className="btn-gh items-center justify-between md:hidden mr-6"
            onClick={() => setIsNavOpen(!isNavOpen)}
          >
            <div className="HAMBURGER-ICON space-y-2.5 ml-5">
              <div
                className={`h-0.5 w-8 bg-purple-600 ${isNavOpen ? 'hidden' : ''}`}
              />
              <div
                className={`h-0.5 w-8 bg-purple-600 ${isNavOpen ? 'hidden' : ''}`}
              />
              <div
                className={`h-0.5 w-8 bg-purple-600 ${isNavOpen ? 'hidden' : ''}`}
              />
            </div>
            <div
              className={`absolute block h-0.5 w-8 animate-pulse bg-purple-600 ${isNavOpen ? '' : 'hidden'}`}
              style={{ transform: 'rotate(45deg)' }}
            ></div>
            <div
              className={`absolute block h-0.5 w-8 animate-pulse bg-purple-600 ${isNavOpen ? '' : 'hidden'}`}
              style={{ transform: 'rotate(135deg)' }}
            ></div>
          </label>
        </div> */}
        <div className="mx-6 mt-1 flex gap-5 items-center">
          <BitzScore />
          <WalletMultiButtonDynamic className="btn-ghost btn-sm relative flex md:hidden text-lg " />
        </div>
      </div>
    </div>
  );
};
