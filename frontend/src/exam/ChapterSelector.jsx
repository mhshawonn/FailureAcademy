import examData from '../assets/data/ExamData';

const ChapterSelector = ({ category, subject, setChapter }) => {
  const chapters = Object.keys(examData?.[category]?.[subject] || {});
  return (
    <select onChange={(e) => setChapter(e.target.value)} className="border px-3 py-2 my-2">
      <option value="">Select Chapter</option>
      {chapters.map((ch) => (
        <option key={ch} value={ch}>{ch}</option>
      ))}
    </select>
  );
};
export default ChapterSelector;
