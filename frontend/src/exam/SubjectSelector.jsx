import examData from '../assets/data/ExamData';

const SubjectSelector = ({ category, setSubject }) => {
  const subjects = Object.keys(examData[category] || {});
  return (
    <select onChange={(e) => setSubject(e.target.value)} className="border px-3 py-2 my-2">
      <option value="">Select Subject</option>
      {subjects.map((subj) => (
        <option key={subj} value={subj}>{subj}</option>
      ))}
    </select>
  );
};
export default SubjectSelector;
