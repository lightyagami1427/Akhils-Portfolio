import React, { useState } from 'react';
import { Frame, GameLayout, PrimaryButton, Result, Troll } from './GameKit';

// What the client says, what they might mean, and which one it really is. Edit freely.
const QUESTIONS = [
  {
    quote: 'Can you make it pop?',
    options: ['Add a drop shadow. Then another one.', 'The key element needs more contrast or space.', 'Make everything neon.'],
    answer: 1,
    note: 'It usually means the hierarchy is flat. It rarely means confetti.',
  },
  {
    quote: 'Make the logo bigger.',
    options: ['I want the brand to feel more confident.', 'Make the logo bigger.', 'Make the logo bigger, but bigger.'],
    answer: 0,
    note: 'Sometimes it really does just mean bigger. Those are the long days.',
  },
  {
    quote: 'Can we try it in blue?',
    options: ['Try it in blue.', 'Try it in every blue that exists.', 'I’m not sure this feels like us yet.'],
    answer: 2,
    note: 'Colour feedback is usually brand feedback in disguise.',
  },
  {
    quote: 'It feels a bit empty.',
    options: ['Add a carousel.', 'I don’t trust white space yet.', 'Fill every pixel, we paid for them.'],
    answer: 1,
    note: 'White space is doing a job. It just doesn’t send invoices.',
  },
  {
    quote: 'Can you make it look like Apple?',
    options: ['I want it to feel simple and premium.', 'Please use the Apple logo.', 'Make it white and charge more.'],
    answer: 0,
    note: 'Simple is the hardest part. That’s why it costs more.',
  },
  {
    quote: 'Love it! Just one small change.',
    options: ['One small change.', 'We’re basically done.', 'A large change is coming.'],
    answer: 2,
    note: 'There has never been one small change. Not once. Not in history.',
  },
];

const ROASTS = [
  'Akhil gets 6 out of 6, then makes the logo bigger anyway. Professionalism.',
  'Somewhere a client said “make it pop” and you reached for sparkles.',
  'Please don’t take client calls unsupervised.',
];

const verdictFor = (score) => {
  if (score === QUESTIONS.length) return 'You speak fluent client. Rare and expensive skill.';
  if (score >= QUESTIONS.length - 2) return 'Mostly fluent. You’d survive a kickoff call.';
  return 'You’d have redesigned it in blue. Twice.';
};

// A quiz: translate client feedback into what it actually means
const ClientSpeak = () => {
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const question = QUESTIONS[index];
  const answered = picked !== null;

  const choose = (option) => {
    if (answered) return;
    setPicked(option);
    if (option === question.answer) setScore((previous) => previous + 1);
  };

  const next = () => {
    if (index === QUESTIONS.length - 1) {
      setFinished(true);
      return;
    }
    setIndex((previous) => previous + 1);
    setPicked(null);
  };

  const restart = () => {
    setIndex(0);
    setPicked(null);
    setScore(0);
    setFinished(false);
  };

  const optionStyle = (option) => {
    if (!answered) return 'border-line hover:bg-card';
    if (option === question.answer) return 'border-accent bg-accent text-white';
    if (option === picked) return 'border-stamp text-stamp line-through';
    return 'border-line opacity-50';
  };

  return (
    <GameLayout
      label="Client speak"
      meta={finished ? 'Done' : `Question ${index + 1} of ${QUESTIONS.length}`}
      stage={
        <Frame aspect={false} className="p-5 sm:p-10 min-h-[360px] sm:min-h-[420px] flex flex-col">
          <p className="text-[13px] font-semibold text-secondary">The client says</p>
          <p className="heading mt-2 text-[clamp(2rem,5vw,3.5rem)]">&ldquo;{finished ? 'Thanks, this is great!' : question.quote}&rdquo;</p>

          {finished ? (
            <p className="mt-4 text-[17px] text-secondary">Translation: they will email again in 10 minutes.</p>
          ) : (
            <>
              <p className="mt-6 text-[13px] font-semibold text-secondary">What they actually mean</p>
              <div className="mt-2.5 flex flex-col gap-2">
                {question.options.map((option, optionIndex) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => choose(optionIndex)}
                    disabled={answered}
                    className={`min-h-12 rounded-xl border px-4 py-3 text-left text-[15px] sm:text-[16px] font-medium transition-colors ${optionStyle(optionIndex)}`}
                  >
                    {option}
                  </button>
                ))}
              </div>
              {answered && <p className="mt-4 text-[15px] leading-relaxed text-secondary">{question.note}</p>}
            </>
          )}
        </Frame>
      }
      intro="Every client brief needs translating. Pick what the client actually means."
      hint="Designers will recognise every single one of these."
      actions={
        finished ? (
          <PrimaryButton onClick={restart}>Play again</PrimaryButton>
        ) : (
          <PrimaryButton onClick={next} disabled={!answered}>
            {index === QUESTIONS.length - 1 ? 'See my score' : 'Next'}
          </PrimaryButton>
        )
      }
      result={
        finished && (
          <Result score={`${score} of ${QUESTIONS.length}`} verdict={verdictFor(score)}>
            {score <= QUESTIONS.length - 3 && <Troll lines={ROASTS} />}
          </Result>
        )
      }
    />
  );
};

export default ClientSpeak;
