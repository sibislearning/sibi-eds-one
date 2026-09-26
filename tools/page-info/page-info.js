function getEnvironment() {
  const { hostname } = window.location;

  if (hostname === 'localhost') {
    return 'dev';
  }

  if (hostname.endsWith('.aem.page')) {
    return 'preview';
  }

  if (hostname.endsWith('.aem.live')) {
    return 'live';
  }

  return 'unknown';
}

function getBranch() {
  const { hostname } = window.location;
  const match = hostname.match(/^([^-]+)--sibi-eds-one--sibislearning/);

  return match ? match[1] : 'unknown';
}

function createInfoRow(label, value, copyable = false) {
  const row = document.createElement('div');
  row.className = 'page-info-row';

  const labelElement = document.createElement('strong');
  labelElement.textContent = label;

  const valueContainer = document.createElement('div');
  valueContainer.className = 'page-info-value';

  const valueElement = document.createElement('span');
  valueElement.textContent = value;

  valueContainer.append(valueElement);

  if (copyable) {
    const copyButton = document.createElement('button');
    copyButton.type = 'button';
    copyButton.className = 'page-info-copy';
    copyButton.textContent = 'Copy';

    copyButton.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(value);
        copyButton.textContent = 'Copied';

        setTimeout(() => {
          copyButton.textContent = 'Copy';
        }, 1500);
      } catch (error) {
        copyButton.textContent = 'Failed';
      }
    });

    valueContainer.append(copyButton);
  }

  row.append(labelElement, valueContainer);

  return row;
}

export default function showPageInfo() {
  const existingPanel = document.querySelector('#page-info-panel');

  if (existingPanel) {
    existingPanel.remove();
    return;
  }

  const pagePath = window.location.pathname;
  const pageUrl = window.location.href;
  const pageTitle = document.title;
  const environment = getEnvironment();
  const branch = getBranch();

  const panel = document.createElement('div');
  panel.id = 'page-info-panel';

  const overlay = document.createElement('div');
  overlay.className = 'page-info-overlay';

  const modal = document.createElement('div');
  modal.className = 'page-info-modal';

  const header = document.createElement('div');
  header.className = 'page-info-header';

  const title = document.createElement('strong');
  title.textContent = 'Page Info';

  const closeButton = document.createElement('button');
  closeButton.type = 'button';
  closeButton.className = 'page-info-close';
  closeButton.textContent = '×';

  header.append(title, closeButton);

  const content = document.createElement('div');
  content.className = 'page-info-content';

  content.append(
    createInfoRow('Page Title', pageTitle),
    createInfoRow('Page Path', pagePath, true),
    createInfoRow('Page URL', pageUrl, true),
    createInfoRow('Environment', environment),
    createInfoRow('Branch', branch),
    createInfoRow('Content Source', 'Google Drive'),
  );

  modal.append(header, content);
  overlay.append(modal);
  panel.append(overlay);
  document.body.append(panel);

  const style = document.createElement('link');
  style.rel = 'stylesheet';
  style.href = '/tools/page-info/page-info.css';
  document.head.append(style);

  closeButton.addEventListener('click', () => {
    panel.remove();
  });

  overlay.addEventListener('click', (event) => {
    if (event.target === overlay) {
      panel.remove();
    }
  });
}
