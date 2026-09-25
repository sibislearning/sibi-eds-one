import showPageInfo from '../page-info/page-info.js';

export default function init(sk) {
  sk.addEventListener('custom:page-info', showPageInfo);
}
