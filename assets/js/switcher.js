// AI Website Switcher
// Handles instant switching between three AI-generated website versions

(function() {
  'use strict';

  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    const buttons = document.querySelectorAll('.switcher-nav button');

    buttons.forEach(button => {
      button.addEventListener('click', handleSwitch);
    });
  }

  function handleSwitch(event) {
    const targetId = event.currentTarget.dataset.target;

    // Remove active class from all buttons
    document.querySelectorAll('.switcher-nav button').forEach(btn => {
      btn.classList.remove('active');
    });

    // Remove active class from all iframes
    document.querySelectorAll('.ai-frame').forEach(frame => {
      frame.classList.remove('active');
    });

    // Add active class to clicked button
    event.currentTarget.classList.add('active');

    // Add active class to corresponding iframe
    const targetFrame = document.getElementById(targetId);
    if (targetFrame) {
      targetFrame.classList.add('active');
    }
  }
})();
