import Error from "next/error";
import { NextRequest, NextResponse } from "next/server";

const sdk = require('api')('@omnisend/v3#9oe029lgeqk0a0');

export async function POST(request: NextRequest) {
    const { email } = await request.json();

    sdk.auth('6488e50c5329201f46487a4d-nWFfCxJzjdukPjWP6ciedmBQq4en1FRjdL263uGSznI0tV2aiU');
    try {
        const response = await sdk.pOSTContacts({
            identifiers: [
                {
                    type: 'email',
                    channels: { email: { status: 'subscribed' } },
                    sendWelcomeMessage: false,
                    id: email
                }
            ]
        })
        console.log(response);
        if (response.status === 200) {
            return NextResponse.json({ message: 'Signup successful' });
        } else {
            return NextResponse.json({ message: 'Failed to add user to email list' });
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'error' });
    }
}