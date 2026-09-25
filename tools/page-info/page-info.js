export default function showPageInfo() {
  const pagePath = window.location.pathname;
  const pageUrl = window.location.href;

  alert(`Page Path: ${pagePath}\nPage URL: ${pageUrl}`);
}
