# Tailwind CSS v3 + Create React App Setup Guide

This guide ensures a smooth setup of Tailwind CSS v3 with Create React App (CRA), avoiding common version conflicts and errors.

---

## 1. Create Your React App (TypeScript or JS)

```sh
npx create-react-app my-app --template typescript
cd my-app
```

---

## 2. Install Tailwind CSS v3 and Dependencies

```sh
npm install tailwindcss@3.4.17 postcss autoprefixer
```

---

## 3. Initialize Tailwind Config

```sh
npx tailwindcss init
```

---

## 4. Configure `tailwind.config.js`

```js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

---

## 5. Configure `postcss.config.js`

```js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

---

## 6. Add Tailwind to Your CSS

In `src/index.css` (or `App.css`), add at the top:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

## 7. Use Tailwind Classes in Your Components

Use Tailwind utility classes in your `className` props as usual:

```jsx
<div className="bg-blue-500 text-white p-4 rounded-lg">Hello Tailwind!</div>
```

---

## 8. Start the App

```sh
npm start
```

---

## 9. Troubleshooting

- **Do NOT use Tailwind v4+ with CRA/react-scripts.** It is not supported and will cause build errors.
- If you see errors about `@tailwindcss/postcss` or plugin issues, uninstall all Tailwind and PostCSS packages, then reinstall only v3 as above.
- If you ever upgrade to Vite/Next.js, you can use Tailwind v4+.
- If you see unstyled HTML, check that your `postcss.config.js` and `tailwind.config.js` match the above.

---

## 10. Clean Reinstall (if you hit errors)

```sh
rm -rf node_modules package-lock.json
npm install
```

---

## 11. Example Project Structure

```
my-app/
├── src/
│   ├── App.tsx
│   ├── index.tsx
│   └── index.css  # Tailwind imports here
├── tailwind.config.js
├── postcss.config.js
├── package.json
└── ...
```

---

**Reference:**
- [Tailwind CSS v3 Docs](https://v3.tailwindcss.com/docs/guides/create-react-app)
- [Create React App Docs](https://create-react-app.dev/) 