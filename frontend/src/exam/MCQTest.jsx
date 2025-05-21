import React, { useState } from 'react';

const MCQTest = ({ data }) => {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (qId, option) => {
    setAnswers({ ...answers, [qId]: option });
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  return (
    <div>
      {data.map((q) => (
        <div key={q.id} className="mb-6 p-4 border rounded shadow">
          <p className="font-semibold mb-2">{q.question}</p>
          {q.options.map((opt, i) => (
            <label key={i} className="block">
              <input
                type="radio"
                name={`q-${q.id}`}
                value={opt}
                checked={answers[q.id] === opt}
                onChange={() => handleSelect(q.id, opt)}
                className="mr-2"
              />
              {opt}
            </label>
          ))}
          {submitted && (
            <p className="mt-2 text-sm">
              Correct Answer:{' '}
              <span className={answers[q.id] === q.answer ? 'text-green-600' : 'text-red-600'}>
                {q.answer}
              </span>
            </p>
          )}
        </div>
      ))}
      {!submitted && (
        <button onClick={handleSubmit} className="px-6 py-2 bg-blue-600 text-white rounded">
          Submit
        </button>
      )}
    </div>
  );
};

export default MCQTest;
