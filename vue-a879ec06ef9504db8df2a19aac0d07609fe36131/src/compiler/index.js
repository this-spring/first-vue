/*
 * @Author: xiuquanxu
 * @Company: kaochong
 * @Date: 2016-04-10 19:47:28
 * @LastEditors: xiuquanxu
 * @LastEditTime: 2020-08-14 00:04:34
 */
import { parse } from './html-parser'
import { generate } from './codegen'

const cache = Object.create(null)
const TAG = 'Compiler-index';

export function compile (html) {
  html = html.trim()
  console.log(TAG, html);
  const hit = cache[html];
  const res = hit || (cache[html] = generate(parse(html)));
  console.log(TAG, res);
  return res;
}
