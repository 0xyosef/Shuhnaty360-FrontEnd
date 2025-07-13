# Shuhnaty - Shipping Management System

A modern web application for managing shipping operations, built with React, TypeScript, Vite, and Tailwind CSS.

## Features

- Shipment tracking and management
- Client and driver management
- Real-time status updates
- Interactive dashboards with charts
- Responsive design for all devices
- User authentication and authorization

## Tech Stack

- ⚡ [Vite](https://vitejs.dev/) - Next Generation Frontend Tooling
- ⚛️ [React 19](https://reactjs.org/) - A JavaScript library for building user interfaces
- 🎨 [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
- 🏗️ [TypeScript](https://www.typescriptlang.org/) - TypeScript is a typed superset of JavaScript
- 📊 [Recharts](https://recharts.org/) - A composable charting library built on React components

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm or yarn

### Installation

1. Clone the repository

   ```bash
   git clone [repository-url]
   cd Shuhnaty-react
   ```

2. Install dependencies

   ```bash
   npm install
   # or
   yarn
   ```

3. Start the development server

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

## Available Scripts

- `dev` - Start the development server
- `build` - Build for production
- `preview` - Preview the production build locally
- `test` - Run tests
- `lint` - Run ESLint

## Project Structure

```
src/
├── assets/           # Static assets (images, icons, etc.)
├── components/       # Reusable UI components
├── pages/            # Page components
├── redux/            # Redux store and slices
├── utils/            # Utility functions
└── main.tsx          # Application entry point
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
tsconfigRootDir: import.meta.dirname,
},
},
})

````

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
````
