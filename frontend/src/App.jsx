import { useEffect, useState } from "react";
import axios from "axios";
import JobCard from "./components/JobCard";
import "./index.css";

function App() {

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchJobs = async () => {

      try {

        const response = await axios.get(
          "http://localhost:3000/job/match/69f73677866cc6db21eadb9e"
        );

        setJobs(response.data.matchedjobs);

      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();

  }, []);

  return (
    <div className="container">

      <h1 className="title">
        AI Job Matching System
      </h1>

      {loading ? (
        <h2>Loading...</h2>
      ) : (

        <div className="jobs-grid">

          {jobs.map(job => (
            <JobCard key={job._id} job={job} />
          ))}

        </div>
      )}

    </div>
  );
}

export default App;