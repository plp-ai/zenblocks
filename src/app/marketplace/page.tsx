"use client"

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { DollarSign, Zap, TrendingUp, List } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Katibeh } from 'next/font/google'
import ZenNavbar from '@/components/zenNavbar';
import { ethers } from 'ethers';
import TokenABI from '../ABI/AttentionToken.json';
import MarketplaceABI from '../ABI/Marketplace.json';

const katibeh = Katibeh({
  weight: '400',
  subsets: ['latin'],
});

const tokenAddress = '0x36c891e695a061d540a61ad3cAB96Df2E1B98F29';
const marketplaceAddress = '0x0A8C98cF8AD37c87fc1dE3615Dc0f0385A7b242f';

interface Offer {
  idParam: string;
  seller: string;
  amount: string;
  price: string;
}

interface OfferCardProps {
  offer: Offer;
  onBuy: (offerId: string) => void;
}

const OfferCard: React.FC<OfferCardProps> = ({ offer, onBuy }) => (
  <Card>
    <CardContent className="pt-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-3xl">{offer.amount} AU</span>
        <span className="text-3xl">${parseFloat(offer.price).toFixed(2)}</span>
      </div>
      <p className="text-gray-600 mb-4 text-md">Seller: {offer.seller}</p>
      <Button className="w-full" onClick={() => onBuy(offer.idParam)}>
        Buy Listing
      </Button>
    </CardContent>
  </Card>
);

const AUMarketplace: React.FC = () => {
  const router = useRouter();
  const [offers, setOffers] = useState<Offer[]>([]);
  const [newOffer, setNewOffer] = useState({ amount: '', price: '' });
  const [loading, setLoading] = useState(false);
  
  

  // useEffect(() => {
  //   fetchListings();
  // }, []);

  // async function fetchListings() {
  //   try {
  //     const provider = new ethers.BrowserProvider((window as any).ethereum);
  //     const marketplaceContract = new ethers.Contract(marketplaceAddress, MarketplaceABI, provider);
      
  //     const listingCount = await marketplaceContract.listingCount();
  //     const fetchedOffers = [];
  
  //     for (let i = 1; i <= listingCount; i++) {
  //       const listing = await marketplaceContract.listings(i);
  //       fetchedOffers.push({
  //         idParam: i.toString(),
  //         seller: listing.seller,
  //         amount: ethers.formatUnits(listing.amount, 18),
  //         price: ethers.formatUnits(listing.price, 18)
  //       });
  //     }
  
  //     // Sort offers by ID in descending order (newest first)
  //     fetchedOffers.sort((a, b) => parseInt(b.idParam) - parseInt(a.idParam));
  
  //     setOffers(fetchedOffers);
  //   } catch (error) {
  //     console.error("Error fetching listings:", error);
  //   }
  // }

  async function fetchPythData() {
    const url = 'https://hermes.pyth.network/v2/updates/price/latest?ids%5B%5D=0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace';
    try {
      const response = await fetch(url, { method: 'GET', headers: { accept: 'application/json' } });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      if (data && data.binary && Array.isArray(data.binary.data)) {
        return data.binary.data.map((item: string) => '0x' + item);
      } else {
        throw new Error('Invalid or missing data from Pyth API');
      }
    } catch (error) {
      console.error('Error fetching Pyth data:', error);
      throw error;
    }
  }



  const handleCreateOffer = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Simulate MetaMask popup
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Create a new dummy listing
      const newListing: Offer = {
        idParam: (offers.length + 1).toString(),
        seller: "0x..." + Math.random().toString(36).substring(2, 8), // Generate a dummy address
        amount: newOffer.amount,
        price: newOffer.price
      };

      // Add the new listing to the state
      setOffers(prevOffers => [newListing, ...prevOffers]);
      setNewOffer({ amount: '', price: '' });
      console.log('Dummy listing created successfully');
    } catch (error) {
      console.error('Error creating dummy listing:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBuyListing = async (offerId: string) => {
    setLoading(true);
    try {
      // Simulate MetaMask popup
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Remove the bought listing from the state
      setOffers(prevOffers => prevOffers.filter(offer => offer.idParam !== offerId));
      console.log('Listing bought successfully');
    } catch (error) {
      console.error('Error buying listing:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ZenNavbar />
      <div className="relative min-h-screen w-full">
        <div className="absolute top-0 left-0 w-full h-2/3 bg-custom-gradient"></div>
        <div className="absolute left-0 bottom-0 w-full h-1/3 bg-white"></div>
        <main className={`relative z-10 min-h-screen w-full flex flex-col px-4 sm:px-6 lg:px-8 ${katibeh.className}`}>
          <div className="text-left mb-8">
            <p className="text-white mt-8">Available on @Zenesphere</p>
            <h1 className="text-4xl mb-2 text-white">Attention Unit Marketplace</h1>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-2/3">
              <Card className="h-full">
                <CardContent>
                  <h2 className="text-3xl mt-4 mb-4">Available Listings</h2>
                  <div className="space-y-4 overflow-y-auto max-h-[calc(100vh-300px)]">
                    {offers.map((offer) => (
                      <OfferCard key={offer.idParam} offer={offer} onBuy={handleBuyListing} />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="lg:w-1/3">
              <Card className="h-full">
                <CardContent>
                  <h2 className="text-3xl mt-4 mb-4">Create New Listing</h2>
                  <form onSubmit={handleCreateOffer} className="space-y-4">
                    <div>
                      <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount (AU)</label>
                      <Input
                        type="number"
                        id="amount"
                        value={newOffer.amount}
                        onChange={(e) => setNewOffer({...newOffer, amount: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price ($)</label>
                      <Input
                        type="number"
                        id="price"
                        value={newOffer.price}
                        onChange={(e) => setNewOffer({...newOffer, price: e.target.value})}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? 'Processing...' : 'Create Listing'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default AUMarketplace;