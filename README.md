# Launch Countdown

This is a simple countdown timer web app built using Flask, Tailwind CSS, and JavaScript (ES6). The application allows users to set a countdown time.

## Project Directory Structure

```
launch-countdown/
├── app.py
├── templates/
│   ├── index.html
│   └── countdown.html
├── static/
│   ├── css/
│   │   ├── styles.css
│   │   └── output.css
│   ├── js/
│   │   └── countdown.js
├── tailwind.config.js
├── package.json
├── package-lock.json
├── .gitignore
└── requirements.txt
```

## Prerequisites

- Python 3.x
- Node.js and npm
- Virtual environment support (optional but recommended)

## Setup Instructions

### Clone the Repository

```bash
git clone <repository-url>
cd launch-countdown
```

### Set Up a Virtual Environment (Optional but Recommended)

```bash
python3 -m venv venv
source venv/bin/activate  # For Unix-based systems
```

### Install Python Dependencies

```bash
pip install -r requirements.txt
```

### Install Tailwind CSS

Make sure you have Node.js and npm installed.

```bash
# Initialize the project
npm init -y

# Install Tailwind CSS and related dependencies
npm install -D tailwindcss postcss autoprefixer

# Initialize Tailwind CSS configuration
npx tailwindcss init
```

### Configure Tailwind

Edit `tailwind.config.js` to include the content paths for Tailwind to scan:

```js
module.exports = {
  content: ["./templates/**/*.html"],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

### Compile Tailwind CSS

Compile Tailwind's CSS from `styles.css` to `output.css`:

```bash
npx tailwindcss -i ./static/css/styles.css -o ./static/css/output.css --watch
```

This command will compile your Tailwind CSS classes and continuously watch for changes.

### Run the Flask Application

To run the application, execute the following command:

```bash
python app.py
```

You can then visit `http://localhost:5000` in your browser to interact with the web application.
