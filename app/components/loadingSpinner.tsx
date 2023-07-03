"use client"
import React from 'react';
import { IoReloadCircle, IoCheckmarkCircleOutline } from 'react-icons/io5';

type Props = {
  isLoading: boolean;
}

const LoadingCircleCheckmark = ({ isLoading }:Props) => {
  return (
    <div className="w-16 h-16 flex items-center justify-center text-primary">
      {isLoading ? (
        <IoReloadCircle className="animate-spin" size="100%" />
      ) : (
        <IoCheckmarkCircleOutline size="100%" />
      )}
    </div>
  );
};

export default LoadingCircleCheckmark;