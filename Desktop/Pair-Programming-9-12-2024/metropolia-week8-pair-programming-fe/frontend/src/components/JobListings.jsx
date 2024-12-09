import { Link } from "react-router-dom";
// import { useContext } from 'react';
// import ThemeContext from '../context/ThemeContext';

const JobListings = ({ jobs }) => {
  // const { backgroundColor } = useContext(ThemeContext);
  const backgroundColor="#000"

  return (
    <div className="job-list" style={{ backgroundColor, }}>
      {jobs.map((job) => (

        <div className="job-preview" key={job.id}>
          <Link to={`/jobs/${job.id}`}>
            <h2>{job.title}</h2>
          </Link>
          <p>Type: {job.type}</p>
          <p>Company: {job.company.name}</p>
        </div>
      ))}
    </div>
  );
};

export default JobListings;
