(function() {
  // Get the deployed URL from the script tag
  const scriptElement = document.currentScript;
  const baseUrl = scriptElement.src.split('/floating.js')[0];

  // Create widget container
  const container = document.createElement('div');
  container.style.position = 'fixed';
  container.style.top = '75px';
  container.style.left = '50%';
  container.style.transform = 'translateX(-50%)';
  container.style.zIndex = '9999';
  container.style.width = '400px';
  container.style.maxWidth = '90vw';
  container.style.display = 'none';
  container.style.backgroundColor = 'white';
  container.style.borderRadius = '8px';
  container.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';

  // Create toggle button
  const button = document.createElement('button');
  button.style.position = 'fixed';
  button.style.top = '25px';
  button.style.left = '50%';
  button.style.transform = 'translateX(-50%)';
  button.style.zIndex = '9999';
  button.style.padding = '9px 18px';
  button.style.borderRadius = '6px';
  button.style.backgroundColor = '#1D6FB9';
  button.style.color = 'white';
  button.style.cursor = 'pointer';
  button.style.border = 'none';
  button.style.boxShadow = '0 1.5px 3px rgba(0,0,0,0.1)';
  button.style.transition = 'all 0.2s ease';
  button.style.fontSize = '12px';
  button.style.fontWeight = '700';
  button.style.letterSpacing = '0.375px';
  button.style.fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  button.style.display = 'flex';
  button.style.alignItems = 'center';
  button.style.gap = '8px';

  // Add calculator icon
  const calculatorIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect width="16" height="20" x="4" y="2" rx="2"></rect>
      <line x1="8" x2="16" y1="6" y2="6"></line>
      <line x1="16" x2="16" y1="14" y2="18"></line>
      <path d="M16 10h.01"></path>
      <path d="M12 10h.01"></path>
      <path d="M8 10h.01"></path>
      <path d="M12 14h.01"></path>
      <path d="M8 14h.01"></path>
      <path d="M12 18h.01"></path>
      <path d="M8 18h.01"></path>
    </svg>
  `;

  // Set initial button content
  button.innerHTML = `INSTANT ESTIMATE ${calculatorIcon}`;

  // Get widget config
  const widgetElement = document.getElementById('accounting-widget-floating');
  let config;
  
  try {
    config = widgetElement?.dataset.config 
      ? JSON.parse(decodeURIComponent(widgetElement.dataset.config))
      : null;
  } catch (e) {
    console.error('Invalid widget configuration:', e);
    config = null;
  }

  // Create iframe
  const iframe = document.createElement('iframe');
  iframe.style.width = '100%';
  iframe.style.height = '600px';
  iframe.style.border = 'none';
  iframe.style.borderRadius = '8px';
  
  // Set iframe source with config
  const configParam = config ? `?config=${encodeURIComponent(JSON.stringify(config))}` : '';
  iframe.src = `${baseUrl}/widget${configParam}`;

  // Add close button
  const closeButton = document.createElement('button');
  closeButton.innerHTML = '&times;';
  closeButton.style.position = 'absolute';
  closeButton.style.right = '10px';
  closeButton.style.top = '10px';
  closeButton.style.background = 'none';
  closeButton.style.border = 'none';
  closeButton.style.fontSize = '24px';
  closeButton.style.cursor = 'pointer';
  closeButton.style.color = '#666';

  // Add toggle functionality
  let isOpen = false;
  button.addEventListener('click', () => {
    isOpen = !isOpen;
    container.style.display = isOpen ? 'block' : 'none';
  });

  // Add hover effects
  button.addEventListener('mouseover', () => {
    button.style.backgroundColor = '#22C55E';
  });
  
  button.addEventListener('mouseout', () => {
    button.style.backgroundColor = '#1D6FB9';
  });

  closeButton.addEventListener('click', () => {
    isOpen = false;
    container.style.display = 'none';
  });

  // Add elements to page
  container.appendChild(closeButton);
  container.appendChild(iframe);
  document.body.appendChild(button);
  document.body.appendChild(container);
})();