import { OarRequestConfig } from '../types';
/**
 * 设置 csrf cookie
 * 会同时在 headers 和 data 中设置
 */
export default function setCsrfToken(request: OarRequestConfig): void;
