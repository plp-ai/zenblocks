'use client'
import React, { useState, useRef, useCallback, useEffect } from 'react';
import io, { Socket } from 'socket.io-client';
import { Camera, Wallet, Gift } from 'lucide-react';
import { SparklesCore } from "@/components/ui/sparkles";
import { TracingBeam } from "@/components/ui/tracing-beam";
import { WavyBackground } from '@/components/ui/wavy-background';
import Navbar from '../navbar';
import { createThirdwebClient } from "thirdweb";
import { darkTheme } from 'thirdweb/react';
import { createWallet, walletConnect } from 'thirdweb/wallets';
import { ConnectButton, TransactionButton, useActiveAccount } from "thirdweb/react";
import { prepareContractCall, toWei } from "thirdweb";
import { contract } from "../utils/contracts";
import { claimTo } from "thirdweb/extensions/erc20";

const client = createThirdwebClient({ clientId: '2805dfbc10effa5e19b46e51d19cd19e' });

const wallets = [
  createWallet("io.metamask"),
  createWallet("com.coinbase.wallet"),
  walletConnect(),
  createWallet("com.trustwallet.app"),
  createWallet("io.zerion.wallet"),
  createWallet("me.rainbow"),
];

const YinYangIcon = ({ onClick, isRecording }) => (
  <svg
    width="128"
    height="128"
    viewBox="0 0 128 128"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`cursor-pointer transition-transform duration-300 hover:scale-110 ${isRecording ? 'animate-pulse' : ''}`}
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

// const ConnectWalletButton = ({ onClick, walletConnected }) => (
//   <button
//     onClick={onClick}
//     className={`absolute top-4 right-4 p-2 rounded-lg flex items-center transition-colors duration-200 ${
//       walletConnected ? 'bg-green-600 text-white' : 'bg-purple-900 hover:bg-purple-800 text-purple-100'
//     }`}
//   >
//     <Wallet className="w-6 h-6 mr-2" />
//     <span>{walletConnected ? 'Connected' : 'Connect Wallet'}</span>
//   </button>
// );

