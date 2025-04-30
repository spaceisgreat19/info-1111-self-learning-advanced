import { useState, FormEvent } from "react";
import { useRouter } from "next/router";
import Header from '../components/Header'; 

const Maintenance = () => {
  const [message, setMessage] = useState<string>("");
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement); 

   
    const apartment = formData.get("apartment") as string;
    const issue = formData.get("issue") as string;

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
  };

  return (
    <div>
      <Header /> {/* Add the Header here */}
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