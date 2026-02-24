export default function confidenceScoreColor(score: number | undefined) {
  const ranges = [
    {
      min: 0,
      max: 9,
      color: '#B65E5E',
      message: `confidence: ${score}/100`
    },
    {
      min: 10,
      max: 30,
      color: '#F07878',
      message: `confidence: ${score}/100`
    },
    {
      min: 30,
      max: 50,
      color: '#F6AA70',
      message: `confidence: ${score}/100`
    },
    {
      min: 50,
      max: 70,
      color: '#FFBB33',
      message: `confidence: ${score}/100`
    },
    {
      min: 70,
      max: 80,
      color: '#F7E62B',
      message: `confidence: ${score}/100`
    },
    {
      min: 81,
      max: 100,
      color: '#69F465',
      message: `confidence: ${score}/100`
    }
  ];

  const range = ranges.find((r) => score && score >= r.min && score <= r.max);
  return range ? { color: range.color, message: range.message } : ranges[0];
}
