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

    if (!apartment || !issue) {
      setMessage("Both apartment and issue are required.");
      return;
    }

    try {
      const response = await fetch("/api/log-maintenance", {
        method: "POST",
        body: JSON.stringify({ apartment, issue }),
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
          alignItems: "flex-start",  // Keep content at the top of the page
          minHeight: "100vh",
          padding: "30px 20px",  // Add some padding around the container
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
            marginTop: "50px",  // Push the form a bit higher
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
              <label
                style={{
                  fontSize: "1rem",
                  fontWeight: "600",
                  display: "block",
                  marginBottom: "5px",
                }}
              >
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
              <label
                style={{
                  fontSize: "1rem",
                  fontWeight: "600",
                  display: "block",
                  marginBottom: "5px",
                }}
              >
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