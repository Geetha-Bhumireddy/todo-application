
# Todo List Application

A simple Todo List application built with React that allows you to add, edit, delete, and mark tasks as complete. The tasks are saved in the local storage to persist between sessions.

## Features

- **Task Input:** Add new tasks.
- **Task List:** Display the list of tasks.
- **Complete Status:** Mark tasks as complete.
- **Edit Option:** Edit existing tasks.
- **Delete Tasks:** Remove tasks from the list.
- **Local Storage:** Save tasks to local storage.

## Getting Started

### Prerequisites

- Node.js (>= 14.x)
- npm (>= 6.x) or yarn (>= 1.x)

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/Geetha-Bhumireddy/todo_application.git
   ```

   ![Clone Repository](images/clone.png)

2. **Navigate to the Project Directory**

   ```bash
   cd todo_app
   ```

3. **Install Dependencies**

   ```bash
   npm install
   ```

   or

   ```bash
   yarn install
   ```

   ![Install Dependencies](images/install.png)

### Running the Application

1. **Start the Development Server**

   ```bash
   npm start
   ```

   or

   ```bash
   yarn start
   ```

   The application should now be running at [http://localhost:3000](http://localhost:3000).

   ![Start Application](images/start.png)

### Building the Application

To create an optimized production build:

```bash
npm run build
```

or

```bash
yarn build
```

### Running Tests

To run the tests:

```bash
npm test
```

or

```bash
yarn test
```

## Project Structure

```plaintext
├── public
│   ├── index.html
│   └── ...
├── src
│   ├── components
│   │   ├── Header.js
│   │   ├── TaskInput.js
│   │   ├── TaskList.js
│   │   └── ...
│   ├── App.js
│   ├── App.css
│   └── index.js
├── .gitignore
├── package.json
├── README.md
└── ...
```

## Components

- **Header:** Displays the application title.
- **TaskInput:** Input field to add new tasks.
- **TaskList:** Lists all tasks with options to edit, delete, and mark as complete.

## Local Storage

Tasks are saved to local storage, ensuring they persist between browser sessions.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.
