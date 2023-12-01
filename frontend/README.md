# Frontend

This React based client allows users to input patient information and skin irritations in order to communciate to receive a prediciton of allergic reactions that may occur from certain medication.

This client communicates with AWS cloud functions that will communite with an AI model hosted on the server.

# Developing Tips

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in local development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

## Tailwind CSS

Tailwind CSS is a framework that allows for easier and faster CSS styling.

CSS styles can be declared in the `className` field of any React component, and uses shorthand abrevation of standard CSS styles.

If you're famiilar with CSS styling, this should result in styling components in a faster and more concise manner.

For common classes, defining traditional classes in `.css` files still works instead of inline styling

```
@layer components {
  .headerLink {
    @apply cursor-pointer text-black opacity-60
    transition hover:opacity-100;
  }
```

Define css classes under components using the `@apply` before defining the styles

### Cheatsheet for the snippets

https://nerdcave.com/tailwind-cheat-sheet
