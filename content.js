// Listen for double-click events on the entire page
document.addEventListener('dblclick', function() {
  // Small delay to let the browser complete its default selection
  setTimeout(function() {
    const selection = window.getSelection();
    
    // If nothing is selected, do nothing
    if (!selection || selection.rangeCount === 0) {
      return;
    }
    
    // Get the selected text
    const selectedText = selection.toString();
    
    // Check if selection ends with whitespace
    if (selectedText && /\s$/.test(selectedText)) {
      const range = selection.getRangeAt(0);
      
      // Shrink selection from the end by removing trailing whitespace
      let newEnd = range.endOffset;
      const endNode = range.endContainer;
      
      // Count trailing whitespace characters
      let trailingSpaces = 0;
      for (let i = selectedText.length - 1; i >= 0; i--) {
        if (/\s/.test(selectedText[i])) {
          trailingSpaces++;
        } else {
          break;
        }
      }
      
      // Create new range without trailing spaces
      const newRange = document.createRange();
      newRange.setStart(range.startContainer, range.startOffset);
      newRange.setEnd(endNode, newEnd - trailingSpaces);
      
      // Update the selection
      selection.removeAllRanges();
      selection.addRange(newRange);
    }
  }, 10); // 10ms delay is enough for browser to complete selection
}, true);