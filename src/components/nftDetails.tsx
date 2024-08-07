'use client'
import React, { useState, useEffect } from 'react';
import { Heart, BarChart2, Clock, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';

const priceData = [
  { date: 'Jul 21', price: 0.1 },
  { date: 'Jul 23', price: 0.15 },
  { date: 'Jul 25', price: 0.2 },
  { date: 'Jul 31', price: 0.2195 },
];

const NFTListing = ({ nft }) => {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const end = new Date(nft.saleEnds);
      const difference = end.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [nft.saleEnds]);

  return (
    <div className="flex flex-col lg:flex-row w-full text-white p-4">
      <div className="lg:w-1/2 p-4">
        <img src={nft.imageUrl} alt={nft.name} className="w-full rounded-lg" />
        
        <div className="mt-4">
          <h2 className="text-white font-bold mb-2">Description</h2>
          <p className="text-gray-400">{nft.description}</p>
        </div>
        
        <Accordion type="single" collapsible className="w-full mt-4">
          <AccordionItem value="traits" className="w-full">
            <AccordionTrigger className="text-white w-full">Traits</AccordionTrigger>
            <AccordionContent className="w-full">
              <Card className="bg-gray-800 w-full">
                <CardContent className="p-4">
                  <ul className="space-y-2">
                    {Object.entries(nft.traits).map(([trait, { value, rarity }]) => (
                      <li key={trait} className="flex justify-between items-center">
                        <div>
                          <p className="text-xs text-gray-400">{trait}</p>
                          <p className="font-bold text-white">{value}</p>
                        </div>
                        <p className="text-xs text-gray-400">{rarity}% have this trait</p>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="about" className="w-full">
            <AccordionTrigger className="text-white w-full">About {nft.collection.name}</AccordionTrigger>
            <AccordionContent className="w-full">
              <p className="text-gray-400">{nft.collection.description}</p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <div className="lg:w-1/2 p-4 space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">{nft.name}</h1>
          <button className="p-2 rounded-full bg-gray-800 hover:bg-gray-700">
            <Heart size={20} className="text-gray-400" />
          </button>
        </div>
        <p className="text-gray-400">Owned by <span className="text-blue-500">{nft.owner}</span></p>
        <Card className="bg-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 text-gray-400">
              <Clock size={16} />
              <p>Sale ends {nft.saleEnds}</p>
            </div>
            <div className="flex justify-between mt-2">
              {Object.entries(timeLeft).map(([unit, value]) => (
                <div key={unit} className="text-center">
                  <p className="text-xl font-bold text-white">{value.toString().padStart(2, '0')}</p>
                  <p className="text-xs text-gray-400">{unit}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <div className="space-y-2">
          <p className="text-sm text-gray-400">Current price</p>
          <div className="flex items-end space-x-2">
            <p className="text-3xl font-bold text-white">{nft.price} ETH</p>
            <p className="text-gray-400">(${nft.priceUSD})</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded">
            Buy now
          </button>
          <button className="flex-1 bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 px-4 rounded border border-gray-600">
            Make offer
          </button>
        </div>
        <div className="pt-4">
          <h2 className="text-white font-bold flex items-center mb-2">
            <BarChart2 size={20} className="mr-2" /> Price History
          </h2>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={priceData}>
              <XAxis dataKey="date" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Line type="monotone" dataKey="price" stroke="#3B82F6" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="listings" className="w-full">
            <AccordionTrigger className="text-white w-full">Listings</AccordionTrigger>
            <AccordionContent className="w-full">
              {/* Add listings content here */}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="offers" className="w-full">
            <AccordionTrigger className="text-white w-full">Offers</AccordionTrigger>
            <AccordionContent className="w-full">
              {/* Add offers content here */}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default NFTListing;