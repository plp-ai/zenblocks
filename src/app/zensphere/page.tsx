"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Krona_One, Katibeh } from 'next/font/google';
import { Separator } from '@/components/ui/separator';
import ZenNavbar from '@/components/zenNavbar';
import { ZeneDashboardSkeleton } from '@/components/skeletons';

const kronaOne = Krona_One({
  subsets: ['latin'],
  weight: ['400'],
});
const katibeh = Katibeh({
  subsets: ['latin'],
  weight: ['400'],
});

// Define types for our data structures
interface Supply {
  asset: string;
  amount: string;
}

interface Borrow {
  asset: string;
  amount: string;
}

interface Asset {
  name: string;
  balance: string;
}

interface Person {
  name: string;
  balance: string;
}

// Simulated API calls with TypeScript types
const fetchNetWorth = async (): Promise<string> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return "$0";
};

const fetchNetAPY = async (): Promise<string> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return "-";
};

const fetchSupplies = async (): Promise<Supply[]> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return [];
};

const fetchBorrows = async (): Promise<Borrow[]> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return [];
};

const fetchAssetsToSupply = async (): Promise<Asset[]> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return [{ name: "ETH", balance: "0.0000011" }];
};

const fetchPeopleToDonate = async (): Promise<Person[]> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return Array(6).fill({ name: "xyz", balance: "0" });
};

const ZeneDashboard: React.FC = () => {
  const [netWorth, setNetWorth] = useState<string>("$0");
  const [netAPY, setNetAPY] = useState<string>("-");
  const [supplies, setSupplies] = useState<Supply[]>([]);
  const [borrows, setBorrows] = useState<Borrow[]>([]);
  const [assetsToSupply, setAssetsToSupply] = useState<Asset[]>([]);
  const [peopleToDonate, setPeopleToDonate] = useState<Person[]>([]);
  const [showZeroBalance, setShowZeroBalance] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [netWorthData, netAPYData, suppliesData, borrowsData, assetsData, peopleData] = await Promise.all([
          fetchNetWorth(),
          fetchNetAPY(),
          fetchSupplies(),
          fetchBorrows(),
          fetchAssetsToSupply(),
          fetchPeopleToDonate()
        ]);

        setNetWorth(netWorthData);
        setNetAPY(netAPYData);
        setSupplies(suppliesData);
        setBorrows(borrowsData);
        setAssetsToSupply(assetsData);
        setPeopleToDonate(peopleData);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error state here
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <ZeneDashboardSkeleton />;
  }
  const handleSupply = () => {
    // Implement supply logic
  };

  const handleBuy = () => {
    // Implement buy logic
  };

  const handleDetails = () => {
    // Implement details logic
  };

  const handleShowAssetsWithZeroBalance = (checked: boolean) => {
    setShowZeroBalance(checked);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredPeopleToDonate = peopleToDonate.filter(person =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <ZenNavbar />
      <div className="relative min-h-screen w-full">
        {/* Gradient Background */}
        <div className="absolute top-0 left-0 w-full h-1/2 bg-custom-gradient"></div>
        {/* White Background */}
        <div className="absolute left-0 bottom-0 w-full h-1/2 bg-white"></div>

        {/* Content */}
        <div className="relative z-10 min-h-screen w-full flex flex-col px-4 sm:px-6 lg:px-8">
          <div className="text-white py-8 sm:py-12">
            <h2 className={`${kronaOne.className} text-2xl sm:text-3xl font-semibold mb-2 text-center sm:text-left ml-32`}>ZENESPHERE</h2>
            <div className="flex flex-col sm:flex-row sm:space-x-4 items-center sm:items-start">
              <div className={`${katibeh.className} text-lg sm:text-xl font-semibold mb-2 ml-32`}>Net Worth: {netWorth}</div>
              <div className={`${katibeh.className} text-lg sm:text-xl font-semibold mb-2 ml-32`}>Net APY: {netAPY}</div>
            </div>
          </div>

          <div className="flex-grow">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-md mx-auto lg:max-w-none">
              <Card className="w-full max-w-lg mx-2 ">
                <CardHeader>
                  <CardTitle className={`${katibeh.className} text-2xl sm:text-3xl font-bold mb-2 text-center sm:text-left`}>Your Supplies</CardTitle>
                </CardHeader>
                <CardContent className="text-center sm:text-left">
                  {supplies.length > 0 ? (
                    supplies.map((supply, index) => (
                      <div key={index}>{supply.asset}: {supply.amount}</div>
                    ))
                  ) : (
                    "Nothing supplied yet"
                  )}
                </CardContent>
              </Card>

              <Card className="w-full max-w-lg mx-2 " >
                <CardHeader>
                  <CardTitle className={`${katibeh.className} text-2xl sm:text-3xl font-bold mb-2 text-center sm:text-left`}>Your Borrows</CardTitle>
                </CardHeader>
                <CardContent className="text-center sm:text-left">
                  {borrows.length > 0 ? (
                    borrows.map((borrow, index) => (
                      <div key={index}>{borrow.asset}: {borrow.amount}</div>
                    ))
                  ) : (
                    "Nothing borrowed yet"
                  )}
                </CardContent>
              </Card>

              <Card className="w-full max-w-lg mx-2 h-56">
                <CardHeader>
                  <CardTitle className={`${katibeh.className} text-2xl sm:text-3xl font-bold mb-2 text-center sm:text-left`}>
                    Assets to supply
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-4 flex justify-center sm:justify-start">
                    <Checkbox id="show-zero-balance" onCheckedChange={handleShowAssetsWithZeroBalance} />
                    <label htmlFor="show-zero-balance" className="ml-2">Show assets with 0 balance</label>
                  </div>
                  {assetsToSupply.map((asset, index) => (
                    <div key={index} className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0 sm:space-x-2">
                      <div>{asset.name}</div>
                      <div>{asset.balance}</div>
                      <div className="flex space-x-2">
                        <Button onClick={handleSupply} className="bg-customPurple text-white">Supply</Button>
                        <Button variant="outline" className="bg-customPurple text-white">•••</Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="w-full  mx-2 ">
                <CardHeader>
                  <CardTitle className={`${katibeh.className} text-2xl sm:text-3xl font-bold mb-2 text-center sm:text-left`}>People To Donate</CardTitle>
                </CardHeader>
                <CardContent>
                  <Input
                    type="search"
                    placeholder="Search by user name"
                    onChange={handleSearch}
                    className="mb-4"
                  />
                  <Separator />
                  <div className="space-y-4 mt-4">
                    {filteredPeopleToDonate.map((person, index) => (
                      <div key={index} className="flex flex-row justify-between items-center sm:items-center space-y-2 sm:space-y-0">
                        <div>{person.name}</div>
                        <div>{person.balance}</div>
                        <div className="flex space-x-2">
                          <Button onClick={handleBuy} className="bg-customPurple text-white">Buy</Button>
                          <Button variant="outline" onClick={handleDetails} className="bg-customPurple text-white">Details</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ZeneDashboard;