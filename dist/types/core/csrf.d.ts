import { OarRequestConfig } from '../types';
/**
 * 设置 csrf cookie
 * 会同时在 headers 和 data 中设置
 * 将来会从 data 中移除
 */
export default function setCsrfToken(request: OarRequestConfig): void;
