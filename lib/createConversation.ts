import { IConversation } from '@/types';

export const createConversation = async (
    conversation_name: string,
    conversational_context: string
): Promise<IConversation> => {
  try {
    const response = await fetch('https://tavusapi.com/v2/conversations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.NEXT_PUBLIC_TAVUS_API_KEY!,
      },
      body: JSON.stringify({
        persona_id: 'p9a95912',
        conversation_name,
        conversational_context
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};