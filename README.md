# HyperGro Forms : Description and Set-up

HyperGro Forms is a dynamic form builder built with React Remix, Tailwind CSS, and TypeScript. It allows users to visually create, configure, preview, and share multi-step forms with real-time validation.

## Quick Links

-  **Live Link**: [https://hyper-gro-form-builder.vercel.app/](https://hyper-gro-form-builder.vercel.app/)
-  **Video Tutorial**: [Watch Demo](https://www.youtube.com/watch?v=your-video-id)
-  **Documentation**: [Detailed Guide](https://github.com/Raj-Gurjar/HyperGro-Form-Builder/blob/88aac45a46d6d9b606547fdfd401b5f97a681ef8/README.md)

### Application Features

The application is a form builder with the following capabilities:

- Form creation and editing through a drag-and-drop interface
- Form preview functionality
- Form sharing capabilities
- Field configuration and settings
- Responsive design using Tailwind CSS
- Type-safe development with TypeScript

## Core Features

- **Drag-and-drop form builder** with reorder support
- **Field types**:
  - Text
  - Textarea
  - Dropdown
  - Checkbox
  - Date
- **Editable field settings for each field type**:

  - Label
  - Placeholder
  - Required toggle
  - Help text
  - Validation (Min/Max length, Pattern matching)
  - and other according to form feild type

- **Real-time preview** with validation feedback:
  - Required fields
  - Pattern (e.g., email, phone)
  - Min/Max input constraints
- **Responsive view modes**:
  - Desktop
  - Tablet
  - Mobile
- **Template support**:
  - Load/save templates from localStorage
- **Shareable form link**:
  - Unique Form ID generation
  - Public "form filler" view for submissions
- **Dark/Light mode** toggle

## Technologies Used

This project is built using the following key technologies and libraries:

- **Remix:** A full-stack web framework that lets you focus on the user interface and sprinkles in web fundamentals.
- **React:** A JavaScript library for building user interfaces.
- **Tailwind CSS:** A utility-first CSS framework for rapidly building custom designs.
- **@dnd-kit:** A lightweight, performant, accessible and modular drag and drop library for React.
- **TypeScript:** A typed superset of JavaScript that compiles to plain JavaScript.

(Other dependencies from `package.json` are used for development and build processes.)

## Installation and Setup

To get this project running on your local machine, follow these steps:

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/Raj-Gurjar/HyperGro-Form-Builder.git
    cd <project_directory>
    ```

2.  **Install dependencies:**

    Use npm to install the necessary packages:

    ```bash
    npm install
    ```

## Running Locally

Once the dependencies are installed, you can run the project in development mode:

```bash
npm run dev
```

This will start the development server, and you can view the application at `http://localhost:5173/` (or the address shown in your terminal).

The `npm run dev` command uses Vite to run the Remix development server, enabling features like hot module replacement.

## Building for Production

To build the application for production, use the following command:

```bash
npm run build
```

This will generate the production-ready files in the `build` directory.

## Running in Production Mode

After building, you can run the compiled application using:

```bash
npm start
```

This command uses `remix-serve` to serve the production build.

## Project Structure

The project follows a typical Remix application architecture with clear separation of concerns. Here's a detailed breakdown of the `app` directory:

### App Root Files

- `root.tsx`: The main application component that wraps the entire app
- `entry.client.tsx`: Client-side entry point for the application
- `entry.server.tsx`: Server-side entry point for the application
- `tailwind.css`: Global styles using Tailwind CSS

### Components Directory (`app/components/`)

- `Header.tsx`: The main navigation header component
- `FormToolbox.tsx`: Contains the form building tools and available form elements
- `FormCanvas.tsx`: The main area where forms are built and edited
- `FieldSettings.tsx`: Settings panel for configuring form field properties
- `SharedFormView.tsx`: Component for viewing shared forms

### Routes Directory (`app/routes/`)

- `_index.tsx`: The home page route
- `builder.tsx`: The form builder page
- `my-forms.tsx`: Page showing user's created forms
- `forms.$formId.tsx`: Dynamic route for viewing a specific form
- `preview.$formId.tsx`: Dynamic route for previewing a specific form

### Types Directory (`app/types/`)

- `form.ts`: TypeScript type definitions for form-related data structures

### Main Root Files

- `app/`: Contains the core application code, including routes, components, and entry points.
- `public/`: Static assets.
- `build/`: Production build output.
- `node_modules/`: Project dependencies.
- `package.json`: Lists dependencies and scripts.
- `tailwind.config.ts`, `postcss.config.js`: Tailwind CSS configuration.
- `vite.config.ts`: Vite build tool configuration.

#### This structure ensures:

- Clear separation of concerns between components, routes, and types
- Component-based architecture for reusability
- Route-based organization for different pages
- Type definitions for better TypeScript support
- Maintainable and scalable codebase
