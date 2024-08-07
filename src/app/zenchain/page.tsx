'use client'
import React, { useState, useRef, useCallback } from 'react';
import { Camera, Zap, Wallet, Gift } from 'lucide-react';
import Webcam from 'react-webcam';
import { SparklesCore } from "@/components/ui/sparkles";
import { TracingBeam } from "@/components/ui/tracing-beam";
import { WavyBackground } from '@/components/ui/wavy-background';

import Navbar from '../navbar';

const CustomButton = ({ onClick, className, children }: { onClick: () => void; className: string; children: React.ReactNode }) => (
  <button
    onClick={onClick}
    className={`w-full p-4 rounded-lg flex justify-between items-center transition-colors duration-200 ${className}`}
  >
    {children}
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
          <div className="relative z-10 flex items-center justify-center min-h-full py-4 px-4">
            <div className="w-full max-w-4xl space-y-8">
              <TracingBeam className="px-6">
                <div className="space-y-8">
                  <CustomButton 
                    className="bg-purple-900 hover:bg-purple-800 text-purple-100"
                    onClick={toggleRecording}
                  >
                    <div>
                      <h3 className="text-lg font-semibold text-left">{isRecording ? "Stop Focusing" : "Start Focusing"}</h3>
                      <p className="text-left">{isRecording ? "Click to end your focus session" : "Begin tracking your attention"}</p>
                    </div>
                    {isRecording ? <Zap className="w-6 h-6 flex-shrink-0" /> : <Camera className="w-6 h-6 flex-shrink-0" />}
                  </CustomButton>

                  {isRecording && <WebcamComponent />}

                  {sessionEnded && claimableAU > 0 && (
                    <CustomButton 
                      className="bg-green-600 hover:bg-green-500 text-white"
                      onClick={claimAU}
                    >
                      <div>
                        <h3 className="text-lg font-semibold text-left">Claim {claimableAU} AU</h3>
                        <p className="text-left">Great job focusing! Claim your earned Attention Units</p>
                      </div>
                      <Gift className="w-6 h-6 flex-shrink-0" />
                    </CustomButton>
                  )}

                  {!walletConnected && (
                    <CustomButton 
                      className="bg-purple-900 hover:bg-purple-800 text-purple-100"
                      onClick={connectWallet}
                    >
                      <div>
                        <h3 className="text-lg font-semibold text-left">Connect MetaMask</h3>
                        <p className="text-left">Link your wallet to start earning</p>
                      </div>
                      <Wallet className="w-6 h-6 flex-shrink-0" />
                    </CustomButton>
                  )}

                  {walletConnected && (
                    <div className="bg-purple-900 border border-purple-400 rounded-lg p-4">
                      <h3 className="text-lg font-semibold text-purple-200">Wallet Connected!</h3>
                      <p className="text-purple-300">Your MetaMask wallet is now linked. Attention Units will be transferred automatically.</p>
                    </div>
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