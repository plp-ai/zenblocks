'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Wallet, Globe } from 'lucide-react';
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { SparklesCore } from '@/components/ui/sparkles';
import { createThirdwebClient } from "thirdweb";
import { darkTheme, useActiveAccount } from 'thirdweb/react';
import { createWallet, walletConnect } from 'thirdweb/wallets';
import { ThirdwebProvider, ConnectButton } from "thirdweb/react";

const client = createThirdwebClient({ clientId: '2805dfbc10effa5e19b46e51d19cd19e' });

const wallets = [
  createWallet("io.metamask"),
  createWallet("com.coinbase.wallet"),
  walletConnect(),
  createWallet("com.trustwallet.app"),
  createWallet("io.zerion.wallet"),
  createWallet("me.rainbow"),
];

const CustomButton = ({ onClick, className, children }: { onClick: () => void; className: string; children: React.ReactNode }) => (
  <button
    onClick={onClick}
    className={`w-full p-4 rounded-lg flex justify-between items-center transition-colors duration-200 ${className}`}
  >
    {children}
  </button>
);

const SignInPage = () => {
  const router = useRouter();
  const account = useActiveAccount();
  const [walletConnected, setWalletConnected] = useState(false);

  // Redirect after wallet connection
  useEffect(() => {
    if (walletConnected) {
      router.push('/zenchain');
    }
  }, [walletConnected, router]);

  const handleSignIn = (provider: string) => {
    console.log(`Signing in with ${provider}`);
    setWalletConnected(!!account); // Set walletConnected based on whether account is connected
    // This will trigger the useEffect to redirect
  };

  return (
    <div className="min-h-screen flex bg-black">
      <SparklesCore
        id="tsparticles"
        background="transparent"
        minSize={0.6}
        maxSize={1.4}
        particleDensity={100}
        className="w-full h-full absolute"
        particleColor="#006400"
      />
      <div className="flex-grow flex items-center justify-center">
        <BackgroundGradient className="rounded-[22px] max-w-sm p-4 sm:p-10 ">
          <main className="max-w-md w-full space-y-8 z-10 mx-auto antialiased pt-4 relative">
            <div className="text-center">
              <TextGenerateEffect words="Welcome to ZenChain" className="text-4xl font-bold text-purple-400 mb-2" />
              <p className="text-purple-200">Sign in to start your focus journey</p>
            </div>
            <div className="space-y-4">
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
                  connectModal={{
                    size: "wide",
                    title: "Sign In with Wallet",
                    welcomeScreen: {
                      title: "ZenBlock",
                      img: {
                        src: "https://drive.google.com/file/d/1S9ZCufM1YNNKiCflWWYwxEZgWoy-jhXZ/view?usp=sharing",
                        width: 150,
                        height: 150,
                      },
                    },
                  }}
                  onConnect={() => setWalletConnected(true)} // Set walletConnected to true on connect
                />
              <CustomButton 
                className="bg-purple-900 hover:bg-purple-800 text-purple-100"
                onClick={() => handleSignIn('WorldID')}
              >
                <div className="flex items-center">
                  <Globe className="w-6 h-6 mr-4" />
                  <span className="text-lg font-semibold">Sign in with WorldID</span>
                </div>
              </CustomButton>
            </div>
            <p className="text-center text-purple-300 text-sm">
              By signing in, you agree to our Terms of Service and Privacy Policy
            </p>
          </main>
        </BackgroundGradient>
      </div>
    </div>
  );
};

export default SignInPage;
