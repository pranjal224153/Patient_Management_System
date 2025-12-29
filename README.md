# Patient Management System (PMS)

A simple and efficient Patient Management System built with **Spring Boot** (Backend) and **HTML/CSS/JS** (Frontend). This project allows users to manage patient records (Create, Read, Update, Delete) with a secure login system.

## 🚀 Features
- **User Authentication**: Sign Up and Login functionality.
- **Dashboard**: View all patients in a tabular format.
- **CRUD Operations**:
    - **Add** new patients.
    - **Edit** existing patient details.
    - **Delete** patient records.
- **Responsive Design**: Modern UI built with vanilla CSS.

## 🛠️ Tech Stack
- **Backend**: Java 17, Spring Boot, Spring Data JPA, H2 Database.
- **Frontend**: HTML5, CSS3, JavaScript (Fetch API).
- **Build Tool**: Maven.

## ⚙️ Setup & Installation

### Prerequisites
- Java 17 or higher
- Maven (installed and added to PATH)

### Running Locally
1.  **Clone the repository**:
    ```bash
    git clone https://github.com/pranjal224153/Patient_Management_System.git
    cd Patient_Management_System
    ```

2.  **Run the application**:
    ```bash
    mvn spring-boot:run
    ```

3.  **Access the App**:
    Open your browser and go to: [http://localhost:8081](http://localhost:8081)

## 🔌 API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/auth/signup` | Register a new user |
| `POST` | `/auth/login` | Login user |
| `GET` | `/patients` | Get all patients |
| `POST` | `/patients` | Create a new patient |
| `PUT` | `/patients/{id}` | Update patient details |
| `DELETE` | `/patients/{id}` | Delete a patient |

## 🧪 Testing
You can test the API using **Postman** or the included **Web Interface**.

### Example JSON for Creating a Patient
```json
{
  "name": "John Doe",
  "disease": "Fever"
}
```

## 📝 License
This project is for educational purposes.
