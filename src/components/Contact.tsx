import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Mail, 
  Send, 
  Github, 
  Linkedin, 
  Clipboard, 
  Check, 
  CheckCircle, 
  MessageSquare,
  Sparkles,
  Info
} from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [copied, setCopied] = useState(false);
  const [sentMessage, setSentMessage] = useState<any>(null);

  const copyEmail = () => {
    navigator.clipboard.writeText('seraphkeith@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus('error');
      return;
    }

    setStatus('sending');
    // Simulate real server response delay beautifully
    setTimeout(() => {
      setStatus('success');
      setSentMessage({ ...formData });
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1500);
  };

  return (
    <div id="contact-section" className="space-y-16 max-w-5xl mx-auto">
      {/* Intro info */}
      <div className="space-y-4 max-w-3xl">
        <p className="text-xs font-mono font-bold tracking-[0.3em] text-[#00ff88] uppercase">
          MAILROOM // DIRECT LINES
        </p>
        <h2 className="display-text text-5xl md:text-7xl lg:text-8xl text-white font-normal uppercase leading-none">
          LET'S<br/>
          <span className="text-[#00ff88]">CONNECT</span>
        </h2>
        <p className="text-zinc-400 text-sm leading-relaxed font-sans max-w-2xl">
          Have an interesting project proposal, a question about my simulators, or just want to talk about React state management? Shoot me a message below or contact me directly via email.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Left Side: Contact Methods & Badges */}
        <div className="md:col-span-4 space-y-6">
          {/* Email Card Card */}
          <div className="rounded-none border border-zinc-805 bg-[#161616] p-5 space-y-4 flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-[10px] font-mono uppercase text-[#00ff88] tracking-widest flex items-center gap-1.5">
                <Mail className="h-3.5 w-3.5" />
                Direct Channel
              </span>
              <h3 className="text-lg font-bold text-white uppercase tracking-tight">{`seraph`}keith@gmail.com</h3>
              <p className="text-xs text-zinc-500 font-sans">I usually reply within 24 hours.</p>
            </div>
            <button
              id="contact-copy-email-sidebar"
              onClick={copyEmail}
              className="w-full inline-flex items-center justify-center gap-2 border border-zinc-750 hover:border-[#00ff88] bg-transparent p-3 text-xs font-bold uppercase tracking-wider text-white hover:bg-zinc-900 transition-colors rounded-none cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 text-[#00ff88]" />
                  <span className="text-[#00ff88]">Copied!</span>
                </>
              ) : (
                <>
                  <Clipboard className="h-4 w-4" />
                  <span>Copy to Clipboard</span>
                </>
              )}
            </button>
          </div>

          {/* Social connections */}
          <div className="rounded-none border border-zinc-805 bg-[#161616] p-5 space-y-3">
            <span className="text-[10px] font-mono uppercase text-zinc-500 tracking-widest block">Social Handles</span>
            <div className="space-y-2">
              <a 
                id="contact-github"
                href="https://github.com/seraphkeith" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-3 p-2.5 rounded-none border border-zinc-805 bg-black hover:border-[#00ff88] hover:bg-zinc-900 text-zinc-400 hover:text-white transition-all text-xs"
              >
                <Github className="h-4.5 w-4.5" />
                <div className="min-w-0 flex-1">
                  <div className="font-bold text-zinc-300 uppercase tracking-tight text-[11px]">GitHub</div>
                  <div className="text-2xs text-zinc-500 truncate font-mono">github.com/seraphkeith</div>
                </div>
              </a>

              <a 
                id="contact-linkedin"
                href="https://linkedin.com" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-3 p-2.5 rounded-none border border-zinc-805 bg-black hover:border-[#00ff88] hover:bg-zinc-900 text-zinc-400 hover:text-white transition-all text-xs"
              >
                <Linkedin className="h-4.5 w-4.5 text-[#00ff88]" />
                <div className="min-w-0 flex-1">
                  <div className="font-bold text-zinc-300 uppercase tracking-tight text-[11px]">LinkedIn</div>
                  <div className="text-2xs text-zinc-500 truncate font-mono">Connect with me</div>
                </div>
              </a>
            </div>
          </div>

          {/* Environmental warning */}
          <div className="rounded-none bg-black border border-zinc-805 p-4 text-2xs text-zinc-400/95 leading-relaxed flex gap-2.5 font-sans">
            <Info className="h-4 w-4 text-[#00ff88] shrink-0 mt-0.5" />
            <span>This form models a high-fidelity frontend simulation. Messages are compiled, animated, and stored locally in memory to demonstrate stateful React forms!</span>
          </div>
        </div>

        {/* Right Side: Message form or Success Confirmation */}
        <div className="md:col-span-8">
          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div
                key="success-card"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="rounded-none border border-[#00ff88]/30 bg-black p-6 md:p-8 space-y-6"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-none bg-[#00ff88]/15 border border-[#00ff88]/30 text-[#00ff88]">
                    <CheckCircle className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white uppercase tracking-wider">Message Transmitted</h3>
                    <p className="text-2xs text-[#00ff88] font-mono">STATUS BLOCK: 200 OK (SIMULATION BUFFERED)</p>
                  </div>
                </div>

                <div className="bg-zinc-950 rounded-none p-4 border border-zinc-850 space-y-3.5">
                  <div className="text-[10px] font-mono text-[#00ff88] uppercase tracking-wider pb-1.5 border-b border-zinc-850 flex items-center justify-between">
                    <span>Message Data Buffer Payload</span>
                    <Sparkles className="h-3.5 w-3.5" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-zinc-500 font-mono">From:</span>
                      <p className="text-white mt-0.5 font-bold uppercase">{sentMessage?.name}</p>
                    </div>
                    <div>
                      <span className="text-zinc-500 font-mono">Sender Email:</span>
                      <p className="text-[#00ff88] mt-0.5 font-mono">{sentMessage?.email}</p>
                    </div>
                  </div>
                  {sentMessage?.subject && (
                    <div className="text-xs">
                      <span className="text-zinc-500 font-mono">Subject:</span>
                      <p className="text-zinc-300 mt-0.5 font-medium">{sentMessage?.subject}</p>
                    </div>
                  )}
                  <div className="text-xs pt-1">
                    <span className="text-zinc-500 font-mono">Payload message:</span>
                    <p className="text-zinc-300 mt-1 pl-3 border-l-2 border-[#00ff88] italic bg-[#161616] p-2.5 leading-relaxed rounded-none max-h-40 overflow-y-auto font-sans">
                      "{sentMessage?.message}"
                    </p>
                  </div>
                </div>

                <div className="flex justify-end gap-3">
                  <button
                    id="contact-send-another"
                    onClick={() => setStatus('idle')}
                    className="border border-zinc-750 bg-transparent text-white hover:border-[#00ff88] hover:bg-[#222] px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors rounded-none cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.form
                key="contact-form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="rounded-none border border-zinc-805 bg-[#161616] p-6 md:p-8 space-y-6 text-left"
              >
                {status === 'error' && (
                  <div className="rounded-none bg-rose-950/20 border border-rose-900/40 p-3.5 text-xs text-rose-300 font-medium">
                    Please provide your name, email, and message to proceed.
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 font-sans">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-zinc-400 font-bold uppercase tracking-wider">Your Name *</label>
                    <input
                      id="contact-input-name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Satoshi Nakamoto"
                      required
                      disabled={status === 'sending'}
                      className="w-full rounded-none border border-zinc-805 bg-black px-4 py-3 text-sm text-zinc-200 placeholder-zinc-800 outline-none transition-all focus:border-[#00ff88] disabled:opacity-50"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-zinc-400 font-bold uppercase tracking-wider">Email Address *</label>
                    <input
                      id="contact-input-email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="satoshi@bitcoin.org"
                      required
                      disabled={status === 'sending'}
                      className="w-full rounded-none border border-zinc-805 bg-black px-4 py-3 text-sm text-zinc-200 placeholder-zinc-800 outline-none transition-all focus:border-[#00ff88] disabled:opacity-50"
                    />
                  </div>
                </div>

                <div className="space-y-1.5 font-sans">
                  <label className="text-[10px] font-mono text-zinc-400 font-bold uppercase tracking-wider">Subject (Optional)</label>
                  <input
                    id="contact-input-subject"
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Collaboration on Simulators"
                    disabled={status === 'sending'}
                    className="w-full rounded-none border border-zinc-805 bg-black px-4 py-3 text-sm text-zinc-200 placeholder-zinc-800 outline-none transition-all focus:border-[#00ff88] disabled:opacity-50"
                  />
                </div>

                <div className="space-y-1.5 font-sans">
                  <div className="flex items-center justify-between text-[10px] font-mono font-bold uppercase tracking-wider">
                    <label className="text-zinc-400">Your message *</label>
                    <span className="text-zinc-650 font-normal">{formData.message.length} chars</span>
                  </div>
                  <textarea
                    id="contact-input-message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Write your thoughts here..."
                    rows={5}
                    required
                    disabled={status === 'sending'}
                    className="w-full rounded-none border border-zinc-805 bg-black px-4 py-3 text-sm text-zinc-200 placeholder-zinc-800 outline-none transition-all focus:border-[#00ff88] disabled:opacity-40 leading-relaxed resize-none"
                  />
                </div>

                <div className="flex items-center justify-between gap-4 pt-1 flex-wrap">
                  <span className="text-[9px] font-mono text-zinc-500 flex items-center gap-1.5 tracking-wider">
                    <MessageSquare className="h-3.5 w-3.5 text-zinc-650" />
                    FIELDS MARKED WITH * ARE REQUIRED
                  </span>
                  
                  <button
                    id="contact-submit-btn"
                    type="submit"
                    disabled={status === 'sending'}
                    className="group ml-auto inline-flex items-center justify-center gap-2 bg-[#00ff88] hover:bg-[#00e277] px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-black transition-colors rounded-none cursor-pointer duration-200 disabled:opacity-50"
                  >
                    {status === 'sending' ? (
                      <>
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-zinc-800 border-t-black" />
                        <span>Transmitting Packet...</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-3.5 w-3.5" />
                        <span>Transmit Message</span>
                      </>
                    )}
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
