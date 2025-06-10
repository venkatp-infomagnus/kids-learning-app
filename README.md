# Kids Learning World

An interactive Node.js web application designed to help children learn basic educational concepts including alphabet, numbers, colors, shapes, and animals.

## Features

- **Alphabet Learning**: Interactive alphabet display with uppercase and lowercase letters, matching games, and quizzes
- **Numbers Learning**: Numbers from 1-10 with counting games and number recognition activities
- **Colors Learning**: Interactive color display, color mixing experiment, and object-color association
- **Shapes Learning**: Learn different shapes, find shapes in everyday objects, and play shape hunting games
- **Animals Learning**: Learn about animals, their sounds, habitats, and characteristics through interactive activities
- **Birds Learning**: Learn about birds, their sounds, habitats, and characteristics through interactive activities

## Technologies Used

- Node.js & Express.js
- EJS Templating Engine
- HTML, CSS, JavaScript
- Web Audio API for sound effects

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm

### Installation

1. Clone the repository or download the source code
2. Navigate to the project directory
3. Install dependencies:

```bash
npm install
```

4. Start the application:

```bash
npm start
```

5. For development with auto-reload:

```bash
npm run dev
```

6. Open your browser and go to: `http://localhost:3000`

## Project Structure

```
kids-learning-app/
├── app.js                  # Main application file
├── package.json            # Project dependencies and scripts
├── controllers/            # Controller functions
├── public/                 # Static assets
│   ├── css/                # Stylesheets
│   ├── js/                 # Client-side JavaScript
│   └── images/             # Images and icons
├── routes/                 # Route definitions
└── views/                  # EJS templates
    ├── index.ejs           # Home page
    ├── alphabet.ejs        # Alphabet learning page
    ├── numbers.ejs         # Numbers learning page
    ├── colors.ejs          # Colors learning page
    ├── shapes.ejs          # Shapes learning page
    ├── animals.ejs         # Animals learning page
    ├── birds.ejs           # Birds learning page
    └── partials/           # Reusable template parts
        └── layout.ejs      # Main layout template
```

## Future Enhancements

- Add more interactive games and activities
- Implement user accounts to track progress
- Add more educational content categories (science, geography, etc.)
- Include audio narration and pronunciation guides
- Develop mobile applications for offline learning

## License

This project is licensed under the ISC License