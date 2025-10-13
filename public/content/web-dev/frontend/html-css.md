---
title: 'HTML & CSS Fundamentals'
description: 'Comprehensive guide to HTML structure and CSS styling with practical examples'
pubDate: 2024-03-15
category: 'Web Development'
author: 'Dev Elevate Team'
tags: ['html', 'css', 'frontend', 'webdesign']
---

# HTML & CSS Fundamentals

HTML (HyperText Markup Language) defines the **structure** of a webpage, while CSS (Cascading Style Sheets) controls its **appearance**. Together, they form the foundation of web development.

## HTML Fundamentals

### 1. Basic Document Structure

```html
<!-- Declares the document type as HTML5 -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <!-- Character encoding -->
    <meta charset="UTF-8" />
    <!-- Responsive viewport -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <!-- Browser tab title -->
    <title>My First Page</title>
  </head>
  <body>
    <!-- Heading -->
    <h1>Hello, World!</h1>
    <p>This is my first web page.</p>
  </body>
</html>
```

### 2. Essential HTML Tags

```html
<h1>Main Heading</h1>
<h2>Sub Heading</h2>
<p>
  This is a paragraph with <strong>bold text</strong> and <em>italic text</em>.
</p>
<p>
  Here's some <code>inline code</code> and a
  <a href="https://example.com">link</a>.
</p>

<ul>
  <li>Unordered list item 1</li>
  <li>Unordered list item 2</li>
</ul>

<ol>
  <li>Ordered list item 1</li>
  <li>Ordered list item 2</li>
</ol>
```

## Common Page Structure Example

```html
<header>
  <nav>
    <ul>
      <li><a href="#home">Home</a></li>
      <li><a href="#about">About</a></li>
      <li><a href="#contact">Contact</a></li>
    </ul>
  </nav>
</header>

<main>
  <article>
    <header>
      <h1>Article Title</h1>
      <time datetime="2024-03-15">March 15, 2024</time>
    </header>
    <section>
      <p>Article content goes here...</p>
    </section>
  </article>
</main>

<aside>
  <h2>Sidebar</h2>
  <p>Related information...</p>
</aside>

<footer>
  <p>&copy; 2024 My Website</p>
</footer>
```

### 3. HTML Forms

```html
<form action="/submit" method="POST">
  <fieldset>
    <legend>Personal Information</legend>

    <div>
      <label for="name">Full Name:</label>
      <input type="text" id="name" name="name" required />
    </div>

    <div>
      <label for="email">Email:</label>
      <input type="email" id="email" name="email" required />
    </div>

    <div>
      <label for="age">Age:</label>
      <input type="number" id="age" name="age" min="18" max="100" />
    </div>

    <div>
      <label for="country">Country:</label>
      <select id="country" name="country">
        <option value="">Select a country</option>
        <option value="us">United States</option>
        <option value="uk">United Kingdom</option>
        <option value="ca">Canada</option>
      </select>
    </div>

    <div>
      <fieldset>
        <legend>Gender:</legend>
        <input type="radio" id="male" name="gender" value="male" />
        <label for="male">Male</label>
        <input type="radio" id="female" name="gender" value="female" />
        <label for="female">Female</label>
      </fieldset>
    </div>

    <div>
      <label>
        <input type="checkbox" name="newsletter" value="yes" />
        Subscribe to newsletter
      </label>
    </div>

    <div>
      <label for="message">Message:</label>
      <textarea id="message" name="message" rows="4" cols="50"></textarea>
    </div>

    <button type="submit">Submit</button>
    <button type="reset">Reset</button>
  </fieldset>
</form>
```

### 4. HTML Tables

```html
<table>
  <caption>
    Employee Information
  </caption>
  <thead>
    <tr>
      <th>ID</th>
      <th>Name</th>
      <th>Department</th>
      <th>Salary</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>001</td>
      <td>John Doe</td>
      <td>Engineering</td>
      <td>$75,000</td>
    </tr>
    <tr>
      <td>002</td>
      <td>Jane Smith</td>
      <td>Marketing</td>
      <td>$65,000</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <td colspan="3">Total:</td>
      <td>$140,000</td>
    </tr>
  </tfoot>
</table>
```

## CSS Fundamentals

### 1. CSS Selectors

```css
/* Element selector */
h1 {
  color: blue;
}
/* Class selector */
.highlight {
  background-color: yellow;
}
/* ID selector */
#main-content {
  font-size: 16px;
}
/* Universal selector for resets */
* {
  margin: 0;
  padding: 0;
}
```

