import { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const ExamComponent = ({ exam }) => {
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);

  const handleSelect = (questionId, optionIndex) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleSubmit = () => {
    if (Object.keys(answers).length !== exam.questions.length) {
      toast.error('Answer every question to get your score.');
      return;
    }

    const correctCount = exam.questions.reduce((acc, question) => {
      const answer = answers[question.id];
      return acc + (answer === question.correctOptionIndex ? 1 : 0);
    }, 0);

    setScore({
      correct: correctCount,
      total: exam.questions.length,
      percentage: Math.round((correctCount / exam.questions.length) * 100),
    });
    toast.success('Exam evaluated locally!');
  };

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-white/10 bg-midnight-soft/75 p-6">
        <h2 className="text-2xl font-semibold text-white">{exam.title}</h2>
        <p className="mt-2 text-sm text-white/70">{exam.description}</p>
      </div>

      <div className="space-y-6">
        {exam.questions.map((question, index) => (
          <motion.div
            key={question.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="rounded-3xl border border-white/10 bg-midnight-soft/65 p-6"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-primary/70">Question {index + 1}</p>
                <p className="mt-2 text-lg font-semibold text-white">{question.prompt}</p>
              </div>
              {answers[question.id] !== undefined && (
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                  Chosen
                </span>
              )}
            </div>
            <div className="mt-6 grid gap-3">
              {question.options.map((option, optionIndex) => {
                const isSelected = answers[question.id] === optionIndex;
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => handleSelect(question.id, optionIndex)}
                    className={`flex items-center justify-between rounded-2xl border px-4 py-3 text-left text-sm transition ${
                      isSelected
                        ? 'border-primary bg-primary/20 text-white'
                        : 'border-white/10 bg-white/5 text-white/80 hover:border-primary/40 hover:bg-primary/10'
                    }`}
                  >
                    <span className="pr-6">{option}</span>
                    <span className="rounded-full bg-white/5 px-3 py-1 text-xs font-semibold">
                      {String.fromCharCode(65 + optionIndex)}
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-midnight-soft/85 p-6 sm:flex-row sm:items-center sm:justify-between">
        {score ? (
          <div>
            <p className="text-sm uppercase tracking-widest text-white/60">Your Local Score</p>
            <p className="text-3xl font-semibold text-white">
              {score.correct} / {score.total} <span className="text-base text-white/60">({score.percentage}%)</span>
            </p>
          </div>
        ) : (
          <p className="text-sm text-white/70">Responses stay on your device. Share your insights with mentors!</p>
        )}
        <button
          type="button"
          onClick={handleSubmit}
          className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-base font-semibold text-slate-900 transition hover:bg-primary-light"
        >
          Submit Answers
        </button>
      </div>
    </div>
  );
};

export default ExamComponent;
