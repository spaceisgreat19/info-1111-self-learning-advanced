import { useState, FormEvent } from "react";
import { useRouter } from "next/router";
import Header from "../components/Header";

const Maintenance = () => {
  const [message, setMessage] = useState<string>("");
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const apartment = formData.get("apartment") as string;
    const issue = formData.get("issue") as string;
    const date = formData.get("date") as string;
    const priority = formData.get("priority") as string;

    if (!apartment || !issue || !date || !priority) {
      setMessage("All fields are required.");
      return;
    }

    try {
      const response = await fetch("/api/log-maintenance", {
        method: "POST",
        body: JSON.stringify({ apartment, issue, date, priority }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Maintenance request submitted successfully!");
        setTimeout(() => {
          router.push("/thank-you");
        }, 2000);
      } else {
        setMessage(data.message || "Something went wrong, please try again.");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
      console.error("Error submitting maintenance request:", error);
    }
  };

  return (
    <div>
      <Header />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          minHeight: "100vh",
          padding: "30px 20px",
          backgroundColor: "#f8f9fa",
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            padding: "30px",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            width: "100%",
            maxWidth: "500px",
            marginTop: "50px",
          }}
        >
          <h1
            style={{
              fontSize: "2rem",
              fontWeight: "bold",
              textAlign: "center",
              marginBottom: "20px",
            }}
          >
            Maintenance Request
          </h1>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "15px" }}>
              <label style={{ fontSize: "1rem", fontWeight: "600", display: "block", marginBottom: "5px" }}>
                Apartment
              </label>
              <input
                type="text"
                name="apartment"
                required
                style={{
                  width: "100%",
                  padding: "10px",
                  fontSize: "1rem",
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                }}
              />
            </div>
            <div style={{ marginBottom: "15px" }}>
              <label style={{ fontSize: "1rem", fontWeight: "600", display: "block", marginBottom: "5px" }}>
                Issue
              </label>
              <input
                type="text"
                name="issue"
                required
                style={{
                  width: "100%",
                  padding: "10px",
                  fontSize: "1rem",
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                }}
              />
            </div>
            <div style={{ marginBottom: "15px" }}>
              <label style={{ fontSize: "1rem", fontWeight: "600", display: "block", marginBottom: "5px" }}>
                Date
              </label>
              <input
                type="date"
                name="date"
                required
                style={{
                  width: "100%",
                  padding: "10px",
                  fontSize: "1rem",
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                }}
              />
            </div>
            <div style={{ marginBottom: "15px" }}>
              <label style={{ fontSize: "1rem", fontWeight: "600", display: "block", marginBottom: "5px" }}>
                Priority
              </label>
              <select
                name="priority"
                required
                defaultValue="medium"
                style={{
                  width: "100%",
                  padding: "10px",
                  fontSize: "1rem",
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                }}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <button
              type="submit"
              style={{
                width: "100%",
                padding: "12px",
                backgroundColor: "#0070f3",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                fontSize: "1rem",
                cursor: "pointer",
              }}
            >
              Submit
            </button>
          </form>
          {message && (
            <p
              style={{
                marginTop: "15px",
                textAlign: "center",
                color: "#4caf50",
                fontWeight: "500",
              }}
            >
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Maintenance;