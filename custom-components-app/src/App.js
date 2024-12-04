import "./App.css";
import TableContainer from "./components/TableContainer";
import FormExample from "./components/custom_form/FormExample";

function App() {
  // Sample data
  const data = [
    { id: 1, name: "John Doe", age: 30, email: "john@example.com" },
    { id: 2, name: "Jane Smith", age: 25, email: "jane@example.com" },
    { id: 3, name: "Bob Johnson", age: 35, email: "bob@example.com" },
    { id: 4, name: "Alice Williams", age: 28, email: "alice@example.com" },
    { id: 5, name: "Charlie Brown", age: 40, email: "charlie@example.com" },
  ];

  // Column definitions
  const columns = [
    {
      key: "id",
      header: "ID",
      filterable: false,
    },
    {
      key: "name",
      header: "Name",
      filterable: true,
    },
    {
      key: "age",
      header: "Age",
      filterable: true,
    },
    {
      key: "email",
      header: "Email",
      filterable: true,
    },
  ];

  const customStyles = {
    header: {
      fontSize: "18px", // Larger font for headers
      backgroundColor: "#2c3e50", // Dark blue background
      color: "white", // White text
    },
    body: {
      fontSize: "16px", // Slightly smaller font for body
      backgroundColor: "#ecf0f1", // Light gray background
      color: "#333333", // Dark gray text
    },
  };
  return (
    <div className="App">
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          padding: "20px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <h1>Sortable and Filterable Table</h1>
        <TableContainer columns={columns} data={data} styles={customStyles} />
      </div>
      <FormExample />
    </div>
  );
}

export default App;
