const toggle = document.getElementById('enableToggle');
const label = document.getElementById('toggleLabel');

chrome.storage.local.get(['enabled'], function(result) {
  const isEnabled = result.enabled !== false;
  toggle.checked = isEnabled;
  updateLabel(isEnabled);
});

toggle.addEventListener('change', function() {
  const isEnabled = toggle.checked;
  
  chrome.storage.local.set({ enabled: isEnabled }, function() {
    updateLabel(isEnabled);
    
    chrome.tabs.query({}, function(tabs) {
      tabs.forEach(tab => {
        chrome.tabs.sendMessage(tab.id, { 
          action: 'toggleExtension', 
          enabled: isEnabled 
        }).catch(() => {
        });
      });
    });
  });
});

function updateLabel(isEnabled) {
  if (isEnabled) {
    label.textContent = 'ENABLED';
    label.classList.add('enabled');
  } else {
    label.textContent = 'DISABLED';
    label.classList.remove('enabled');
  }
}