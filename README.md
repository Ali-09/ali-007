# Ali-007

A modern Angular application built with standalone components and Tailwind CSS.

## 🚀 Features

- **Modern Architecture**: Built with Angular 19 and standalone components
- **Styling**: Tailwind CSS for modern, responsive design
- **Authentication**: Complete authentication system with login/logout functionality
- **Routing**: Protected routes with authentication guards
- **State Management**: Reactive state management using RxJS
- **Clean Code**: External templates and minimal HTML comments for better maintainability
- **Code Quality**: ESLint and Prettier for consistent code style

## 📋 Prerequisites

- Node.js 20.11.1 (LTS)
- npm (comes with Node.js)
- nvm (Node Version Manager)

## 🛠️ Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ali-007
```

2. Install and use the correct Node.js version using nvm:
```bash
nvm install
nvm use
```

3. Install dependencies:
```bash
npm install
```

4. Run linting and formatting checks:
```bash
# Check for linting issues
npm run lint

# Fix linting issues automatically
npm run lint:fix

# Check code formatting
npm run format:check

# Format code automatically
npm run format

# Or run all validations at once
npm run validate
```

5. Start the development server:
```bash
ng serve
```

Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## 🏗️ Project Structure

```
src/
├── app/
│   ├── core/           # Singleton services, guards, interceptors
│   ├── shared/         # Shared components, directives, pipes
│   ├── modules/        # Feature modules
│   │   ├── auth/       # Authentication module
│   │   │   └── login/  # Login component with clean HTML structure
│   │   └── home/       # Home module with external template
│   └── layouts/        # Layout components
├── assets/            # Static assets
└── styles.css         # Global styles
```

## 🔐 Authentication

The application includes a complete authentication system:

- Login form with email/password validation
- Protected routes
- Persistent authentication state
- Logout functionality
- Clean and modern UI with Tailwind CSS

## 🎨 Styling

The project uses Tailwind CSS for styling:

- Responsive design
- Modern UI components
- Customizable theme
- Utility-first approach
- Clean and maintainable HTML structure

## 🧪 Testing

Run the unit tests:
```bash
ng test
```

## 📦 Build

Build the project:
```bash
ng build
```

The build artifacts will be stored in the `dist/` directory.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors

- Your Name - Initial work

## 🙏 Acknowledgments

- Angular Team
- Tailwind CSS Team
- All contributors
