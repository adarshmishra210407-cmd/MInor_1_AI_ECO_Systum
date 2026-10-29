export const MOCK_RESPONSES = {
  writing: {
    heading: 'Executive Summary: Nexus Intelligence Suite',
    content: `Here is a professional draft for your executive summary and proposal outline:

### 1. Overview & Vision
The Nexus Intelligence Suite represents a paradigm shift in how modern engineering and product teams interact with complex enterprise data. By combining local semantic search with intuitive conversational interfaces, Nexus empowers teams to derive actionable insights instantly without context-switching.

### 2. Core Value Pillars
* **Accelerated Time-to-Insight:** Reduce query lookup times by up to 74% across distributed knowledge bases.
* **Seamless Collaboration:** Unified sharing mechanisms and exportable summary cards designed for rapid stakeholder review.
* **Robust Privacy:** Client-side processing safeguards and strictly isolated session states.

> "Simplicity is the ultimate sophistication. Nexus distills noise into clarity."

### 3. Proposed Implementation Phases
1. **Discovery & Scoping (Weeks 1–2):** Audit existing workflows and define target metrics.
2. **Pilot Deployment (Weeks 3–6):** Roll out to core engineering squads with continuous telemetry.
3. **Full Optimization (Weeks 7+):** Scale adoption across cross-functional departments.`,
  },

  learning: {
    heading: 'Understanding Vector Embeddings & Semantic Search',
    content: `Vector embeddings and semantic search form the backbone of modern AI information retrieval. Here is a clear breakdown:

### What is a Vector Embedding?
An embedding is a mathematical representation of data (words, sentences, or images) mapped as coordinates in a high-dimensional vector space. Concepts with similar meanings are positioned close to one another.

### How Semantic Search Works
Unlike traditional keyword matching (which looks for exact string matches), semantic search understands intent and context:

* **Traditional Search:** Searching for \`car automobile repair\` requires those exact tokens in the text.
* **Semantic Search:** Understands that \`how to fix my vehicle\` is conceptually identical to car repair.

\`\`\`json
{
  "query": "fix vehicle engine",
  "nearestNeighbors": [
    { "id": "doc_842", "similarity": 0.94, "topic": "automotive maintenance" },
    { "id": "doc_109", "similarity": 0.89, "topic": "engine diagnostics" }
  ]
}
\`\`\`

By converting queries and documents into vectors, cosine similarity measures semantic closeness in milliseconds.`,
  },

  brainstorming: {
    heading: 'Go-To-Market Growth Strategies for Developer Tools',
    content: `Here are five high-impact, organic growth strategies tailored for developer-first SaaS products:

### 1. The Interactive Playground First
Allow developers to test the core logic instantly in the browser without registration or credit card requirements. Frictionless trials convert up to 3.5x higher.

### 2. Open-Core & Community Documentation
Open-source key connectors or CLI utilities. Developers trust transparent codebases and actively contribute to documentation and bug fixes.

### 3. Deep Technical Content & Benchmarks
Publish rigorous performance benchmarks comparing latency, memory footprint, and throughput against established alternatives. Engineers respect data over marketing fluff.

### 4. Integration-Led Discovery
Build native, flawless integrations into popular developer hubs (GitHub Actions, VS Code extensions, Vercel dashboards) where developers already spend their day.

### 5. Office Hours & Engineering AMA
Host regular community office hours where founders and core maintainers troubleshoot live architectural challenges with users.`,
  },

  productivity: {
    heading: 'Optimized 4-Hour Deep Work Time-Blocking Schedule',
    content: `Achieving peak cognitive output requires protecting focus time from context fragmentation. Follow this structured schedule:

* **08:30 – 09:00 | Alignment & Triage**
  * Clear urgent blocker communications and set 3 non-negotiable daily objectives.
* **09:00 – 11:00 | Sprint Block 1 (High Complexity)**
  * Uninterrupted coding, core architecture design, or complex problem-solving. Phone on Do Not Disturb.
* **11:00 – 11:15 | Cognitive Reset**
  * Hydration, brief physical stretching, and eyes-away-from-screen break.
* **11:15 – 12:45 | Sprint Block 2 (Execution & Review)**
  * Code reviews, writing unit tests, drafting documentation, and PR merges.
* **12:45 – 13:00 | Daily Wrap & Tomorrow Prep**
  * Commit final changes, document lingering questions, and close IDE.

> "Productivity is never an accident. It is always the result of a commitment to excellence, intelligent planning, and focused effort."`,
  },

  general: {
    heading: 'Nexus AI General Assistant Response',
    content: `I am here to assist you with your day-to-day engineering, writing, and productivity tasks.

### Key Capabilities
* **Interactive Code & Text Formatting:** Easily review code blocks with built-in copy actions.
* **Contextual Mock Streaming:** Observe natural word-by-word generation with instant stop controls.
* **Refined Design System:** Built using the clean, harmonious Nexus AI palette and typography.

Feel free to ask questions or choose one of the suggested prompts on the welcome screen to explore further!`,
  }
};