```css
/* Descendant selector */
div p {
  color: red;
}
/* Child selector */
div > p {
  font-weight: bold;
}
/* Adjacent sibling selector */
h1 + p {
  margin-top: 10px;
}
/* Attribute selector */
input[type='text'] {
  border: 1px solid #ccc;
}
/* Pseudo-class selector */
a:hover {
  color: green;
  text-decoration: underline;
}
/* Pseudo-element selector */
p::first-line {
  font-weight: bold;
}
```

### 2. CSS Specificity and Priority

```css
/* Inline styles - highest specificity */
/* Example: <div style="color: purple;"></div> */

/* ID selector */
#main {
  color: green;
}

/* Class selector */
.container {
  color: blue;
}
.container.highlight {
  color: red;
}

/* Element selector */
div {
  color: black;
}
```

_Specificity: inline > ID > class/attribute > element_

### 3. CSS Box Model

```css
.box {
  width: 200px;
  height: 100px;
  padding: 20px;
  border: 5px solid black;
  margin: 30px;
  box-sizing: border-box; /* includes border and padding within width/height */
}

.visual-box {
  width: 200px;
  height: 100px;
  padding: 20px;
  border: 5px solid #333;
  margin: 30px;
  background-color: #f0f0f0;
}
```

### 4. CSS Layout

```css
/* Flexbox */
.flex-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 20px;
}

.flex-item {
  flex: 1;
  flex-basis: 200px;
  flex-shrink: 0;
}
```

```css
/* CSS Grid */
.grid-container {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  grid-template-rows: auto 1fr auto;
  gap: 20px;
  height: 100vh;
}

.grid-item {
  grid-column: 1 / 3;
  grid-row: 1;
}

.layout {
  display: grid;
  grid-template-areas:
    'header header header'
    'sidebar main aside'
    'footer footer footer';
  grid-template-columns: 200px 1fr 200px;
  grid-template-rows: auto 1fr auto;
}

.header {
  grid-area: header;
}
.sidebar {
  grid-area: sidebar;
}
.main {
  grid-area: main;
}
.aside {
  grid-area: aside;
}
.footer {
  grid-area: footer;
}
```

### 5. CSS Styling Examples

```css
body {
  font-family: 'Arial', sans-serif;
  font-size: 16px;
  line-height: 1.6;
  color: #333;
}

h1 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

p {
  margin-bottom: 1rem;
  text-align: justify;
}
```

```css
.colorful-div {
  background-color: #3498db;
  background-image: linear-gradient(45deg, #3498db, #2ecc71);
  background-size: 200% 200%;
  background-repeat: no-repeat;
  color: white;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}
```

```css
/* Responsive container: mobile first */
.container {
  width: 100%;
  padding: 10px;
}

@media (min-width: 768px) {
  .container {
    max-width: 750px;
    margin: 0 auto;
    padding: 20px;
  }
}

@media (min-width: 1024px) {
  .container {
    max-width: 1200px;
    padding: 30px;
  }
}
```

## Best Practices

### HTML Best Practices

- Use semantic HTML elements (e.g., `<header>`, `<nav>`, `<main>`)
- Add descriptive alt text for images
- Maintain proper heading order (h1, h2, etc.)
- Validate your HTML
- Make forms accessible (correct labels/fieldsets)
- Use meaningful class and ID names

### CSS Best Practices

- Use a CSS reset or normalize
- Follow a naming methodology (like BEM)
- Adopt CSS variables for consistency
- Minimize CSS for performance
- Use mobile-first responsive design
- Keep specificity simple and maintainable

```css
:root {
  --primary-color: #3498db;
  --secondary-color: #2ecc71;
  --font-size-base: 16px;
  --spacing-unit: 8px;
}

.button {
  background-color: var(--primary-color);
  font-size: var(--font-size-base);
  padding: calc(var(--spacing-unit) * 2);
}
```

## Common Use Cases

- **Landing Pages**: Hero sections, call-to-actions
- **Forms**: Registration, contact, surveys
- **Navigation**: Menus, breadcrumbs, pagination
- **Data Display**: Tables, cards, lists
- **Media**: Image galleries, video

## Performance Tips

- Minify CSS and HTML for faster loads
- Use CSS sprites for icons
- Optimize image assets
- Leverage CSS preprocessors (Sass/Less)
- Implement critical CSS (load key styles first)
- Use frameworks (Bootstrap, Tailwind) for rapid UI

## Tools and Resources

- **Validation**: W3C HTML/CSS Validator
- **Frameworks**: Bootstrap, Tailwind CSS, Bulma
- **Preprocessors**: Sass, Less, PostCSS
- **Build Tools**: Webpack, Parcel, Vite
- **Browser DevTools**: Chrome DevTools, Firefox Developer Tools
