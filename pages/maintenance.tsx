import { useState, FormEvent } from "react";
import { useRouter } from "next/router";
import Header from '../components/Header';

const Maintenance = () => {
  const [message, setMessage] = useState<string>("");
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Extract form data safely with correct types
    const formData = new FormData(event.target as HTMLFormElement); 
    const apartment = formData.get("apartment") as string;
    const issue = formData.get("issue") as string;

    // Validate if the values are not empty
    if (!apartment || !issue) {
      setMessage("Both apartment and issue are required.");
      return;
    }

    try {
      const response = await fetch("/api/log-maintenance", {
        method: "POST",
        body: JSON.stringify({
          apartment,
          issue,
        }),
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
      <h1>Maintenance Request</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Apartment:
          <input type="text" name="apartment" required />
        </label>
        <br />
        <label>
          Issue:
          <input type="text" name="issue" required />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Maintenance;