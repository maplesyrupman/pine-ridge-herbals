"use client"

import React, { useState, useEffect } from 'react';
import LoadingCircleCheckmark from '@/components/loadingSpinner';

const ParentComponent = () => {
    const [isLoading, setIsLoading] = useState(true);

    // simulate an async task that sets loading to false after 3 seconds
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 3000);
        return () => clearTimeout(timer); // cleanup
    }, []);

    return (
        <div className="py-20">
            <LoadingCircleCheckmark isLoading={isLoading} />
        </div>
    );
};

export default ParentComponent;
