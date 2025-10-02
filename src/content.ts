const SELECTION_DELAY = 10;
const EXTENSION_NAME = 'Word Select Fixer';

let isEnabled = true; 

interface SelectionResult {
  success: boolean;
  error?: Error;
}


class Logger {
  private static prefix = `[${EXTENSION_NAME}]`;

  static error(message: string, error?: Error): void {
    console.error(`${this.prefix} ${message}`, error || '');
  }

  static warn(message: string): void {
    console.warn(`${this.prefix} ${message}`);
  }

  static info(message: string): void {
    console.info(`${this.prefix} ${message}`);
  }
}

function validateSelection(selection: Selection | null): selection is Selection {
  if (!selection) {
    Logger.warn('No selection object available');
    return false;
  }

  if (selection.rangeCount === 0) {
    Logger.warn('Selection has no ranges');
    return false;
  }

  return true;
}

function countTrailingWhitespace(text: string): number {
  let count = 0;
  for (let i = text.length - 1; i >= 0; i--) {
    if (/\s/.test(text[i])) {
      count++;
    } else {
      break;
    }
  }
  return count;
}

function removeTrailingWhitespace(): SelectionResult {
  if (!isEnabled) {
    return { success: true };
  }

  try {
    const selection = window.getSelection();

    if (!validateSelection(selection)) {
      return { success: false };
    }

    const selectedText = selection.toString();

    if (!selectedText || !/\s$/.test(selectedText)) {
      return { success: true };
    }

    const range = selection.getRangeAt(0);
    const endNode = range.endContainer;
    const endOffset = range.endOffset;

    const trailingSpaces = countTrailingWhitespace(selectedText);

    if (trailingSpaces === 0) {
      return { success: true };
    }

    if (!endNode || typeof endOffset !== 'number') {
      Logger.error('Invalid range properties');
      return { success: false };
    }

    const newRange = document.createRange();
    newRange.setStart(range.startContainer, range.startOffset);
    newRange.setEnd(endNode, endOffset - trailingSpaces);

    selection.removeAllRanges();
    selection.addRange(newRange);

    Logger.info(`Removed ${trailingSpaces} trailing space(s)`);
    return { success: true };

  } catch (error) {
    const err = error instanceof Error ? error : new Error(String(error));
    Logger.error('Failed to remove trailing whitespace', err);
    return { success: false, error: err };
  }
}

function handleDoubleClick(_event: MouseEvent): void {
  if (!isEnabled) {
    return;
  }

  setTimeout(() => {
    const result = removeTrailingWhitespace();
    
    if (!result.success && result.error) {
    }
  }, SELECTION_DELAY);
}

function loadEnabledState(): void {
  chrome.storage.local.get(['enabled'], (result) => {
    isEnabled = result.enabled !== false;
    
    if (result.enabled === undefined) {
      chrome.storage.local.set({ enabled: true });
    }
    
    Logger.info(`Extension ${isEnabled ? 'enabled' : 'disabled'}`);
  });
}

function setupMessageListener(): void {
  chrome.runtime.onMessage.addListener((message, _sender, _sendResponse) => {
    if (message.action === 'toggleExtension') {
      isEnabled = message.enabled;
      Logger.info(`Extension ${isEnabled ? 'enabled' : 'disabled'} via message`);
    }
  });
}

function init(): void {
  try {
    loadEnabledState();

    setupMessageListener();

    document.addEventListener('dblclick', handleDoubleClick, true);
    Logger.info('Extension initialized successfully');
  } catch (error) {
    const err = error instanceof Error ? error : new Error(String(error));
    Logger.error('Failed to initialize extension', err);
  }
}

init();