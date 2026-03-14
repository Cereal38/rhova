export default interface WsCallback<T = void> {
  success: boolean;
  error?: string;
  payload?: T;
}
