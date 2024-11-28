Thank you for the clarification! Since you're working with `<div>` elements that are `contenteditable`, the `:empty` pseudo-class won't apply as expected because `contenteditable` elements are not considered "empty" as soon as they contain anything, even just a space.

To replicate the placeholder functionality for `contenteditable` `<div>` elements, you will need a slightly different approach. Here's how you can handle it:

### Solution 1: Use `::before` with a Check for Content in JavaScript

You can manage the placeholder text by using JavaScript to check whether the `contenteditable` element is empty and, if so, show the placeholder text using the `::before` pseudo-element.

#### HTML:
```html
<div contenteditable="true" id="phone-number"></div>
```

#### CSS:
```css
#phone-number {
  position: relative;
  min-height: 20px; /* Adjust based on your design */
}

#phone-number:empty::before {
  content: "###-####-####";
  color: rgb(172, 172, 172);
  position: absolute;
  top: 0;
  left: 10px;
  pointer-events: none; /* Ensure the placeholder text doesn't interfere with user input */
}
```

#### JavaScript:
```javascript
const phoneNumberDiv = document.getElementById('phone-number');

// Check if the div is empty and add/remove the placeholder
phoneNumberDiv.addEventListener('input', () => {
  if (phoneNumberDiv.textContent.trim() === "") {
    phoneNumberDiv.setAttribute('data-placeholder', '###-####-####');
  } else {
    phoneNumberDiv.removeAttribute('data-placeholder');
  }
});

// Trigger on initial load to handle the empty state
if (phoneNumberDiv.textContent.trim() === "") {
  phoneNumberDiv.setAttribute('data-placeholder', '###-####-####');
}
```

In this example, the `input` event is used to detect changes inside the `contenteditable` div. When the user deletes the content, the placeholder text will be restored. The JavaScript checks if the div is empty and ensures the placeholder text appears or disappears based on the content.

---

### Solution 2: Use `::before` with a Placeholder Class

Instead of relying on `:empty`, you can toggle a class based on the content inside the `div` to display the placeholder text.

#### HTML:
```html
<div contenteditable="true" id="phone-number"></div>
```

#### CSS:
```css
#phone-number {
  position: relative;
  min-height: 20px; /* Adjust based on your design */
}

#phone-number.placeholder::before {
  content: "###-####-####";
  color: rgb(172, 172, 172);
  position: absolute;
  top: 0;
  left: 10px;
  pointer-events: none;
}
```

#### JavaScript:
```javascript
const phoneNumberDiv = document.getElementById('phone-number');

// Add a class if the div is empty, remove it if there's content
phoneNumberDiv.addEventListener('input', () => {
  if (phoneNumberDiv.textContent.trim() === "") {
    phoneNumberDiv.classList.add('placeholder');
  } else {
    phoneNumberDiv.classList.remove('placeholder');
  }
});

// Trigger on initial load to handle the empty state
if (phoneNumberDiv.textContent.trim() === "") {
  phoneNumberDiv.classList.add('placeholder');
}
```

In this solution, the `placeholder` class is added to the `div` when it's empty and removed when there's content. The `::before` pseudo-element is used to display the placeholder text.

---

### Key Differences:
- **Solution 1**: Uses the `:empty` pseudo-class in combination with the `::before` pseudo-element, but the state must be managed via JavaScript to reflect the actual content of the `div`.
- **Solution 2**: Toggling a class (`placeholder`) allows you to control the placeholder visibility using CSS, and it avoids the limitations of `:empty`.

### Why `:empty` Doesn't Work Here:
The `:empty` pseudo-class only applies when there are no child nodes (text, elements, etc.) in the container. Since `contenteditable` divs can contain whitespace or other invisible nodes like line breaks, the `:empty` selector is not reliable in this case. That's why JavaScript is required to check whether the div has meaningful content.

---

### Conclusion:
Using **JavaScript** to check whether the `contenteditable` div is empty or not, and then showing or hiding the placeholder using the `::before` pseudo-element or adding/removing a class, is the most effective way to handle placeholders in `contenteditable` elements.

Let me know if you need further clarification or help with implementation!