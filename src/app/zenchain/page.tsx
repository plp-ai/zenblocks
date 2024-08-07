'use client'
import React, { useState, useRef, useCallback } from 'react';
import { Camera, Zap, Wallet, Gift } from 'lucide-react';
import Webcam from 'react-webcam';
import { SparklesCore } from "@/components/ui/sparkles";
import { TracingBeam } from "@/components/ui/tracing-beam";
import { WavyBackground } from '@/components/ui/wavy-background';

import Navbar from '../navbar';

const YinYangIcon = ({  onClick }) => (
  <svg
    width="128"
    height="128"
    viewBox="0 0 128 128"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`cursor-pointer transition-transform duration-300 hover:scale-110 `}
    onClick={onClick}
  >
    <circle cx="64" cy="64" r="64" fill="url(#gradient)" />
    <path
      d="M64 0C28.7 0 0 28.7 0 64s28.7 64 64 64 64-28.7 64-64S99.3 0 64 0zm0 121.6C32.2 121.6 6.4 95.8 6.4 64S32.2 6.4 64 6.4s57.6 25.8 57.6 57.6-25.8 57.6-57.6 57.6z"
      fill="black"
    />
    <path
      d="M64 6.4c-31.8 0-57.6 25.8-57.6 57.6S32.2 121.6 64 121.6V6.4z"
      fill="black"
    />
    <circle cx="64" cy="32" r="16" fill="#9C27B0" />
    <circle cx="64" cy="96" r="16" fill="black" />
    <circle cx="64" cy="32" r="6.4" fill="white" />
    <circle cx="64" cy="96" r="6.4" fill="#9C27B0" />
    <defs>
      <linearGradient id="gradient" x1="0" y1="0" x2="128" y2="128" gradientUnits="userSpaceOnUse">
        <stop stopColor="white" />
        <stop offset="1" stopColor="black" />
      </linearGradient>
    </defs>
  </svg>
);

const ConnectWalletButton = ({ onClick, walletConnected }) => (
  <button
    onClick={onClick}
    className={`absolute top-4 right-4 p-2 rounded-lg flex items-center transition-colors duration-200 ${
      walletConnected ? 'bg-green-600 text-white' : 'bg-purple-900 hover:bg-purple-800 text-purple-100'
    }`}
  >
    <Wallet className="w-6 h-6 mr-2" />
    <span>{walletConnected ? 'Connected' : 'Connect Wallet'}</span>
  </button>
);

const LandingPage = () => {
  const [attentionUnits, setAttentionUnits] = useState(0);
  const [claimableAU, setClaimableAU] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);
  const [sessionEnded, setSessionEnded] = useState(false);
  const webcamRef = useRef(null);

  const connectWallet = () => {
    setTimeout(() => setWalletConnected(true), 1000);
  };

  const toggleRecording = useCallback(() => {
    if (isRecording) {
      setSessionEnded(true);
      const earnedAU = Math.floor(Math.random() * 50) + 10;
      setClaimableAU(earnedAU);
    }
    setIsRecording((prev) => !prev);
  }, [isRecording]);

  const claimAU = () => {
    setAttentionUnits((prev) => prev + claimableAU);
    setClaimableAU(0);
    setSessionEnded(false);
  };

  const WebcamComponent = () => (
    <div className="relative w-full max-w-md mx-auto mt-4">
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        className="rounded-lg w-full"
      />
      <div className="absolute top-2 left-2 bg-red-500 rounded-full w-3 h-3 animate-pulse"></div>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen bg-black">
      <Navbar />
      <main className="flex-grow relative overflow-hidden">
        <WavyBackground className="absolute inset-0">
          <div className="relative z-10 flex flex-col items-center justify-center min-h-full py-4 px-4">
            <ConnectWalletButton onClick={connectWallet} walletConnected={walletConnected} />
            <div className="w-full max-w-4xl space-y-8 flex flex-col items-center">
              <TracingBeam className="px-6 w-full">
                <div className="space-y-8 flex flex-col items-center">
                  <YinYangIcon isRecording={isRecording} onClick={toggleRecording} />
                  <p className="text-white text-center">
                    {isRecording ? "Click to end your focus session" : "Click to begin tracking your attention"}
                  </p>

                  {isRecording && <WebcamComponent />}

                  {sessionEnded && claimableAU > 0 && (
                    <button 
                      className="bg-green-600 hover:bg-green-500 text-white p-4 rounded-lg flex items-center transition-colors duration-200"
                      onClick={claimAU}
                    >
                      <Gift className="w-6 h-6 mr-2" />
                      <span>Claim AU</span>
                    </button>
                  )}

                 
                </div>
              </TracingBeam>
            </div>
          </div>
        </WavyBackground>
      </main>
    </div>
  );
};

export default LandingPage;