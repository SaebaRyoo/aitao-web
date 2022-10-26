import request from '../core/request';

export async function goodsList(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any }
) {
  return request(`/api/spu/search/${params.current}/${params.pageSize}`, {
    method: 'post',
    data: params,
    ...(options || {}),
  });
}
