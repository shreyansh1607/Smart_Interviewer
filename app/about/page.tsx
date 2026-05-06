import Link from 'next/link';
import { getCurrentUser } from '@/lib/actions/auth.action';
import AboutNavbarWrapper from '@/components/AboutNavbarWrapper';

//components\AboutNavbarWrapper.tsx

const techStack = [
  {
    name: 'VAPI Voice AI',
    icon: '🎙️',
    desc: 'Real-time voice interviews, handles speech-to-speech pipeline',
  },
  {
    name: 'Claude / GPT-4',
    icon: '🤖',
    desc: 'Powers question generation, follow-ups, and feedback engine',
  },
  {
    name: 'Resume Parser',
    icon: '📄',
    desc: 'Custom-built, extracts skills and experience to personalise questions',
  },
  {
    name: 'Scoring Engine',
    icon: '📊',
    desc: 'Evaluates answers on clarity, technical depth, confidence, and relevance',
  },
];

const team = [
  {
    name: 'Shreyansh Yadav',
    role: 'Founder & Full-stack',
    desc: 'Built the core VAPI integration and interview engine',
    emoji: '👨‍💻',
  },
  {
    name: 'Sangram Singh',
    role: 'AI & Backend',
    desc: 'Handles scoring engine, resume parser, and prompt architecture',
    emoji: '🧠',
  },
  {
    name: 'Singh Anand',
    role: 'Frontend & Design',
    desc: 'Built the dashboard and progress tracking UI',
    emoji: '🎨',
  },
  {
    name: 'Sanskar Singh',
    role: 'Product & Growth',
    desc: 'Talks to users, shapes what gets built next',
    emoji: '🚀',
  },
];

const principles = [
  {
    icon: '⚡',
    title: 'Practice beats preparation',
    desc: 'Reading questions is not the same as answering out loud',
  },
  {
    icon: '🎯',
    title: 'Honest feedback only',
    desc: "We don't sugarcoat — if your answer was weak, we say so and explain why",
  },
  {
    icon: '⏱️',
    title: 'Speed matters',
    desc: 'You should be in a mock interview within 2 minutes of signing up',
  },
  {
    icon: '🌍',
    title: 'Accessible to everyone',
    desc: "Interview coaching shouldn't cost thousands; free tier is genuinely useful",
  },
];

const roadmap = [
  { status: 'SHIPPED', label: 'VAPI voice interviews' },
  { status: 'SHIPPED', label: 'Resume-based personalisation' },
  { status: 'SHIPPED', label: 'AI scoring and feedback reports' },
  { status: 'IN PROGRESS', label: 'Behavioural interview module (STAR method coaching)' },
  { status: 'COMING SOON', label: 'Multilingual support (Hindi and regional languages)' },
  { status: 'COMING SOON', label: 'Company-specific prep (Infosys, Flipkart, startups)' },
];

