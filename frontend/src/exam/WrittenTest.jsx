import React, { useState } from 'react';

const WrittenTest = ({ data }) => {
  const [answers, setAnswers] = useState({});
  const [saved, setSaved] = useState(false);

  const handleChange = (id, value) => {
    setAnswers({ ...answers, [id]: value });
  };

  const handleSubmit = () => {
    setSaved(true);
    alert("Written answers submitted successfully.");
  };

  return (
    <div>
      {data.map((q) => (
        <div key={q.id} className="mb-6">
          <p className="mb-2 font-semibold">{q.question}</p>
          <textarea
            rows={5}
            value={answers[q.id] || ''}
            onChange={(e) => handleChange(q.id, e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Type your answer..."
          />
        </div>
      ))}
      <button onClick={handleSubmit} className="px-6 py-2 bg-blue-600 text-white rounded">
        Submit Answers
      </button>
    </div>
  );
};

export default WrittenTest;
