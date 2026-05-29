'use client'
import { useState } from 'react'
import { Send, CheckCircle2 } from 'lucide-react'

type FormState = 'idle' | 'sending' | 'success' | 'error'

const inputStyle = {
  background: '#020b18',
  border: '1px solid rgba(0,229,200,0.15)',
  color: '#e8f4ff',
  borderRadius: '0.75rem',
  padding: '0.625rem 1rem',
  fontSize: '0.875rem',
  width: '100%',
  outline: 'none',
  transition: 'border-color 0.2s',
}

export default function ContactForm() {
  const [state, setState] = useState<FormState>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setState('sending')

    const form = e.currentTarget
    const data = {
      name:    (form.elements.namedItem('name')    as HTMLInputElement).value,
      email:   (form.elements.namedItem('email')   as HTMLInputElement).value,
      phone:   (form.elements.namedItem('phone')   as HTMLInputElement).value || undefined,
      subject: (form.elements.namedItem('subject') as HTMLInputElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      setState(res.ok ? 'success' : 'error')
    } catch {
      setState('error')
    }
  }

  if (state === 'success') {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
          style={{ background: 'rgba(0,229,200,0.1)', border: '2px solid rgba(0,229,200,0.3)', boxShadow: '0 0 30px rgba(0,229,200,0.2)' }}>
          <CheckCircle2 size={32} style={{ color: '#00e5c8' }} />
        </div>
        <h3 className="text-xl font-bold mb-2" style={{ color: '#e8f4ff' }}>Message Sent!</h3>
        <p className="text-sm max-w-xs" style={{ color: '#607896' }}>
          We&apos;ll get back to you within 1–2 business days.
        </p>
        <button
          onClick={() => setState('idle')}
          className="mt-6 text-sm font-semibold hover:underline"
          style={{ color: '#00e5c8' }}
        >
          Send another message
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1.5" style={{ color: 'rgba(232,244,255,0.7)' }}>Full Name</label>
          <input
            name="name"
            required
            placeholder="Your name"
            className="placeholder-[#607896]"
            style={inputStyle}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5" style={{ color: 'rgba(232,244,255,0.7)' }}>Email Address</label>
          <input
            name="email"
            type="email"
            required
            placeholder="you@example.com"
            className="placeholder-[#607896]"
            style={inputStyle}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1.5" style={{ color: 'rgba(232,244,255,0.7)' }}>
          Phone <span style={{ color: '#607896', fontWeight: 400 }}>(optional)</span>
        </label>
        <input
          name="phone"
          type="tel"
          placeholder="+92 300 0000000"
          className="placeholder-[#607896]"
          style={inputStyle}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1.5" style={{ color: 'rgba(232,244,255,0.7)' }}>Subject</label>
        <input
          name="subject"
          required
          placeholder="Programme enquiry / Application / Other"
          className="placeholder-[#607896]"
          style={inputStyle}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1.5" style={{ color: 'rgba(232,244,255,0.7)' }}>Message</label>
        <textarea
          name="message"
          required
          rows={5}
          placeholder="Tell us what you'd like to know…"
          className="placeholder-[#607896] resize-none"
          style={inputStyle}
        />
      </div>

      {state === 'error' && (
        <p className="text-sm" style={{ color: '#f87171' }}>Something went wrong. Please try again or email us directly.</p>
      )}

      <button
        type="submit"
        disabled={state === 'sending'}
        className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold transition-all text-sm disabled:opacity-60 disabled:cursor-not-allowed"
        style={{ background: 'linear-gradient(135deg, #00e5c8, #38bdf8)', color: '#020b18', boxShadow: '0 0 24px rgba(0,229,200,0.3)' }}
      >
        <Send size={16} />
        {state === 'sending' ? 'Sending…' : 'Send Message'}
      </button>
    </form>
  )
}
