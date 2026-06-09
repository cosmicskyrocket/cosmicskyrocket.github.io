/**
 * FAQ Toggle Functionality
 */

document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      const faqParent = faqItem.parentNode;
      const wasActive = faqParent.classList.contains('faq-active');
      
      // Toggle the active state
      faqParent.classList.toggle('faq-active');
      
      // If opening (not closing), apply typing effect
      if (!wasActive) {
        const faqContent = faqParent.querySelector('.faq-content p');
        if (faqContent && !faqContent.hasAttribute('data-typed')) {
          const originalText = faqContent.textContent;
          faqContent.textContent = '';
          faqContent.setAttribute('data-typed', 'true');
          
          let charIndex = 0;
          const typingSpeed = 1; // milliseconds per character (very fast)
          
          function typeChar() {
            if (charIndex < originalText.length) {
              faqContent.textContent += originalText.charAt(charIndex);
              charIndex++;
              setTimeout(typeChar, typingSpeed);
            }
          }
          
          typeChar();
        }
      }
    });
  });
});
