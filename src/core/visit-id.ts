import { OarRequestConfig } from '../types';

const visitIdName = 'visit_id'

/**
 * 设置 visit_id
 */
export default function setVisitId(request: OarRequestConfig) {
  const VISIT_ID = window['__statisObserver'] && window['__statisObserver']['__visitId']
  if (!request.data) {
    request.data = {}
  }
  if (typeof request.data === 'object' && (!request.data[visitIdName] || request.data[visitIdName] === '')) {
    request.data[visitIdName] = VISIT_ID ? VISIT_ID : ''
  }
}
