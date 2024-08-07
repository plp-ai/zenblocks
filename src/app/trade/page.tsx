'use client'

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Settings, ChevronDown } from 'lucide-react';
import ZenNavbar from '@/components/zenNavbar';
import { Katibeh } from 'next/font/google';
import { ZeneTradePageSkeleton } from '@/components/skeletons';

const katibeh = Katibeh({
  subsets: ['latin'],
  weight: ['400'],
});

// Types
interface FundsData {
  safetyModuleAmount: string;
}

interface StakeData {
  totalStaked: string;
  totalStakedValue: string;
  stakingAPR: string;
  maxSlashing: string;
  walletBalance: string;
}

interface UserStakeData {
  stakedZene: string;
  stakedZeneValue: string;
  claimableZene: string;
  claimableZeneValue: string;
}

interface SwapData {
  sellAmount: string;
  sellValue: string;
  buyAmount: string;
  buyValue: string;
  exchangeRate: string;
}

// API functions
const fetchFundsData = async (): Promise<FundsData> => {
  // Simulating API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        safetyModuleAmount: '466.36M',
      });
    }, 500);
  });
};

const fetchStakeData = async (): Promise<StakeData> => {
  // Simulating API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        totalStaked: '2.80M',
        totalStakedValue: '279.84M',
        stakingAPR: '4.69%',
        maxSlashing: '30.00%',
        walletBalance: '0',
      });
    }, 500);
  });
};

const fetchUserStakeData = async (): Promise<UserStakeData> => {
  // Simulating API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        stakedZene: '0',
        stakedZeneValue: '0',
        claimableZene: '0',
        claimableZeneValue: '0',
      });
    }, 500);
  });
};

const fetchSwapData = async (): Promise<SwapData> => {
  // Simulating API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        sellAmount: '12',
        sellValue: '30,097.68',
        buyAmount: '30019.8',
        buyValue: '30,097.68',
        exchangeRate: '0.0004',
      });
    }, 500);
  });
};

const ZeneTradePage: React.FC = () => {
  const [fundsData, setFundsData] = useState<FundsData | null>(null);
  const [stakeData, setStakeData] = useState<StakeData | null>(null);
  const [userStakeData, setUserStakeData] = useState<UserStakeData | null>(null);
  const [swapData, setSwapData] = useState<SwapData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const funds = await fetchFundsData();
      const stake = await fetchStakeData();
      const userStake = await fetchUserStakeData();
      const swap = await fetchSwapData();

      setFundsData(funds);
      setStakeData(stake);
      setUserStakeData(userStake);
      setSwapData(swap);
    };

    fetchData();
  }, []);

  if (!fundsData || !stakeData || !userStakeData || !swapData) {
    return <ZeneTradePageSkeleton />;
  }

  return (
    <>
      <ZenNavbar />
      <div className="relative min-h-screen w-full">
        <div className="absolute top-0 left-0 w-full h-1/2 bg-custom-gradient"></div>
        <div className="absolute left-0 bottom-0 w-full h-1/2 bg-white"></div>
      
        <div className={`relative z-10 min-h-screen w-full flex flex-col px-4 sm:px-6 lg:px-8 text-white ${katibeh.className}`}>
          <p className="text-xl mb-2 mt-4">Available on @Zenesphere</p>
          <h2 className="text-6xl mb-2">Trade</h2>
          <p className="text-lg uppercase tracking-wide mb-8">Stake and swap</p>

          <div className="mb-8">
            <h3 className="text-3xl mb-2">Funds in the Safety Module</h3>
            <p className="text-5xl font-bold">$ {fundsData.safetyModuleAmount}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="bg-white text-black rounded-lg overflow-hidden lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-4xl font-bold">Stake Zene</CardTitle>
                <p className="text-xl text-gray-600">Total staked : {stakeData.totalStaked} (${stakeData.totalStakedValue})</p>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-100 p-4 rounded-lg mb-4 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="bg-purple-600 text-white p-2 rounded-lg">
                      <span className="font-bold">Z</span>
                    </div>
                    <span className="font-bold">Zene</span>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-xl text-gray-600">Staking APR</p>
                      <p className="font-bold">{stakeData.stakingAPR}</p>
                    </div>
                    <div>
                      <p className="text-xl text-gray-600">Max slashing</p>
                      <p className="font-bold">{stakeData.maxSlashing}</p>
                    </div>
                    <div>
                      <p className="text-xl text-gray-600">Wallet Balance</p>
                      <p className="font-bold">{stakeData.walletBalance}</p>
                    </div>
                  </div>
                  <Button className="bg-gray-300 text-gray-600">Stake</Button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Card className="bg-gray-100 p-4 rounded-lg">
                    <h4 className="text-xl font-bold mb-2">Staked ZENE</h4>
                    <p className="text-4xl font-bold mb-2">{userStakeData.stakedZene}</p>
                    <p className="text-xl text-gray-600 mb-4">$ {userStakeData.stakedZeneValue}</p>
                    <Button variant="outline" className="w-full">Cooldown to unstake</Button>
                    <p className="text-xl text-gray-6000 mt-2">Cooldown period <span className="font-bold">20d</span></p>
                  </Card>
                  <Card className="bg-gray-100 p-4 rounded-lg">
                    <h4 className="text-xl font-bold mb-2">Claimable ZENE</h4>
                    <p className="text-4xl font-bold mb-2">{userStakeData.claimableZene}</p>
                    <p className="text-xl text-gray-600 mb-4">$ {userStakeData.claimableZeneValue}</p>
                    <div className="flex space-x-2">
                      <Button variant="outline" className="flex-1">Claim</Button>
                      <Button variant="outline" className="flex-1">Restake</Button>
                    </div>
                    <p className="text-xl text-gray-600 mt-2">Zene per month</p>
                  </Card>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white text-black rounded-lg overflow-hidden">
              <CardHeader>
                <CardTitle className="text-4xl font-bold">Swap</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-gray-100 p-4 rounded-lg flex justify-between items-center">
                    <div>
                      <p className="text-xl text-gray-600">Sell</p>
                      <Input className="text-4xl font-bold bg-transparent border-none" placeholder={swapData.sellAmount} />
                      <p className="text-xl text-gray-600">${swapData.sellValue}</p>
                    </div>
                    <Button variant="outline" className="flex items-center">
                      <span className="mr-2">Zene</span>
                      <ChevronDown size={16} />
                    </Button>
                  </div>
                  <div className="bg-gray-100 p-4 rounded-lg flex justify-between items-center">
                    <div>
                      <p className=" text-gray-6000 text-xl">Buy</p>
                      <Input className="text-4xl font-bold bg-transparent border-none" placeholder={swapData.buyAmount} />
                      <p className=" text-gray-600 text-xl">${swapData.buyValue}</p>
                    </div>
                    <Button variant="outline" className="flex items-center text-xl">
                      <span className="mr-2">USDC</span>
                      <ChevronDown size={16} />
                    </Button>
                  </div>
                  <Button className="w-full bg-gray-300 text-gray-600">Insufficient ETH balance</Button>
                  <div className="flex justify-between  text-gray-600 text-xl">
                    <span>1 USDC = {swapData.exchangeRate} WETH ($1.00)</span>
                    <span>$0.80 <ChevronDown size={16} className="inline" /></span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default ZeneTradePage;