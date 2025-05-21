import React, { useState } from 'react';
import examData from '../assets/data/ExamData';
import CategorySelector from './CategorySelector';
import SubjectSelector from './SubjectSelector';
import ChapterSelector from './ChapterSelector';
import MCQTest from './MCQTest';
import WrittenTest from './WrittenTest';

const Exam = () => {
  const [category, setCategory] = useState('');
  const [subject, setSubject] = useState('');
  const [chapter, setChapter] = useState('');
  const [mode, setMode] = useState('mcq'); // 'mcq' or 'written'

  const chapterData = examData?.[category]?.[subject]?.[chapter];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Exam System</h1>

      <CategorySelector setCategory={setCategory} />
      {category && <SubjectSelector category={category} setSubject={setSubject} />}
      {category && subject && <ChapterSelector category={category} subject={subject} setChapter={setChapter} />}

      {category && subject && chapter ? (
        chapterData ? (
          <>
            <div className="flex gap-4 my-4">
              <button onClick={() => setMode('mcq')} className={`px-4 py-2 ${mode === 'mcq' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>MCQ</button>
              <button onClick={() => setMode('written')} className={`px-4 py-2 ${mode === 'written' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>Written</button>
            </div>

            {mode === 'mcq' ? (
              <MCQTest data={chapterData.mcq} />
            ) : (
              <WrittenTest data={chapterData.written} />
            )}
          </>
        ) : (
          <p className="text-red-500">No data found for selected chapter.</p>
        )
      ) : (
        <p className="text-red-500">Please select a valid category, subject, and chapter.</p>
      )}
    </div>
  );
};

export default Exam;
