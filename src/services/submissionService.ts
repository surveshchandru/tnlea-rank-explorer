import { TNLEASubmission } from '@/types';

// The Apps Script Web App URL
const API_URL = process.env.NEXT_PUBLIC_APPS_SCRIPT_URL || '';

export const submitRank = async (
  googleUserId: string, 
  data: Omit<TNLEASubmission, 'userId' | 'createdAt' | 'updatedAt'>
) => {
  if (!API_URL) {
    throw new Error("Apps Script API URL is missing in environment variables.");
  }

  const payload = {
    googleUserId,
    ...data
  };

  const response = await fetch(API_URL, {
    method: 'POST',
    // Sending as text/plain avoids CORS preflight issues with some Apps Script deployments
    // while still passing a JSON string that Apps Script parses.
    headers: {
      'Content-Type': 'text/plain;charset=utf-8',
    },
    body: JSON.stringify(payload),
  });

  const result = await response.json();
  if (result.error) {
    throw new Error(result.error);
  }
  return result;
};

export const getAllSubmissions = async (): Promise<TNLEASubmission[]> => {
  if (!API_URL) {
    console.warn("Apps Script API URL is missing. Returning empty array.");
    return [];
  }

  try {
    const response = await fetch(API_URL, {
      method: 'GET',
      // Optional: you can add cache controls here depending on next.js setup
      cache: 'no-store'
    });
    
    const result = await response.json();
    if (result.error) {
      throw new Error(result.error);
    }
    
    return result.data || [];
  } catch (error) {
    console.error("Failed to fetch submissions:", error);
    return [];
  }
};
