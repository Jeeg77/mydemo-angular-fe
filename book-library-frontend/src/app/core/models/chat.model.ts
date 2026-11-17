import { Book } from './book.model';
export interface ChatRequest {
  message: string;
}
export interface ChatResponse {
  response: string;
  /** Reserved for the planned structured response from the AI service. */
  internalBooks?: Book[];
  externalBooks?: Book[];
}
