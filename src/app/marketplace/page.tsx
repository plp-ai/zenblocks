"use client"

import React from 'react';
import { useRouter } from 'next/navigation';
import { DollarSign, Zap, TrendingUp, List } from 'lucide-react';
import { ApolloClient, InMemoryCache, gql, useQuery } from '@apollo/client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Katibeh } from 'next/font/google'
import ZenNavbar from '@/components/zenNavbar';

const katibeh = Katibeh({
  weight: '400',
  subsets: ['latin'],
});

const client = new ApolloClient({
  uri: 'https://api.goldsky.com/api/public/project_clzhilgmcabka01z6hrh032kq/subgraphs/superhack-optimism-sepolia/1.0.0/gn',
  cache: new InMemoryCache(),
});

const GET_LISTINGS = gql`
  query MyQuery {
    listingCreateds(orderBy: idParam, first: 100) {
      idParam
      price
      seller
      amount
    }
  }
`;

interface MetricCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, icon }) => (
  <div className="p-4">
    <div className="flex items-center mb-2">
      <h3 className="text-3xl text-white mr-2">{title}</h3>
      {icon}
    </div>
    <p className="text-4xl text-white">{value}</p>
  </div>
);

interface Offer {
  idParam: string;
  seller: string;
  amount: string;
  price: string;
}

interface OfferCardProps {
  offer: Offer;
  onDetails: (offerId: string) => void;
}

const OfferCard: React.FC<OfferCardProps> = ({ offer, onDetails }) => (
  <Card>
    <CardContent className="pt-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-3xl">{offer.amount} AU</span>
        <span className="text-3xl">${parseFloat(offer.price).toFixed(2)}</span>
      </div>
      <p className="text-gray-600 mb-4 text-md">Seller: {offer.seller}</p>
      <Button className="w-full" onClick={() => onDetails(offer.idParam)}>
        Details
      </Button>
    </CardContent>
  </Card>
);

const AUMarketplace: React.FC = () => {
  const router = useRouter();
  const { loading, error, data } = useQuery(GET_LISTINGS, { client });
  const [newOffer, setNewOffer] = React.useState({ amount: '', price: '' });

  const handleDetails = (offerId: string) => {
    router.push(`/nftDetails`);
  };

  const handleCreateOffer = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Creating new offer:', newOffer);
    setNewOffer({ amount: '', price: '' });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const offers: Offer[] = data?.listingCreateds || [];

  return (
    <>
      <ZenNavbar />
      <div className="relative min-h-screen w-full">
        {/* Gradient Background */}
        <div className="absolute top-0 left-0 w-full h-2/3 bg-custom-gradient"></div>
        {/* White Background */}
        <div className="absolute left-0 bottom-0 w-full h-1/3 bg-white"></div>
        <main className={`relative z-10 min-h-screen w-full flex flex-col px-4 sm:px-6 lg:px-8 ${katibeh.className}`}>
          <div className="text-left mb-8">
            <p className="text-white mt-8">Available on @Zenesphere</p>
            <h1 className="text-4xl mb-2 text-white">Attention Unit Marketplace</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <MetricCard title="Total AU Traded" value="1,23,456" icon={<DollarSign className="h-8 w-8 text-white text-lg" />} />
            <MetricCard title="Current AU Price" value="$0.47" icon={<Zap className="h-8 w-8 text-white text-lg" />} />
            <MetricCard title="24h Volume" value="98,765 AU" icon={<TrendingUp className="h-8 w-8 text-white text-lg" />} />
            <MetricCard title="Active Listings" value={offers.length.toString()} icon={<List className="h-8 w-8 text-white text-lg" />} />
          </div>
      
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-2/3">
              <Card className="h-full">
                <CardContent>
                  <h2 className="text-3xl mt-4 mb-4">Available Listings</h2>
                  <div className="space-y-4 overflow-y-auto max-h-[calc(100vh-300px)]">
                    {offers.map((offer) => (
                      <OfferCard key={offer.idParam} offer={offer} onDetails={handleDetails} />
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
                    <Button type="submit" className="w-full">
                      Create Listing
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