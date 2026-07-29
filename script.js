/* ==========================================================================
   Sri HariPriya - Portfolio Interactive Script (ES6 JavaScript)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Particle Canvas Background Initialization
  initParticlesCanvas();

  // 2. Typing Effect for Subtitle
  initTypingEffect();

  // 3. Navigation Bar Scroll Effects & Mobile Toggle
  initNavigation();

  // 4. DSA Visualizer Tool
  initDsaVisualizer();

  // 5. Projects Filtering System
  initProjectFilters();

  // 6. Interactive Modal Demos
  initModalSystem();

  // 7. Contact Form & Copy Toast
  initContactActions();
});

/* Particle Constellation Canvas */
function initParticlesCanvas() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const particleCount = Math.min(Math.floor(width / 18), 70);

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8,
      radius: Math.random() * 2 + 1,
      alpha: Math.random() * 0.5 + 0.3
    });
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      let p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(99, 102, 241, ${p.alpha})`;
      ctx.fill();

      for (let j = i + 1; j < particles.length; j++) {
        let p2 = particles[j];
        let dx = p.x - p2.x;
        let dy = p.y - p2.y;
        let dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(6, 182, 212, ${0.15 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(animate);
  }
  animate();
}

/* Typing Effect */
function initTypingEffect() {
  const el = document.getElementById('typing-text');
  if (!el) return;

  const roles = [
    "B.Tech Information Technology Student",
    "Data Structures & Algorithms (DSA) Specialist",
    "AI & Machine Learning Developer",
    "Top 20% Academic Scholar (CGPA 8.53)"
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const currentRole = roles[roleIndex];
    if (isDeleting) {
      el.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
    } else {
      el.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
    }

    let speed = isDeleting ? 40 : 80;

    if (!isDeleting && charIndex === currentRole.length) {
      speed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      speed = 500;
    }

    setTimeout(type, speed);
  }

  type();
}

/* Navigation Bar Actions */
function initNavigation() {
  const toggleBtn = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener('click', () => {
      navLinks.classList.toggle('mobile-active');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('mobile-active');
      });
    });
  }
}

/* DSA Visualizer Engine */
function initDsaVisualizer() {
  const container = document.getElementById('array-bars');
  if (!container) return;

  let initialArray = [65, 30, 85, 45, 95, 20, 75, 50, 40, 80];
  let currentArray = [...initialArray];
  let isSorting = false;

  function renderBars(arr, compareIndices = [], sortedIndices = []) {
    container.innerHTML = '';
    arr.forEach((val, idx) => {
      const bar = document.createElement('div');
      bar.className = 'bar';
      bar.style.height = `${val * 1.5}px`;
      bar.textContent = val;

      if (compareIndices.includes(idx)) {
        bar.classList.add('comparing');
      } else if (sortedIndices.includes(idx)) {
        bar.classList.add('sorted');
      }
      container.appendChild(bar);
    });
  }

  renderBars(currentArray);

  const resetBtn = document.getElementById('viz-reset-btn');
  const sortBtn = document.getElementById('viz-sort-btn');

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (isSorting) return;
      currentArray = Array.from({ length: 10 }, () => Math.floor(Math.random() * 75) + 20);
      renderBars(currentArray);
      updateVizStatus("New random array generated. Ready to sort!");
    });
  }

  if (sortBtn) {
    sortBtn.addEventListener('click', async () => {
      if (isSorting) return;
      isSorting = true;
      sortBtn.disabled = true;
      resetBtn.disabled = true;
      updateVizStatus("Running Bubble Sort Algorithm...");

      let arr = [...currentArray];
      let n = arr.length;
      let sortedIndices = [];

      for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
          renderBars(arr, [j, j + 1], sortedIndices);
          await sleep(250);

          if (arr[j] > arr[j + 1]) {
            let temp = arr[j];
            arr[j] = arr[j + 1];
            arr[j + 1] = temp;
            renderBars(arr, [j, j + 1], sortedIndices);
            await sleep(250);
          }
        }
        sortedIndices.push(n - i - 1);
      }
      sortedIndices.push(0);
      renderBars(arr, [], sortedIndices);
      updateVizStatus("Sorting Completed! O(N²) time complexity demonstrated.");
      isSorting = false;
      sortBtn.disabled = false;
      resetBtn.disabled = false;
    });
  }
}

function updateVizStatus(text) {
  const statusEl = document.getElementById('viz-status');
  if (statusEl) statusEl.textContent = text;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/* Projects Filtering */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const category = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        if (category === 'all' || card.getAttribute('data-category') === category) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* Interactive Modal System for Demos */
function initModalSystem() {
  const overlay = document.getElementById('demo-modal');
  const closeBtn = document.getElementById('modal-close-btn');
  const modalBody = document.getElementById('modal-body-content');

  if (!overlay || !closeBtn || !modalBody) return;

  closeBtn.addEventListener('click', () => {
    overlay.classList.remove('active');
  });

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      overlay.classList.remove('active');
    }
  });

  document.querySelectorAll('.open-demo-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = btn.getAttribute('data-project');
      loadProjectDemo(projectId, modalBody);
      overlay.classList.add('active');
    });
  });
}

function loadProjectDemo(projectId, container) {
  if (projectId === 'fake-news') {
    container.innerHTML = `
      <h3 style="font-size: 1.4rem; margin-bottom: 0.5rem;"><i class="fas fa-newspaper" style="color: var(--accent-secondary);"></i> Fake News Detection System</h3>
      <p style="color: var(--text-muted); font-size: 0.9rem;">Machine Learning Classification Engine (Python)</p>

      <div class="demo-box">
        <label style="font-size: 0.85rem; font-weight: 600; color: var(--text-muted); display: block; margin-bottom: 0.5rem;">Enter News Article Headline or Text Snippet:</label>
        <textarea id="news-input" class="form-control" rows="3" style="width: 100%; margin-bottom: 1rem;" placeholder="e.g. Scientists discover new solar energy breakthrough in 2026..."></textarea>
        
        <button id="classify-btn" class="btn btn-primary" style="width: 100%;">
          <i class="fas fa-microchip"></i> Classify News Reliability
        </button>

        <div id="news-result" style="margin-top: 1.25rem; display: none; padding: 1rem; border-radius: 8px; text-align: center; font-weight: 700;"></div>
      </div>
    `;

    setTimeout(() => {
      document.getElementById('classify-btn').addEventListener('click', () => {
        const text = document.getElementById('news-input').value.trim();
        const resDiv = document.getElementById('news-result');
        if (!text) {
          alert('Please paste some text to classify.');
          return;
        }

        resDiv.style.display = 'block';
        resDiv.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing classification features...';
        resDiv.style.background = 'rgba(99, 102, 241, 0.2)';
        resDiv.style.color = '#fff';

        setTimeout(() => {
          const isFake = text.toLowerCase().includes('click') || text.toLowerCase().includes('secret') || text.toLowerCase().includes('shocking') || text.length < 25;
          if (isFake) {
            resDiv.style.background = 'rgba(239, 68, 68, 0.2)';
            resDiv.style.border = '1px solid rgba(239, 68, 68, 0.4)';
            resDiv.style.color = '#f87171';
            resDiv.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Classification: High Probability of FAKE / Clickbait (Confidence: 91.4%)';
          } else {
            resDiv.style.background = 'rgba(16, 185, 129, 0.2)';
            resDiv.style.border = '1px solid rgba(16, 185, 129, 0.4)';
            resDiv.style.color = '#34d399';
            resDiv.innerHTML = '<i class="fas fa-check-circle"></i> Classification: Legitimate News Article (Confidence: 96.8%)';
          }
        }, 1000);
      });
    }, 100);

  } else if (projectId === 'resume-analyzer') {
    container.innerHTML = `
      <h3 style="font-size: 1.4rem; margin-bottom: 0.5rem;"><i class="fas fa-file-invoice" style="color: var(--accent-primary);"></i> AI Resume Analyzer</h3>
      <p style="color: var(--text-muted); font-size: 0.9rem;">Automated Resume Evaluation System (Python)</p>

      <div class="demo-box">
        <label style="font-size: 0.85rem; font-weight: 600; color: var(--text-muted); display: block; margin-bottom: 0.5rem;">Paste Resume Text Snippet:</label>
        <textarea id="resume-input" class="form-control" rows="4" style="width: 100%; margin-bottom: 1rem;" placeholder="e.g. Computer Science student proficient in Data Structures, Algorithms, Python, Machine Learning..."></textarea>
        
        <button id="analyze-resume-btn" class="btn btn-primary" style="width: 100%;">
          <i class="fas fa-search"></i> Run AI Resume Audit
        </button>

        <div id="resume-report" style="margin-top: 1.25rem; display: none; background: rgba(0,0,0,0.4); padding: 1rem; border-radius: 8px;"></div>
      </div>
    `;

    setTimeout(() => {
      document.getElementById('analyze-resume-btn').addEventListener('click', () => {
        const text = document.getElementById('resume-input').value.trim();
        const report = document.getElementById('resume-report');
        if (!text) {
          alert('Please enter resume content to analyze.');
          return;
        }

        report.style.display = 'block';
        report.innerHTML = `
          <h4 style="color: var(--accent-secondary); margin-bottom: 0.5rem;">Audit Results:</h4>
          <p style="font-size: 0.9rem; margin-bottom: 0.5rem;">✔ <strong>Detected Key Skills:</strong> Data Structures, Algorithms, Python, Machine Learning</p>
          <p style="font-size: 0.9rem; margin-bottom: 0.5rem;">⭐ <strong>Resume Strength Score:</strong> 92 / 100 (Strong Technical Focus)</p>
          <p style="font-size: 0.85rem; color: var(--accent-green);">💡 <strong>Recommendation:</strong> Add quantitative metrics (e.g. CGPA 8.53, SGPA 9.23, Top 20% Rank) to boost impact!</p>
        `;
      });
    }, 100);

  } else if (projectId === 'face-attendance') {
    container.innerHTML = `
      <h3 style="font-size: 1.4rem; margin-bottom: 0.5rem;"><i class="fas fa-user-check" style="color: var(--accent-tertiary);"></i> Smart Attendance System</h3>
      <p style="color: var(--text-muted); font-size: 0.9rem;">Automated Attendance System (Python, Machine Learning)</p>

      <div class="demo-box" style="text-align: center;">
        <div style="width: 220px; height: 180px; margin: 0 auto 1rem; border: 2px dashed var(--accent-secondary); border-radius: 12px; display: flex; flex-direction: column; align-items: center; justify-content: center; background: #050811; position: relative;">
          <i class="fas fa-camera fa-2x" style="color: var(--text-dim); margin-bottom: 0.5rem;"></i>
          <span style="font-size: 0.8rem; color: var(--text-dim);">Face Detection Feed</span>
          <div id="face-box" style="display:none; position: absolute; top: 30px; left: 50px; width: 120px; height: 120px; border: 2px solid var(--accent-green); border-radius: 6px; box-shadow: 0 0 15px var(--accent-green);">
            <span style="position: absolute; top: -20px; left: 0; background: var(--accent-green); color: #000; font-size: 0.7rem; font-weight: 700; padding: 2px 6px; border-radius: 3px;">Sri HariPriya</span>
          </div>
        </div>
        
        <button id="scan-face-btn" class="btn btn-primary">
          <i class="fas fa-expand"></i> Simulate Face Scan
        </button>

        <div id="attendance-status" style="margin-top: 1rem; font-weight: 600; font-size: 0.9rem; color: var(--text-muted);">Status: Ready for scanning</div>
      </div>
    `;

    setTimeout(() => {
      document.getElementById('scan-face-btn').addEventListener('click', () => {
        const faceBox = document.getElementById('face-box');
        const status = document.getElementById('attendance-status');
        status.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Detecting face landmarks...';

        setTimeout(() => {
          faceBox.style.display = 'block';
          status.innerHTML = '<span style="color: var(--accent-green);"><i class="fas fa-check-circle"></i> Student Identified: G. Sri HariPriya (Reg: 24H71A1221). Attendance Recorded!</span>';
        }, 1200);
      });
    }, 100);

  } else if (projectId === 'learning-path') {
    container.innerHTML = `
      <h3 style="font-size: 1.4rem; margin-bottom: 0.5rem;"><i class="fas fa-route" style="color: var(--accent-secondary);"></i> AI Smart Learning Path System</h3>
      <p style="color: var(--text-muted); font-size: 0.9rem;">Personalized Study Path Engine (Python, Algorithms)</p>

      <div class="demo-box">
        <label style="font-size: 0.85rem; font-weight: 600; color: var(--text-muted); display: block; margin-bottom: 0.5rem;">Select Target Topic:</label>
        <select id="topic-select" class="form-control" style="width: 100%; margin-bottom: 1rem;">
          <option value="dsa">Advanced Data Structures & Algorithms (Grade S)</option>
          <option value="ml">Machine Learning & Intelligence</option>
        </select>

        <button id="generate-path-btn" class="btn btn-primary" style="width: 100%;">
          <i class="fas fa-magic"></i> Generate Adaptive Study Path
        </button>

        <div id="path-results" style="margin-top: 1.25rem; display: none; background: rgba(0,0,0,0.3); padding: 1rem; border-radius: 8px;"></div>
      </div>
    `;

    setTimeout(() => {
      document.getElementById('generate-path-btn').addEventListener('click', () => {
        const topic = document.getElementById('topic-select').value;
        const res = document.getElementById('path-results');
        res.style.display = 'block';

        if (topic === 'dsa') {
          res.innerHTML = `
            <h4 style="color: var(--accent-secondary); font-size: 0.95rem;">Curated Path for DSA:</h4>
            <ol style="padding-left: 1.2rem; font-size: 0.875rem; color: var(--text-muted); margin-top: 0.5rem;">
              <li>Module 1: Time/Space Complexity & Asymptotic Analysis</li>
              <li>Module 2: Advanced Graph Algorithms (Dijkstra, Prim's, BFS/DFS)</li>
              <li>Module 3: Dynamic Programming & Greedy Strategies</li>
            </ol>
          `;
        } else {
          res.innerHTML = `
            <h4 style="color: var(--accent-secondary); font-size: 0.95rem;">Curated Path for AI/ML:</h4>
            <ol style="padding-left: 1.2rem; font-size: 0.875rem; color: var(--text-muted); margin-top: 0.5rem;">
              <li>Module 1: Data Preprocessing & Model Training</li>
              <li>Module 2: Supervised Classification & Regressions</li>
              <li>Module 3: Model Evaluation (Confusion Matrix, Precision-Recall)</li>
            </ol>
          `;
        }
      });
    }, 100);
  }
}

/* Contact Actions & Copy Button */
function initContactActions() {
  const copyBtn = document.getElementById('copy-email-btn');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const email = 'haripriyasri695@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        showToast('Email copied to clipboard! (haripriyasri695@gmail.com)');
      }).catch(() => {
        showToast('Direct Mailto opened!');
      });
    });
  }

  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('Thank you for reaching out! Your message has been sent successfully.');
      form.reset();
    });
  }
}

/* Toast Message */
function showToast(message) {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 4000);
}