const LandingPage: React.FC = () => {
  const [attentionUnits, setAttentionUnits] = useState<number>(0);
  const [claimableAU, setClaimableAU] = useState<number>(0);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [showCamera, setShowCamera] = useState<boolean>(false);
  const [sessionEnded, setSessionEnded] = useState<boolean>(false);
  const [processedFrame, setProcessedFrame] = useState<string | null>(null);
  const [isClaiming, setIsClaiming] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const socketRef = useRef<Socket | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [isClaimed, setIsClaimed] = useState<boolean>(false);
  const account = useActiveAccount();


  

  const startSession = useCallback(async () => {
    try {
      const response = await fetch('http://127.0.0.1:5001/start-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ timeLimit: 10 }),
      });

      if (response.ok || (response.status === 400 && (await response.json()).message === "Session already active")) {
        console.log("Session started successfully");
      } else {
        throw new Error('Failed to start session');
      }
    } catch (error) {
      console.error('Error starting session:', error);
    }
  }, []);

  const stopSession = useCallback(async () => {
    try {
      const response = await fetch('http://127.0.0.1:5001/stop-session', { method: 'POST' });
      if (response.ok) {
        const data = await response.json();
        console.log("Earned tokens:", data.earnedTokens);
        setClaimableAU(data.earnedTokens);
        setIsRecording(false);
        setShowCamera(false);
        setSessionEnded(true);
        if (socketRef.current) {
          socketRef.current.disconnect();
        }
      } else {
        throw new Error('Failed to stop session');
      }
    } catch (error) {
      console.error('Error stopping session:', error);
    }
  }, []);

  

  useEffect(() => {
    if (isRecording) {
      startSession();
      setShowCamera(true);
      
      const initiateVideo = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: { width: 640, height: 480 } });
          streamRef.current = stream;
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            videoRef.current.onloadedmetadata = () => {
              videoRef.current?.play();
            };
          }

          socketRef.current = io('http://127.0.0.1:5001/video');
          socketRef.current.on('connect', () => console.log('Connected to socket'));

          const canvas = canvasRef.current;
          const context = canvas?.getContext('2d');
          if (!canvas || !context) {
            throw new Error('Canvas or context not found');
          }

          let lastFrameTime = 0;
          const fps = 10; // Limit to 10 frames per second

          const sendFrame = (currentTime: number) => {
            if (currentTime - lastFrameTime > 1000 / fps) {
              if (videoRef.current && videoRef.current.videoWidth > 0 && videoRef.current.videoHeight > 0) {
                canvas.width = videoRef.current.videoWidth;
                canvas.height = videoRef.current.videoHeight;
                context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
                const frame = canvas.toDataURL('image/jpeg', 0.5); // Reduce quality to 50%
                socketRef.current?.emit('video_frame', frame.split(',')[1]);
              }
              lastFrameTime = currentTime;
            }
            if (isRecording) {
              requestAnimationFrame(sendFrame);
            }
          };

          socketRef.current.on('processed_frame', (data: string) => {
            setProcessedFrame(`data:image/jpeg;base64,${data}`);
          });

          requestAnimationFrame(sendFrame);
        } catch (error) {
          console.error('Error accessing webcam:', error);
        }
      };

      initiateVideo();

      return () => {
        if (streamRef.current) {
          streamRef.current.getTracks().forEach(track => track.stop());
        }
        if (socketRef.current) {
          socketRef.current.disconnect();
        }
      };
    }
  }, [isRecording, startSession]);

  const toggleRecording = useCallback(() => {
    if (isRecording) {
      stopSession();
    } else {
      setIsRecording(true);
      setSessionEnded(false);
      setShowCamera(true);
      startSession();
    }
  }, [isRecording, stopSession, startSession]);

  const claimAU = async () => {
    if (!account) {
      console.error('No active account');
      return;
    }

    setIsClaiming(true);
    try {
      await claimTo({
        contract,
        to: account.address,
        quantity: BigInt(claimableAU.toString()).toString()
      });
      setAttentionUnits((prev) => prev + claimableAU);
      setClaimableAU(0);
      setSessionEnded(false);
      setIsClaimed(true);
    } catch (error) {
      console.error('Error claiming AU:', error);
    } finally {
      setIsClaiming(false);
    }
  };


  return (
    <div className="flex flex-col min-h-screen bg-black">
      <Navbar />
      <main className="flex-grow relative overflow-hidden">
        <WavyBackground className="absolute inset-0">
          <div className="relative z-10 flex flex-col items-center justify-center min-h-full py-4 px-4">
            <ConnectButton
              client={client}
              wallets={wallets}
              theme={darkTheme({
                colors: {
                  accentText: "#4A148C",
                  accentButtonBg: "#4A148C",
                  accentButtonText: "#ffffff",
                  primaryButtonBg: "#4A148C",
                  primaryButtonText: "#ffffff",
                },
              })}
              connectButton={{
                label: "Sign in with Wallet",
              }}
            />
            <div className="w-full max-w-4xl space-y-8 flex flex-col items-center">
              <TracingBeam className="px-6 w-full">
                <div className="space-y-8 flex flex-col items-center">
                  <YinYangIcon isRecording={isRecording} onClick={toggleRecording} />
                  <h1 className="text-3xl font-extrabold tracking-tight text-purple-200 sm:text-4xl">
                    Earn AU Tokens by Meditating
                  </h1>
                  <p className="text-xl text-purple-400 sm:text-2xl">
                    {isRecording ? "Session in progress..." : sessionEnded ? "Session ended. Claim your tokens!" : "Start a session and let your mindfulness be rewarded!"}
                  </p>
                  {showCamera && (
                    <div className="relative w-full max-w-md mx-auto mt-4">
                      <video
                        ref={videoRef}
                        className="rounded-lg w-full"
                        style={{ display: processedFrame ? 'none' : 'block' }}
                      />
                      <canvas ref={canvasRef} style={{ display: 'none' }} />
                      {processedFrame && (
                        <img 
                          src={processedFrame} 
                          alt="Processed frame" 
                          className="rounded-lg w-full"
                        />
                      )}
                      <div className="absolute top-2 left-2 bg-red-500 rounded-full w-3 h-3 animate-pulse"></div>
                    </div>
                  )}
                  <div className="flex space-x-4">
                    {sessionEnded && claimableAU > 0 && account && !isClaimed && (
                      <TransactionButton
                        transaction={() => (
                          claimTo({
                            contract,
                            to: account.address,
                            quantity: BigInt(claimableAU.toString()).toString()
                          })
                        )}
                        onTransactionConfirmed={() => {
                          setIsClaimed(true);
                          setAttentionUnits((prev) => prev + claimableAU);
                          setClaimableAU(0);
                        }}
                        className={`flex items-center p-2 rounded-lg ${
                          isClaiming ? 'bg-gray-500' : 'bg-yellow-500 hover:bg-yellow-600'
                        } text-black transition-colors duration-200`}
                      >
                        <Gift className="w-6 h-6 mr-2" />
                        <span>{isClaiming ? 'Claiming...' : `Claim ${claimableAU} AU`}</span>
                      </TransactionButton>
                    )}
                    {isClaimed && (
                      <p className="text-green-500 font-bold">Successfully Claimed!</p>
                    )}
                  </div>
                </div>
              </TracingBeam>
              <SparklesCore className="w-full" />
            </div>
          </div>
        </WavyBackground>
      </main>
      <footer className="py-4 bg-gray-900 text-center text-sm text-gray-500">
        © 2024 Mindful Meditation App. All rights reserved.
      </footer>
    </div>
  );
};

export default LandingPage;