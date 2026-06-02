export async function POST(request: Request) {
  const body = await request.json() as Record<string, unknown>
  const { name, company, email, role, message } = body

  if (!email || !name) {
    return Response.json({ error: 'Name and email are required' }, { status: 400 })
  }

  if (!process.env.LOOPS_API_KEY) {
    console.error('LOOPS_API_KEY is not set')
    return Response.json({ error: 'Server misconfiguration' }, { status: 500 })
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
    console.log('Loops response:', loopsRes.status, JSON.stringify(data))

    if (!loopsRes.ok && data.message?.toLowerCase().includes('already exists')) {
      return Response.json({ success: true })
    }

    if (!loopsRes.ok) {
      console.error('Loops error:', loopsRes.status, data)
      return Response.json({ error: 'Failed to save contact' }, { status: 500 })
    }

    return Response.json({ success: true })
  } catch (err) {
    console.error('Contact handler error:', err)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}
