<<<<<<< HEAD
# Todo Application

Given an `app.js` file and database file `todoApplication.db` with a table `todo`.

Write APIs to perform operations on the table `todo`, with the following columns,

**Todo Table**

| Column   | Type    |
| -------- | ------- |
| id       | INTEGER |
| todo     | TEXT    |
| category | TEXT    |
| priority | TEXT    |
| status   | TEXT    |
| due_date | DATE    |

<MultiLineNote>
  
  - Replace the spaces in URL with `%20`.
  - Possible values for `priority` are `HIGH`, `MEDIUM`, and `LOW`.
  - Possible values for `status` are `TO DO`, `IN PROGRESS`, and `DONE`.
  - Possible values for `category` are `WORK`, `HOME`, and `LEARNING`.
  - Use the format `yyyy-MM-dd` for formating with date-fns `format` function.
    - The user may request with due date value as `2021-1-21`, format the date to `2021-01-21` and perform Create, Read, Update operations on the database.
</MultiLineNote>

<MultiLineQuickTip>

Use `date-fns` format function to format the date. Refer to the documentation [link](https://date-fns.org/v2.19.0/docs/Getting-Started) for the usage of the `format` function.
</MultiLineQuickTip>

### Invalid scenarios for all APIs

- **Invalid Status**
  - **Response**
    - **Status code**
      ```
      400
      ```
    - **Body**
      ```
      Invalid Todo Status
      ```
- **Invalid Priority**
  - **Response**
    - **Status code**
      ```
      400
      ```
    - **Body**
      ```
      Invalid Todo Priority
      ```
- **Invalid Category**

  - **Response**
    - **Status code**
      ```
      400
      ```
    - **Body**
      ```
      Invalid Todo Category
      ```

- **Invalid Due Date**
  - **Response**
    - **Status code**
      ```
      400
      ```
    - **Body**
      ```
      Invalid Due Date
      ```

### API 1

#### Path: `/todos/`

#### Method: `GET`

- **Scenario 1**

  - **Sample API**
    ```
    /todos/?status=TO%20DO
    ```
  - **Description**:

    Returns a list of all todos whose status is 'TO DO'

  - **Response**

    ```
    [
      {
        "id": 2,
        "todo": "Buy a Car",
        "priority": "MEDIUM",
        "status": "TO DO",
        "category": "HOME",
        "dueDate": "2021-09-22"
      },
      ...
    ]
    ```

- **Scenario 2**

  - **Sample API**
    ```
    /todos/?priority=HIGH
    ```
  - **Description**:

    Returns a list of all todos whose priority is 'HIGH'

  - **Response**

    ```
    [
      {
        "id": 1,
        "todo": "Learn Node JS",
        "priority": "HIGH",
        "status": "IN PROGRESS",
        "category": "LEARNING",
        "dueDate": "2021-03-16"
      },
      ...
    ]
    ```

- **Scenario 3**

  - **Sample API**
    ```
    /todos/?priority=HIGH&status=IN%20PROGRESS
    ```
  - **Description**:

    Returns a list of all todos whose priority is 'HIGH' and status is 'IN PROGRESS'

  - **Response**

    ```
    [
      {
        "id": 1,
        "todo": "Learn Node JS",
        "priority": "HIGH",
        "status": "IN PROGRESS",
        "category": "LEARNING",
        "dueDate": "2021-03-16"
      },
      ...
    ]
    ```

- **Scenario 4**

  - **Sample API**
    ```
    /todos/?search_q=Buy
    ```
  - **Description**:

    Returns a list of all todos whose todo contains 'Buy' text

  - **Response**

    ```
    [
      {
        "id": 2,
        "todo": "Buy a Car",
        "priority": "MEDIUM",
        "status": "TO DO",
        "category": "HOME",
        "dueDate": "2021-09-22"
      },
      ...
    ]
    ```

- **Scenario 5**

  - **Sample API**
    ```
    /todos/?category=WORK&status=DONE
    ```
  - **Description**:

    Returns a list of all todos whose category is 'WORK' and status is 'DONE'

  - **Response**

    ```
    [
      {
        "id": 4,
        "todo": "Fix the bug",
        "priority": "MEDIUM",
        "status": "DONE",
        "category": "WORK",
        "dueDate": "2021-01-25"
      },
      ...
    ]
    ```

- **Scenario 6**

  - **Sample API**
    ```
    /todos/?category=HOME
    ```
  - **Description**:

    Returns a list of all todos whose category is 'HOME'

  - **Response**

    ```
    [
      {
        "id": 2,
        "todo": "Buy a Car",
        "priority": "MEDIUM",
        "status": "TO DO",
        "category": "HOME",
        "dueDate": "2021-09-22"
      },
      ...
    ]
    ```

- **Scenario 7**

  - **Sample API**
    ```
    /todos/?category=LEARNING&priority=HIGH
    ```
  - **Description**:

    Returns a list of all todos whose category is 'LEARNING' and priority is 'HIGH'

  - **Response**

    ```
    [
      {
        "id": 1,
        "todo": "Learn Node JS",
        "priority": "HIGH",
        "status": "IN PROGRESS",
        "category": "LEARNING",
        "dueDate": "2021-03-16"
      },
      ...
    ]
    ```

### API 2

#### Path: `/todos/:todoId/`

#### Method: `GET`

#### Description:

Returns a specific todo based on the todo ID

#### Response

```
{
  "id": 1,
  "todo": "Learn Node JS",
  "priority": "HIGH",
  "status": "IN PROGRESS",
  "category": "LEARNING",
  "dueDate": "2021-03-16"
}
```

### API 3

#### Path: `/agenda/`

#### Method: `GET`

#### Description:

Returns a list of all todos with a specific due date in the query parameter `/agenda/?date=2021-12-12`

#### Response

```
[
  {
    "id": 3,
    "todo": "Clean the garden",
    "priority": "LOW",
    "status": "TO DO",
    "category": "HOME",
    "dueDate": "2021-12-12"
  },
  ...
]
```

### API 4

#### Path: `/todos/`

#### Method: `POST`

#### Description:

Create a todo in the todo table,

#### Request

```
{
  "id": 6,
  "todo": "Finalize event theme",
  "priority": "LOW",
  "status": "TO DO",
  "category": "HOME",
  "dueDate": "2021-02-22"
}
```

#### Response

```
Todo Successfully Added
```

### API 5

#### Path: `/todos/:todoId/`

#### Method: `PUT`

#### Description:

Updates the details of a specific todo based on the todo ID

- **Scenario 1**

  - **Request**
    ```
    {
      "status": "DONE"
    }
    ```
  - **Response**

    ```
    Status Updated
    ```

- **Scenario 2**

  - **Request**
    ```
    {
      "priority": "HIGH"
    }
    ```
  - **Response**

    ```
    Priority Updated
    ```

- **Scenario 3**

  - **Request**

    ```
    {
      "todo": "Clean the garden"
    }
    ```

  - **Response**

    ```
    Todo Updated
    ```

- **Scenario 4**

  - **Request**
    ```
    {
      "category": "LEARNING"
    }
    ```
  - **Response**

    ```
    Category Updated
    ```

- **Scenario 5**

  - **Request**
    ```
    {
      "dueDate": "2021-01-12"
    }
    ```
  - **Response**

    ```
    Due Date Updated
    ```

### API 6

#### Path: `/todos/:todoId/`

#### Method: `DELETE`

#### Description:

Deletes a todo from the todo table based on the todo ID

#### Response

```
Todo Deleted
```

<br/>

Use `npm install` to install the packages.

**Export the express instance using the default export syntax.**

**Use Common JS module syntax.**
=======
# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
>>>>>>> d165216 (Solution)
