'use client'

import { useState, useRef } from 'react'
import styles from '@/pages/Contact.module.css'

export default function ContactClient() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')
  const formRef = useRef<HTMLFormElement>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    const fd = new FormData(e.currentTarget)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name:    fd.get('name'),
          company: fd.get('company'),
          email:   fd.get('email'),
          role:    fd.get('role'),
          message: fd.get('message'),
        }),
      })
      if (res.ok) {
        setStatus('done')
        formRef.current?.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroInner}>
            <p className={styles.heroEyebrow}>Contact</p>
            <h1 className={styles.heroH1}>
              Let's talk about your<br />
              <span className={styles.heroEm}>compliance stack.</span>
            </h1>
            <p className={styles.heroLede}>
              Tell us about your organisation and what you're trying to solve.
              We respond to every enquiry within one business day.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className={styles.layout}>

            {/* Form */}
            <div className={styles.formWrap}>
              {status === 'done' ? (
                <div className={styles.thanks}>
                  <div className={styles.thanksIcon}>✓</div>
                  <h2 className={styles.thanksH2}>We've received your message.</h2>
                  <p className={styles.thanksP}>
                    Someone from the team will be in touch within one business day.
                    If your request is urgent, email us directly at{' '}
                    <a href="mailto:sales@anvax.in">sales@anvax.in</a>.
                  </p>
                </div>
              ) : (
                <form className={styles.form} onSubmit={handleSubmit} ref={formRef}>
                  <div className={styles.row2}>
                    <div className={styles.field}>
                      <label className={styles.label}>Your name</label>
                      <input className={styles.input} name="name" type="text" placeholder="Meera Iyer" required />
                    </div>
                    <div className={styles.field}>
                      <label className={styles.label}>Organisation</label>
                      <input className={styles.input} name="company" type="text" placeholder="Acme Bank" required />
                    </div>
                  </div>
                  <div className={styles.row2}>
                    <div className={styles.field}>
                      <label className={styles.label}>Work email</label>
                      <input className={styles.input} name="email" type="email" placeholder="meera@acmebank.in" required />
                    </div>
                    <div className={styles.field}>
                      <label className={styles.label}>Your role</label>
                      <select className={styles.input} name="role" required defaultValue="">
                        <option value="" disabled>Select role</option>
                        <option>CISO / Security</option>
                        <option>CTO / Technology</option>
                        <option>Compliance officer</option>
                        <option>Credit / Risk</option>
                        <option>Operations</option>
                        <option>Founder / CEO</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label}>What are you looking to solve?</label>
                    <textarea
                      className={styles.textarea}
                      name="message"
                      rows={5}
                      placeholder="Tell us about your team size, the tools you currently use, and what's driving your interest in Anvax."
                      required
                    />
                  </div>
                  {status === 'error' && (
                    <p className={styles.errorMsg}>Something went wrong — please try again or email us at sales@anvax.in</p>
                  )}
                  <button type="submit" className={styles.submit} disabled={status === 'sending'}>
                    {status === 'sending' ? 'Sending…' : 'Send message →'}
                  </button>
                </form>
              )}
            </div>

            {/* Side info */}
            <aside className={styles.aside}>
              <div className={styles.asideCard}>
                <div className={styles.asideLabel}>Sales & product</div>
                <p className={styles.asideDesc}>
                  Questions about pricing, deployment tiers, or a specific compliance use case.
                </p>
                <a href="mailto:sales@anvax.in" className={styles.asideEmail}>sales@anvax.in</a>
              </div>
              <div className={styles.asideCard}>
                <div className={styles.asideLabel}>Security disclosures</div>
                <p className={styles.asideDesc}>
                  Found a vulnerability? We operate a responsible disclosure programme.
                  Please do not share details in public channels.
                </p>
                <a href="mailto:security@anvax.in" className={styles.asideEmail}>security@anvax.in</a>
              </div>
              <div className={styles.asideCard}>
                <div className={styles.asideLabel}>Response time</div>
                <p className={styles.asideDesc}>
                  We respond to every sales enquiry within one business day.
                  Security reports within 24 hours.
                </p>
              </div>
            </aside>

          </div>
        </div>
      </section>
    </>
  )
}