export default async function AboutPage() {
  const currentUser = await getCurrentUser();

  return (
    <div className="min-h-screen bg-[#0f1117] text-white flex flex-col">

      <AboutNavbarWrapper currentUser={currentUser} />

      {/* HERO */}
      <section className="max-w-3xl mx-auto text-center py-20 px-4">
        <div className="inline-block border border-white/20 rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-widest text-purple-400 mb-6">
          About Nexus SmartAI
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
          Built by developers,<br />
          for people who deserve <span className="text-[#c084fc]">the job</span>
        </h1>
        <p className="text-white/60 text-lg leading-relaxed">
          We're a small team of developers who got tired of watching talented people fail interviews — not because they lacked skills, but because they lacked practice. So we built the interviewer we wished existed.
        </p>
      </section>

      {/* THE STORY */}
      <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto bg-white/5 border border-white/10 rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-4">Why we built this</h2>
          <p className="text-white/60 mb-6 leading-relaxed">
            A team member with 2 years of experience kept failing interviews not because he couldn't code, but because he never practiced speaking answers out loud under pressure. Existing tools only gave question lists or text input — none felt like a real interview. So we built Nexus SmartAI using VAPI to create actual spoken interviews with follow-ups and real feedback.
          </p>
          <blockquote className="border-l-4 border-[#c084fc] pl-5 italic text-white/80 bg-white/5 py-3 pr-4 rounded-r-lg">
            "I knew the answers. I just couldn't say them. I needed something that would push back, ask follow-ups, and tell me where I was going wrong."
          </blockquote>
        </div>
      </section>

      {/* THE TECHNOLOGY */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold mb-2 text-center">How we built it</h2>
          <p className="text-white/50 text-center mb-10 text-sm">The tech stack powering every interview</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {techStack.map((tech) => (
              <div key={tech.name} className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col items-start hover:border-purple-500/40 hover:bg-white/8 transition">
                <div className="w-11 h-11 bg-[#6366f1]/20 border border-[#6366f1]/30 rounded-xl flex items-center justify-center mb-4 text-xl">
                  {tech.icon}
                </div>
                <div className="font-semibold mb-2 text-sm">{tech.name}</div>
                <div className="text-white/50 text-xs leading-relaxed">{tech.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* THE TEAM */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold mb-2 text-center">The people behind it</h2>
          <p className="text-white/50 text-center mb-10 text-sm">Small team based in India. No VC funding, just people who thought this needed to exist.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {team.map((member) => (
              <div key={member.name} className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col items-center text-center hover:border-purple-500/40 transition">
                <div className="w-16 h-16 rounded-full bg-[#6366f1]/20 border border-[#6366f1]/30 flex items-center justify-center text-3xl mb-4">
                  {member.emoji}
                </div>
                <div className="font-semibold mb-1">{member.name}</div>
                <div className="text-[#c084fc] text-xs mb-2">{member.role}</div>
                <div className="text-white/50 text-xs leading-relaxed">{member.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OUR PRINCIPLES */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold mb-2 text-center">What we believe</h2>
          <p className="text-white/50 text-center mb-10 text-sm">The principles that guide every decision we make</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {principles.map((p) => (
              <div key={p.title} className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col items-start hover:border-purple-500/40 transition">
                <div className="w-10 h-10 bg-[#c084fc]/10 border border-[#c084fc]/20 rounded-xl flex items-center justify-center text-lg mb-4">
                  {p.icon}
                </div>
                <div className="font-semibold mb-2 text-sm">{p.title}</div>
                <div className="text-white/50 text-xs leading-relaxed">{p.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROADMAP */}
      <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-2 text-center">Where we're headed</h2>
          <p className="text-white/50 text-center mb-10 text-sm">What's shipped, what's in progress, what's coming</p>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
            <div className="border-l-2 border-white/10 pl-6 space-y-6">
              {roadmap.map((item) => (
                <div key={item.label} className="flex items-start gap-4 relative">
                  <div className={`w-3 h-3 rounded-full mt-1 flex-shrink-0 absolute -left-[25px] ${
                    item.status === 'SHIPPED'
                      ? 'bg-[#c084fc]'
                      : item.status === 'IN PROGRESS'
                      ? 'bg-yellow-400'
                      : 'bg-white/20'
                  }`} />
                  <div>
                    <span className={`text-xs font-bold mr-2 ${
                      item.status === 'SHIPPED'
                        ? 'text-[#c084fc]'
                        : item.status === 'IN PROGRESS'
                        ? 'text-yellow-400'
                        : 'text-white/30'
                    }`}>
                      {item.status}
                    </span>
                    <span className={`text-sm ${item.status === 'COMING SOON' ? 'text-white/40' : 'text-white/80'}`}>
                      {item.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CLOSING CTA */}
      <section className="py-20 px-4 text-center">
        <div className="max-w-xl mx-auto bg-white/5 border border-white/10 rounded-2xl p-10">
          <h2 className="text-2xl font-bold mb-3">Ready to practice smarter?</h2>
          <p className="text-white/60 mb-8">Join thousands of job seekers preparing with Nexus SmartAI — for free.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard">
              <button className="bg-[#c084fc] text-black px-6 py-3 rounded-xl font-semibold hover:bg-purple-300 transition w-full sm:w-auto">
                Start your free interview
              </button>
            </Link>
            <Link href="mailto:shreyansh.yadav.dev@gmail.com">
              <button className="bg-white/5 border border-white/20 text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/10 transition w-full sm:w-auto">
                Talk to the team
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-6 mt-auto">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between px-4">
          <div className="flex items-center gap-2 font-bold">
            <div className="w-6 h-6 rounded bg-[#6366f1] flex items-center justify-center text-xs">N</div>
            <span className="text-sm">Nexus SmartAI</span>
          </div>
          <div className="text-xs text-white/30 mt-2 md:mt-0">Built with love in India</div>
        </div>
      </footer>

    </div>
  );
}