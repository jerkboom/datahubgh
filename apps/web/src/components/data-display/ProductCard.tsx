import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

/**
 * ProductCard Component
 * Displays a bundle or digital product with network indicators, pricing, and CTA.
 * Wrapped in Framer Motion for subtle hover interactions.
 */
export interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  network: "MTN" | "Telecel" | "AirtelTigo";
  volume: string;
  imageUrl?: string;
  onBuy: (id: string) => void;
  isLoading?: boolean;
}

const networkColors = {
  MTN: "bg-yellow-400 text-yellow-950 hover:bg-yellow-500",
  Telecel: "bg-red-500 text-white hover:bg-red-600",
  AirtelTigo: "bg-blue-600 text-white hover:bg-blue-700",
};

export const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price,
  network,
  volume,
  imageUrl,
  onBuy,
  isLoading = false,
}) => {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className="overflow-hidden border border-border bg-card shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
        <CardHeader className="p-0 relative h-40 bg-muted">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm bg-gradient-to-br from-primary/10 to-secondary/10">
              No Image
            </div>
          )}
          <Badge
            className={`absolute top-3 left-3 shadow-sm ${networkColors[network]}`}
          >
            {network}
          </Badge>
        </CardHeader>
        <CardContent className="p-5 flex-grow">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-lg line-clamp-1">{name}</h3>
            <span className="font-bold text-primary">GHS {price.toFixed(2)}</span>
          </div>
          <p className="text-sm text-muted-foreground">Volume: {volume}</p>
        </CardContent>
        <CardFooter className="p-5 pt-0">
          <Button
            className="w-full font-medium"
            onClick={() => onBuy(id)}
            disabled={isLoading}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Buy Now
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};
