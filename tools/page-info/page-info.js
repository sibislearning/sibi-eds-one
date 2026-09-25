export default function showPageInfo() {
  const existingPanel = document.querySelector('#page-info-panel');
  if (existingPanel) {
    existingPanel.remove();
    return;
  }

  const pagePath = window.location.pathname;
  const pageUrl = window.location.href;
  const pageTitle = document.title;

  const panel = document.createElement('div');
  panel.id = 'page-info-panel';

  panel.innerHTML = `
    <div class="page-info-overlay">
      <div class="page-info-modal">
        <div class="page-info-header">
          <strong>Page Info</strong>
          <button type="button" class="page-info-close">x</button>
        </div>

        <div class="page-info-content">
          <p>
            <strong>Page Title</strong>
            <span>${pageTitle}</span>
          </p>

          <p>
            <strong>Page Path</strong>
            <span>${pagePath}</span>
          </p>

          <p>
            <strong>Page URL</strong>
            <span>${pageUrl}</span>
          </p>
        </div>
      </div>
    </div>
  `;

  document.body.append(panel);

  const style = document.createElement('link');
  style.rel = 'stylesheet';
  style.href = '/tools/page-info/page-info.css';
  document.head.append(style);

  panel.querySelector('.page-info-close').addEventListener('click', () => {
    panel.remove();
  });

  panel.querySelector('.page-info-overlay').addEventListener('click', (event) => {
    if (event.target.classList.contains('page-info-overlay')) {
      panel.remove();
    }
  });
}
