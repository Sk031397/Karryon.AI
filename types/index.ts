export enum ConversationStatus {
  ACTIVE = 'active',
  ENDED = 'ended',
  ERROR = 'error',
}

export type IConversation = {
  conversation_id: string;
  conversation_name: string;
  status: ConversationStatus;
  conversation_url: string;
  conversational_context:string;
  replica_id?: string | null;
  persona_id?: string | null;
  created_at?: string;
};