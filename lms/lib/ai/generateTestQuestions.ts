import Anthropic from '@anthropic-ai/sdk'

export type DifficultyMix = { EASY: number; MEDIUM: number; HARD: number }

export type GeneratedQuestion = {
  text: string
  options: { id: string; text: string; isCorrect: boolean }[]
  difficulty: 'EASY' | 'MEDIUM' | 'HARD'
  explanation: string
}

const OVERSAMPLE_FACTOR = 2

function buildPrompt(courseTrade: string, topicBrief: string, difficultyMix: DifficultyMix) {
  const counts = {
    EASY: difficultyMix.EASY * OVERSAMPLE_FACTOR,
    MEDIUM: difficultyMix.MEDIUM * OVERSAMPLE_FACTOR,
    HARD: difficultyMix.HARD * OVERSAMPLE_FACTOR,
  }
  const total = counts.EASY + counts.MEDIUM + counts.HARD

  return `You are writing a multiple-choice test bank for a vocational training course called "${courseTrade}".

The instructor taught the following content and the test must ONLY cover this — do not introduce topics outside it:
"""
${topicBrief}
"""

Generate exactly ${total} multiple-choice questions:
- ${counts.EASY} EASY difficulty
- ${counts.MEDIUM} MEDIUM difficulty
- ${counts.HARD} HARD difficulty

Rules:
- Each question has exactly 4 options, exactly one correct.
- Questions must be unambiguous, factually correct, and strictly based on the content above.
- Do not repeat the same question twice.
- Respond with ONLY a JSON array, no prose, no markdown fences. Each item:
{"text": "...", "difficulty": "EASY"|"MEDIUM"|"HARD", "options": [{"text":"...","isCorrect":true|false}, ...four of these...], "explanation": "one sentence why the correct option is correct"}`
}

function parseQuestions(raw: string): GeneratedQuestion[] {
  const cleaned = raw.trim().replace(/^```(json)?/i, '').replace(/```$/, '').trim()
  const parsed = JSON.parse(cleaned)
  if (!Array.isArray(parsed)) throw new Error('AI response was not a JSON array')

  return parsed.map((q: any, i: number) => {
    if (!q.text || !Array.isArray(q.options) || q.options.length !== 4)
      throw new Error(`Malformed question at index ${i}`)
    const correctCount = q.options.filter((o: any) => o.isCorrect).length
    if (correctCount !== 1) throw new Error(`Question at index ${i} must have exactly one correct option`)
    return {
      text: q.text,
      difficulty: ['EASY', 'MEDIUM', 'HARD'].includes(q.difficulty) ? q.difficulty : 'MEDIUM',
      explanation: q.explanation ?? '',
      options: q.options.map((o: any, oi: number) => ({
        id: `opt_${i}_${oi}`,
        text: o.text,
        isCorrect: !!o.isCorrect,
      })),
    }
  })
}

export async function generateTestQuestions(
  courseTrade: string,
  topicBrief: string,
  difficultyMix: DifficultyMix
): Promise<GeneratedQuestion[]> {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) throw new Error('ANTHROPIC_API_KEY is not configured')

  const client = new Anthropic({ apiKey })
  const prompt = buildPrompt(courseTrade, topicBrief, difficultyMix)

  const totalRequested = (difficultyMix.EASY + difficultyMix.MEDIUM + difficultyMix.HARD) * OVERSAMPLE_FACTOR
  const maxTokens = Math.min(64000, Math.max(4000, totalRequested * 500))

  let lastError: unknown
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const stream = client.messages.stream({
        model: 'claude-sonnet-4-5',
        max_tokens: maxTokens,
        messages: [{ role: 'user', content: prompt }],
      })
      const response = await stream.finalMessage()
      if (response.stop_reason === 'max_tokens')
        throw new Error('AI response was cut off — try fewer questions per test or shorter topic content.')
      const block = response.content[0]
      const text = block.type === 'text' ? block.text : ''
      return parseQuestions(text)
    } catch (err) {
      lastError = err
    }
  }
  throw new Error(`AI question generation failed: ${lastError instanceof Error ? lastError.message : 'unknown error'}`)
}
