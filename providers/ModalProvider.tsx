"use client";
import { useState, useEffect } from "react";

import AuthModal from "@/components/AuthModal";
import UploadModal from "@/components/UploadModal";
import SubscribeModal from "@/components/SubscribeModal";
import { ProductWithPrice } from "@/types";
import CommentModal from "@/components/CommentModal";
import ArticleUploadModal from "@/components/ArticleUploadModal";

interface ModalProviderProps {
  products: ProductWithPrice[];
}
const ModalProvider: React.FC<ModalProviderProps> = ({ products }) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <AuthModal />
      <UploadModal />
      <SubscribeModal products={products} />
      <CommentModal />
      <ArticleUploadModal />
    </>
  );
};

export default ModalProvider;
