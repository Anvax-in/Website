import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { name, company, email, role, message } = req.body ?? {}

  if (!email || !name) {
    return res.status(400).json({ error: 'Name and email are required' })
  }

  const [firstName, ...rest] = String(name).trim().split(' ')
  const lastName = rest.join(' ') || undefined

  try {
    const loopsRes = await fetch('https://app.loops.so/api/v1/contacts/create', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.LOOPS_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        firstName,
        lastName,
        source: 'contact-form',
        userGroup: 'Leads',
        company: company || undefined,
        jobTitle: role || undefined,
        notes: message || undefined,
      }),
    })

    const data = await loopsRes.json() as { success: boolean; message?: string }

    // Contact already in Loops — treat as success
    if (!loopsRes.ok && data.message?.toLowerCase().includes('already exists')) {
      return res.status(200).json({ success: true })
    }

    if (!loopsRes.ok) {
      console.error('Loops error:', data)
      return res.status(500).json({ error: 'Failed to save contact' })
    }

    return res.status(200).json({ success: true })
  } catch (err) {
    console.error('Contact handler error:', err)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
