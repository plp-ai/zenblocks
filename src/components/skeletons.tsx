import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const ZeneTradePageSkeleton: React.FC = () => {
  return (
    <div className="relative min-h-screen w-full">
      <div className="absolute top-0 left-0 w-full h-1/2 bg-custom-gradient"></div>
      <div className="absolute left-0 bottom-0 w-full h-1/2 bg-white"></div>
      
      <div className="relative z-10 min-h-screen w-full flex flex-col px-4 sm:px-6 lg:px-8 text-white">
        <Skeleton className="h-8 w-64 mb-2 mt-4" />
        <Skeleton className="h-16 w-48 mb-2" />
        <Skeleton className="h-6 w-40 mb-8" />

        <div className="mb-8">
          <Skeleton className="h-10 w-80 mb-2" />
          <Skeleton className="h-12 w-48" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="bg-white text-black rounded-lg overflow-hidden lg:col-span-2">
            <CardHeader>
              <Skeleton className="h-10 w-48 mb-2" />
              <Skeleton className="h-6 w-64" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-24 w-full mb-4" />
              <div className="grid grid-cols-2 gap-4">
                <Skeleton className="h-48 w-full" />
                <Skeleton className="h-48 w-full" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white text-black rounded-lg overflow-hidden">
            <CardHeader>
              <Skeleton className="h-10 w-32 mb-2" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-6 w-full" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export const ZeneDashboardSkeleton: React.FC = () => {
  return (
    <div className="relative min-h-screen w-full">
      <div className="absolute top-0 left-0 w-full h-1/2 bg-custom-gradient"></div>
      <div className="absolute left-0 bottom-0 w-full h-1/2 bg-white"></div>

      <div className="relative z-10 min-h-screen w-full flex flex-col px-4 sm:px-6 lg:px-8">
        <div className="text-white py-8 sm:py-12">
          <Skeleton className="h-10 w-48 mb-2 mx-auto sm:mx-0 sm:ml-32" />
          <div className="flex flex-col sm:flex-row sm:space-x-4 items-center sm:items-start">
            <Skeleton className="h-6 w-40 mb-2 sm:ml-32" />
            <Skeleton className="h-6 w-40 mb-2 sm:ml-32" />
          </div>
        </div>

        <div className="flex-grow">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-md mx-auto lg:max-w-none">
            {[1, 2, 3, 4].map((index) => (
              <Card key={index} className="w-full max-w-lg mx-2">
                <CardHeader>
                  <Skeleton className="h-8 w-48 mb-2" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-6 w-full mb-2" />
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-6 w-1/2" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};