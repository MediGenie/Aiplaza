export interface SocialCallbackData {
  id: string;
  type: 'apple' | 'google' | 'naver';
  email?: string;
}
