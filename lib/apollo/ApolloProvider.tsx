"use client";

import React from 'react';
import { ApolloProvider as Provider } from '@apollo/client'
import client from '../../graphql/client'

export default function ApolloProvider({children}:any) {
    return (
        <Provider client={client}>{children}</Provider>
    )
}