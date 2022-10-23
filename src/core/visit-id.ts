import { OarRequestConfig } from '../types';

const visitIdName = 'visit_id';

/**
 * 在data中设置 visit_id
 * 根据全局变量__statisObserver.__visitId中记录的值设置
 */
export default function setVisitId(request: OarRequestConfig) {
  const VISIT_ID =
    window['__statisObserver'] && window['__statisObserver']['__visitId'];
  if (!request.data) {
    request.data = {};
  }
  if (
    typeof request.data === 'object' &&
    (!request.data[visitIdName] || request.data[visitIdName] === '')
  ) {
    request.data[visitIdName] = VISIT_ID ? VISIT_ID : '';
  }
}
