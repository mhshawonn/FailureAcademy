import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import ExamComponent from '../components/ExamComponent.jsx';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import api, { parseErrorMessage } from '../services/api.js';

const ExamsPage = () => {
  const [exams, setExams] = useState([]);
  const [activeExamId, setActiveExamId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadExams = async () => {
      setIsLoading(true);
      try {
        const response = await api.get('/api/exams');
        setExams(response.data);
        if (response.data.length > 0) {
          setActiveExamId(response.data[0].id);
        }
      } catch (error) {
        toast.error(parseErrorMessage(error));
      } finally {
        setIsLoading(false);
      }
    };

    loadExams();
  }, []);

  const activeExam = exams.find((exam) => exam.id === activeExamId);

  return (
    <section className="container pt-10">
      <div className="rounded-3xl border border-white/10 bg-midnight-soft/75 p-8 shadow-xl">
        <p className="text-xs uppercase tracking-[0.3em] text-primary/70">Resilience Benchmarking</p>
        <h1 className="mt-4 text-4xl font-semibold text-white">Diagnostic exams that celebrate reflection.</h1>
        <p className="mt-4 max-w-3xl text-sm text-white/75">
          These MCQs are intentionally reflective. Submit answers locally, iterate, and bring your insights to the
          community for deeper feedback. Admins and teachers will unlock richer analytics soon.
        </p>
      </div>

      {isLoading ? (
        <LoadingSpinner label="Loading exam sets" />
      ) : exams.length === 0 ? (
        <p className="mt-10 text-center text-sm text-white/60">Demo exams will appear here soon.</p>
      ) : (
        <div className="mt-10 grid gap-6 lg:grid-cols-[0.35fr_1fr]">
          <div className="flex flex-col gap-3 rounded-3xl border border-white/10 bg-midnight-soft/60 p-6">
            {exams.map((exam) => (
              <button
                key={exam.id}
                type="button"
                onClick={() => setActiveExamId(exam.id)}
                className={`rounded-2xl px-4 py-3 text-left text-sm font-semibold transition ${
                  activeExamId === exam.id ? 'bg-primary/20 text-white' : 'bg-white/5 text-white/80 hover:bg-white/10'
                }`}
              >
                {exam.title}
              </button>
            ))}
          </div>
          <div>{activeExam && <ExamComponent exam={activeExam} />}</div>
        </div>
      )}
    </section>
  );
};

export default ExamsPage;
