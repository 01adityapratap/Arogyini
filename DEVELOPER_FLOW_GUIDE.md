# AROGYINI: Developer Flow Walkthrough
## Folder Structure → Request/Response Flow

---

## **VISUAL: Request-Response Cycle**

```
┌──────────────────────────────────────────────────────────────────────┐
│                         USER ACTION (Frontend)                        │
│                                                                       │
│  User clicks button / fills form / asks question                     │
└──────────────────────┬──────────────────────────────────────────────┘
                       │
        ┌──────────────▼──────────────┐
        │  FRONTEND (src/)            │
        │  ├─ pages/*.jsx             │ ◄── User interaction starts here
        │  ├─ components/*.jsx        │
        │  └─ services/api.js         │ ◄── Makes HTTP request
        └──────────────┬──────────────┘
                       │
                HTTP REQUEST (JSON)
        GET/POST/PUT/DELETE → http://localhost:3000/api/*
                       │
        ┌──────────────▼──────────────────────────────────┐
        │  BACKEND (server/)                              │
        │                                                 │
        │  1. Express Server (server.js)                  │
        │     └─ Receives request                         │
        │                                                 │
        │  2. Routes (server/routes/*.js)                 │ ◄── Route to correct handler
        │     └─ Identifies which endpoint                │
        │                                                 │
        │  3. Middleware (server/middleware/*.js)         │ ◄── Auth check, validation
        │     └─ Validates request                        │
        │                                                 │
        │  4. Controllers (server/controllers/*.js)       │ ◄── Business logic
        │     └─ Processes request                        │
        │                                                 │
        │  5. Services (server/services/*.js)             │ ◄── Call external services
        │     └─ Makes calls to Python services           │
        │                                                 │
        │  6. Models (server/models/*.js)                 │ ◄── Database operations
        │     └─ Read/Write to Mock DB                    │
        │                                                 │
        │  7. Config (server/config/*.js)                 │
        │     └─ Database connection                      │
        └──────────────┬──────────────────────────────────┘
                       │
        ┌──────────────▼──────────────────────────────────┐
        │  PYTHON MICROSERVICES (external on ports 8000+) │
        │                                                 │
        │  RAG Service (rag-service/)  or                 │
        │  ML Service (ml-service/)                       │
        │                                                 │
        │  ├─ main.py (FastAPI server)                    │
        │  ├─ embeddings/ (vector store)                  │
        │  ├─ retrieval/ (search logic)                   │
        │  ├─ generation/ (LLM response)                  │
        │  └─ documents/ (knowledge base)                 │
        └──────────────┬──────────────────────────────────┘
                       │
                HTTP RESPONSE (JSON)
                       │
        ┌──────────────▼──────────────────────────────────┐
        │  BACKEND PROCESSES RESPONSE                     │
        │                                                 │
        │  Controllers format data                        │
        │  └─ Combines with database results              │
        │     or passes through as-is                     │
        └──────────────┬──────────────────────────────────┘
                       │
                HTTP RESPONSE (JSON)
                       │
        ┌──────────────▼──────────────┐
        │  FRONTEND PROCESSES RESPONSE│
        │                             │
        │  api.js handles response    │
        │  └─ Parse JSON              │
        │                             │
        │  Component receives data    │
        │  └─ Update state (useState) │
        │                             │
        │  React re-renders UI        │
        │  └─ Display to user         │
        └──────────────┬──────────────┘
                       │
        ┌──────────────▼──────────────┐
        │  USER SEES RESULT           │
        │  on Screen                  │
        └─────────────────────────────┘
```

---

## **PART 1: FRONTEND FOLDER STRUCTURE** (`src/`)

### **Directory Tree**
```
src/
├── App.jsx                 ◄── Main app container, routing logic
├── main.jsx                ◄── React entry point (renders App.jsx)
├── index.css               ◄── Global styles
│
├── components/             ◄── REUSABLE UI COMPONENTS
│   ├── Navbar.jsx          ◄── Top navigation bar
│   ├── Footer.jsx          ◄── Footer section
│   ├── SOSButton.jsx       ◄── Emergency button (anywhere on page)
│   ├── RAGAssistantModal.jsx ◄── Chat modal (anywhere on page)
│   ├── PeriodTrackerModal.jsx ◄── Modal dialog for period tracking
│   ├── HealthRiskPredictor.jsx ◄── Health ML predictor widget
│   ├── SafeZoneRadar.jsx   ◄── Map showing safe locations
│   └── ProtectedRoute.jsx  ◄── Wrapper for auth-required pages
│
├── pages/                  ◄── FULL-PAGE COMPONENTS
│   ├── Home.jsx            ◄── Landing page
│   ├── About.jsx           ◄── About page
│   ├── Login.jsx           ◄── Authentication page
│   ├── Register.jsx        ◄── Sign up page
│   ├── Dashboard.jsx       ◄── Main hub (only logged-in users)
│   ├── Health.jsx          ◄── Health pillar
│   ├── Legal.jsx           ◄── Legal pillar
│   ├── Career.jsx          ◄── Career pillar
│   ├── Safety.jsx          ◄── Safety pillar
│   ├── Profile.jsx         ◄── User profile settings
│   └── RAGInspector.jsx    ◄── Debug/test RAG responses
│
├── context/                ◄── GLOBAL STATE MANAGEMENT
│   └── AuthContext.jsx     ◄── Auth state (user logged in? token?)
│
├── services/               ◄── API COMMUNICATION LAYER
│   └── api.js              ◄── Functions to call backend endpoints
│
└── types/
    └── index.js            ◄── TypeScript type definitions
```

### **HOW FRONTEND WORKS (Request Flow)**

#### **Example: User Logs In**

```
1. USER INTERACTION (pages/Login.jsx)
   ├─ User enters email & password
   ├─ Clicks "Login" button
   └─ handleLogin() function triggered

2. API CALL (services/api.js)
   ├─ Call: api.login(email, password)
   ├─ Makes: POST http://localhost:3000/api/auth/login
   ├─ Sends: { email, password }
   └─ Waits for response

3. STORE RESPONSE (pages/Login.jsx)
   ├─ Receives: { token, user }
   ├─ Save token to localStorage
   ├─ Update AuthContext.jsx
   ├─ Redirect to dashboard
   └─ Re-render components based on auth state

4. PROTECTED ACCESS
   ├─ ProtectedRoute.jsx checks token
   ├─ If valid → shows Dashboard.jsx
   ├─ If invalid → redirects to Login.jsx
   └─ AuthContext.jsx remembers login across page refreshes
```

---

## **PART 2: BACKEND FOLDER STRUCTURE** (`server/`)

### **Directory Tree**
```
server/
├── server.js               ◄── ENTRY POINT (Express app setup)
│
├── config/                 ◄── CONFIGURATION
│   └── db.js               ◄── Mock database (users, jobs, records)
│
├── middleware/             ◄── REQUEST INTERCEPTORS
│   └── authMiddleware.js   ◄── Checks if user is authenticated
│
├── routes/                 ◄── URL ROUTING (which controller to call)
│   ├── authRoutes.js       ◄── POST /api/auth/login
│   ├── healthRoutes.js     ◄── GET/POST /api/health/*
│   ├── legalRoutes.js      ◄── GET/POST /api/legal/*
│   ├── careerRoutes.js     ◄── GET/POST /api/career/*
│   ├── sosRoutes.js        ◄── POST /api/sos/*
│   ├── ragRoutes.js        ◄── POST /api/rag/*
│   └── mlRoutes.js         ◄── POST /api/ml/*
│
├── controllers/            ◄── BUSINESS LOGIC (what to do)
│   ├── authController.js   ◄── Handles login/register
│   ├── healthController.js ◄── Handles health endpoints
│   ├── legalController.js  ◄── Handles legal endpoints
│   ├── careerController.js ◄── Handles career endpoints
│   ├── sosController.js    ◄── Handles SOS alert
│   ├── ragController.js    ◄── Calls RAG service
│   └── mlController.js     ◄── Calls ML service
│
├── models/                 ◄── DATA STRUCTURE (database schemas)
│   ├── User.js             ◄── User schema & operations
│   ├── Job.js              ◄── Job posting schema
│   ├── HealthRecord.js     ◄── Health record schema
│   ├── SOSEvent.js         ◄── SOS alert schema
│   └── OtherModels.js      ◄── Other data structures
│
└── services/               ◄── EXTERNAL SERVICE CALLS
    ├── ragService.js       ◄── Calls Python RAG (port 8000)
    ├── mlService.js        ◄── Calls Python ML (port 8001)
    └── notificationService.js ◄── Sends alerts/emails
```

### **HOW BACKEND WORKS (Request Processing)**

#### **Example: User Asks RAG Question (Frontend → Backend → RAG Service)**

```
REQUEST FLOW:
─────────────

1. FRONTEND (components/RAGAssistantModal.jsx)
   ├─ User: "How do I file a workplace harassment complaint?"
   ├─ State: selectedPillar = "legal", inputQuery = "..."
   ├─ Calls: api.queryRAG({ question, pillar })
   └─ Makes: POST http://localhost:3000/api/rag/query
              { "question": "...", "pillar": "legal" }

2. EXPRESS SERVER (server.js)
   ├─ Receives POST request
   ├─ Body: { question, pillar }
   └─ Routes to: /api/rag

3. ROUTE HANDLER (server/routes/ragRoutes.js)
   ├─ Pattern: POST /api/rag/query
   ├─ Calls: ragController.queryRAG
   ├─ Also applies: authMiddleware (checks token)
   └─ Passes data to controller

4. MIDDLEWARE (server/middleware/authMiddleware.js)
   ├─ Checks: Is user logged in?
   ├─ Verifies: Token is valid
   ├─ If ✓ → Continue to controller
   ├─ If ✗ → Send 401 Unauthorized
   └─ Attaches: req.user = { id, email, ... }

5. CONTROLLER (server/controllers/ragController.js)
   ├─ Receives: req.body { question, pillar }
   ├─ Business logic:
   │  ├─ Validate input (not empty, valid pillar)
   │  ├─ Maybe check user permissions
   │  └─ Call ragService.queryRAG()
   └─ Handles: errors, responses

6. SERVICE LAYER (server/services/ragService.js)
   ├─ Makes HTTP call to Python RAG service:
   │  POST http://localhost:8000/api/query
   │  { "question": "...", "pillar": "legal" }
   ├─ Waits for response from RAG
   ├─ Handles network errors
   └─ Returns: { answer, sources, confidence }

7. PYTHON RAG MICROSERVICE (rag-service/main.py)
   ├─ Receives: { question, pillar }
   ├─ Operations:
   │  ├─ Embed question (convert to vector)
   │  ├─ Search vector DB (find similar docs)
   │  ├─ Retrieve relevant documents
   │  ├─ Pass to LLM with prompt
   │  └─ Generate contextual answer
   └─ Returns: { answer, sources }

8. CONTROLLER RECEIVES RESPONSE (server/controllers/ragController.js)
   ├─ Gets: { answer, sources, confidence }
   ├─ Possibly enhances with:
   │  ├─ User history
   │  ├─ Personalization
   │  └─ Logging/analytics
   └─ Prepares JSON response

9. EXPRESS SENDS RESPONSE (server.js)
   ├─ HTTP 200 OK
   ├─ Content-Type: application/json
   └─ Body:
      {
        "success": true,
        "data": {
          "answer": "...",
          "sources": [...],
          "pillar": "legal"
        }
      }

RESPONSE FLOW:
──────────────

10. FRONTEND RECEIVES (services/api.js)
    ├─ Parses JSON response
    ├─ Extracts: { answer, sources }
    └─ Returns to component

11. COMPONENT UPDATES (components/RAGAssistantModal.jsx)
    ├─ setMessages([...messages, { assistantMessage }])
    ├─ React state updates
    ├─ Component re-renders
    └─ User sees answer on screen
```

---

## **PART 3: REQUEST ROUTING PATTERN** 

### **All Backend Requests Follow This Pattern**

```
FRONTEND → API CALL
  ↓
REQUEST STRUCTURE:
  Method: GET/POST/PUT/DELETE
  URL: http://localhost:3000/api/{service}/{endpoint}
  Headers: { Authorization: "Bearer {token}", ... }
  Body: { JSON data }
  ↓
SERVER.JS
  ↓
ROUTE MATCH (server/routes/*.js)
  └─ Pattern: /api/auth/login → authRoutes.js
  └─ Pattern: /api/health/track → healthRoutes.js
  └─ Pattern: /api/rag/query → ragRoutes.js
  ↓
MIDDLEWARE CHECK (authMiddleware.js)
  └─ Verify token exists
  └─ Decode token
  └─ Attach user to req.user
  ↓
CONTROLLER EXECUTION (server/controllers/*.js)
  └─ Receive req, res
  └─ Extract data: req.body, req.params, req.query
  └─ Business logic
  ↓
SERVICE LAYER (optional - if calling external service)
  ├─ Call Python service OR
  ├─ Query database OR
  └─ Send notification
  ↓
MODEL LAYER (optional - if database operation)
  └─ CRUD operation on mock DB
  ↓
PREPARE RESPONSE
  └─ res.json({ success: true/false, data: {...} })
  └─ res.status(200/400/401/500)
  ↓
FRONTEND RECEIVES
  └─ Parse JSON
  └─ Update React state
  └─ Re-render UI
```

---

## **PART 4: SERVICE-BY-SERVICE BREAKDOWN**

### **1. AUTH Service** 
```
Frontend File: pages/Login.jsx, pages/Register.jsx

Request Flow:
  User clicks Login
  ↓
  POST /api/auth/login { email, password }
  ↓
  authRoutes.js → authController.register() or .login()
  ↓
  Check db.users array (config/db.js)
  ↓
  Match credentials
  ↓
  Generate token (JWT)
  ↓
  Return: { token, user }
  ↓
  Frontend saves token to localStorage
  ↓
  AuthContext.jsx updates
  ↓
  User redirected to Dashboard.jsx

Files Involved:
  - Frontend: src/pages/Login.jsx, src/context/AuthContext.jsx
  - Backend: server/routes/authRoutes.js
  - Backend: server/controllers/authController.js
  - Backend: server/middleware/authMiddleware.js
  - Backend: server/config/db.js (mock users)
```

### **2. HEALTH Service**
```
Frontend File: pages/Health.jsx, components/PeriodTrackerModal.jsx

Request Flow:
  User enters period/symptom data
  ↓
  POST /api/health/track-period { date, symptoms, ... }
  ↓
  healthRoutes.js → healthController.trackPeriod()
  ↓
  Create HealthRecord object
  ↓
  Store in db.healthRecords (config/db.js)
  ↓
  Return: { success, record }
  ↓
  Frontend updates state & display

Health Prediction Flow:
  User clicks "Predict Risk"
  ↓
  POST /api/health/predict { age, bmi, symptoms, ... }
  ↓
  healthRoutes.js → healthController.predictHealth()
  ↓
  mlService.predictHealth(userData)
  ↓
  HTTP call to Python ML service (port 8001)
  ↓
  ML returns: { riskScore, category, recommendations }
  ↓
  Backend returns to frontend
  ↓
  HealthRiskPredictor.jsx displays results

Files Involved:
  - Frontend: src/pages/Health.jsx, src/components/HealthRiskPredictor.jsx
  - Backend: server/routes/healthRoutes.js
  - Backend: server/controllers/healthController.js
  - Backend: server/services/mlService.js
  - Backend: server/config/db.js (health records)
  - Python: ml-service/main.py, ml-service/predict.py
```

### **3. LEGAL Service**
```
Frontend File: pages/Legal.jsx

Request Flow:
  User browsing legal information
  ↓
  GET /api/legal/rights
  ↓
  legalRoutes.js → legalController.getRights()
  ↓
  Return seed legal documents from db
  ↓
  Frontend displays information

User Asks RAG Question:
  User: "How do I file a workplace complaint?"
  ↓
  POST /api/legal/query-rag { question, ... }
  ↓
  legalRoutes.js → ragController.queryRAG()
  ↓
  ragService.queryRAG()
  ↓
  HTTP call to Python RAG service (port 8000)
  ↓
  RAG searches legal document corpus
  ↓
  Returns contextual answer with sources
  ↓
  Frontend displays in RAGAssistantModal.jsx

Files Involved:
  - Frontend: src/pages/Legal.jsx, src/components/RAGAssistantModal.jsx
  - Backend: server/routes/legalRoutes.js
  - Backend: server/controllers/legalController.js, ragController.js
  - Backend: server/services/ragService.js
  - Backend: server/config/db.js (legal documents)
  - Python: rag-service/main.py, rag-service/retrieval/retriever.py
```

### **4. CAREER Service**
```
Frontend File: pages/Career.jsx

Request Flow:
  User browsing jobs
  ↓
  GET /api/career/jobs?filter=returnship
  ↓
  careerRoutes.js → careerController.getJobs()
  ↓
  Query db.jobs array
  ↓
  Filter by criteria
  ↓
  Return: [ { job1 }, { job2 }, ... ]
  ↓
  Frontend displays job listings

User Applies for Job:
  User clicks "Apply"
  ↓
  POST /api/career/apply { userId, jobId, ... }
  ↓
  careerRoutes.js → careerController.applyJob()
  ↓
  Create job application record
  ↓
  Store in db
  ↓
  Return: { success, applicationId }
  ↓
  Frontend shows confirmation

Files Involved:
  - Frontend: src/pages/Career.jsx
  - Backend: server/routes/careerRoutes.js
  - Backend: server/controllers/careerController.js
  - Backend: server/config/db.js (jobs, applications)
```

### **5. SOS Service**
```
Frontend File: components/SOSButton.jsx

Request Flow:
  User clicks SOS button (emergency!)
  ↓
  POST /api/sos/alert { userId, location, message }
  ↓
  sosRoutes.js → sosController.triggerSOS()
  ↓
  Create SOS event record
  ↓
  Store in db.sosEvents
  ↓
  Extract user's emergency contacts from db.users
  ↓
  notificationService.notifyEmergencyContacts()
  ↓
  For each contact:
    ├─ Send SMS (future: Twilio)
    ├─ Send email (future: SendGrid)
    └─ Send push notification (future: Firebase)
  ↓
  Return: { success, alertId, contactsNotified }
  ↓
  Frontend shows "SOS Sent" confirmation

Files Involved:
  - Frontend: src/components/SOSButton.jsx
  - Backend: server/routes/sosRoutes.js
  - Backend: server/controllers/sosController.js
  - Backend: server/services/notificationService.js
  - Backend: server/config/db.js (users, SOS events)
```

### **6. RAG Service**
```
Frontend File: components/RAGAssistantModal.jsx

Request Flow:
  User asks question in any pillar
  ↓
  POST /api/rag/query { question, pillar, ... }
  ↓
  ragRoutes.js → ragController.queryRAG()
  ↓
  ragService.queryRAG()
  ↓
  HTTP POST to Python RAG (port 8000)
  {
    "question": "How do I...",
    "pillar": "legal" or "health" or "career" or "safety"
  }
  ↓
  Python RAG Service:
    ├─ Embed question (sentence-transformers)
    ├─ Search vector store (ChromaDB/FAISS)
    ├─ Retrieve top-k documents
    ├─ Pass to LLM (Gemini API)
    ├─ Generate answer with context
    └─ Return { answer, sources, citations }
  ↓
  Backend receives response
  ↓
  Return to frontend with metadata
  ↓
  RAGAssistantModal.jsx displays:
    ├─ Answer
    ├─ Sources/citations
    ├─ Suggested follow-ups
    └─ Expandable source chunks

Files Involved:
  - Frontend: src/components/RAGAssistantModal.jsx
  - Backend: server/routes/ragRoutes.js
  - Backend: server/controllers/ragController.js
  - Backend: server/services/ragService.js
  - Python: rag-service/main.py
  - Python: rag-service/embeddings/vector_store.py
  - Python: rag-service/retrieval/retriever.py
  - Python: rag-service/generation/generator.py
  - Python: rag-service/documents/womens_rights_and_health_corpus.txt
```

---

## **PART 5: DATA FLOW EXAMPLES**

### **Example 1: User Login Flow**

```
START: User on Login Page
│
├─ Component: pages/Login.jsx
│  └─ State: email = "aanya@example.com", password = "xxxx"
│
├─ User clicks "Login"
│  └─ Event handler: handleLogin()
│
├─ Service Call: services/api.js
│  └─ Function: api.login(email, password)
│  └─ HTTP: POST http://localhost:3000/api/auth/login
│  └─ Body: { email, password }
│
├─ Backend: server/routes/authRoutes.js
│  └─ Route matches: POST /api/auth/login
│  └─ Controller: authController.login()
│
├─ Backend: server/controllers/authController.js
│  └─ Logic:
│     ├─ Find user in db.users where email == "aanya@example.com"
│     ├─ Check password matches
│     ├─ Generate JWT token
│     └─ Return { token, user }
│
├─ Backend: server/config/db.js
│  └─ Data:
│     {
│       id: 'usr_default_01',
│       name: 'Aanya Sharma',
│       email: 'aanya@example.com',
│       ...
│     }
│
├─ Response: { token: "eyJhbGc...", user: {...} }
│
├─ Frontend: services/api.js receives response
│  └─ Return to Login.jsx component
│
├─ Frontend: pages/Login.jsx
│  └─ localStorage.setItem('token', token)
│  └─ AuthContext.jsx setAuthToken(token)
│  └─ React state update
│  └─ Navigate to Dashboard
│
END: User logged in, sees Dashboard
```

### **Example 2: RAG Question Flow (Multi-Service)**

```
START: User asks "What is POSH Act?"
│
├─ Component: components/RAGAssistantModal.jsx
│  └─ State: selectedPillar = "legal"
│  └─ Input: "What is POSH Act?"
│
├─ Service Call: services/api.js
│  └─ Function: api.queryRAG({ question, pillar })
│  └─ HTTP: POST http://localhost:3000/api/rag/query
│  └─ Body: { question: "What is POSH Act?", pillar: "legal" }
│
├─ Backend: server/routes/ragRoutes.js
│  └─ Route: POST /api/rag/query
│  └─ Middleware: authMiddleware (verify token)
│  └─ Controller: ragController.queryRAG()
│
├─ Backend: server/controllers/ragController.js
│  └─ Extract: question, pillar
│  └─ Validate input
│  └─ Call: ragService.queryRAG(question, pillar)
│
├─ Backend: server/services/ragService.js
│  └─ Make HTTP call:
│     POST http://localhost:8000/api/query
│     { question: "What is POSH Act?", pillar: "legal" }
│  └─ Wait for response from Python service
│
├─ Python: rag-service/main.py
│  └─ Receive { question, pillar }
│
├─ Python: rag-service/embeddings/vector_store.py
│  └─ Load vector store (pre-computed embeddings)
│  └─ Embed question: "What is POSH Act?" → vector
│
├─ Python: rag-service/retrieval/retriever.py
│  └─ Search vector DB
│  └─ Find most similar documents:
│     ├─ doc_1: "POSH Act 2013 - Sexual Harassment Prevention"
│     ├─ doc_3: "Workplace Rights for Women"
│     └─ doc_5: "Filing Complaints Under POSH"
│
├─ Python: rag-service/generation/generator.py
│  └─ Create LLM prompt:
│     "Using these documents: [doc_1, doc_3, doc_5]
│      Answer: What is POSH Act?"
│  └─ Call Gemini API
│  └─ Get response:
│     "POSH Act 2013 (Prevention of Sexual Harassment Act)
│      is a workplace law in India that protects women
│      from sexual harassment. It requires organizations
│      with 10+ employees to have an ICC..."
│
├─ Python: rag-service/main.py
│  └─ Format response:
│     {
│       "answer": "POSH Act 2013...",
│       "sources": ["doc_1", "doc_3", "doc_5"],
│       "pillar": "legal"
│     }
│  └─ Return to Backend
│
├─ Backend: server/services/ragService.js
│  └─ Receive response
│  └─ Return to controller
│
├─ Backend: server/controllers/ragController.js
│  └─ Format response:
│     {
│       "success": true,
│       "data": {
│         "answer": "POSH Act 2013...",
│         "sources": ["doc_1", "doc_3"],
│         "pillar": "legal",
│         "timestamp": "2026-09-01T10:30:00Z"
│       }
│     }
│  └─ Send HTTP response
│
├─ Frontend: services/api.js
│  └─ Receive response
│  └─ Parse JSON
│  └─ Return to RAGAssistantModal.jsx
│
├─ Frontend: components/RAGAssistantModal.jsx
│  └─ Update state:
│     setMessages([...messages, {
│       sender: 'assistant',
│       text: 'POSH Act 2013...',
│       sources: ['doc_1', 'doc_3']
│     }])
│  └─ React re-renders
│  └─ User sees answer with source citations
│
END: User reads RAG response
```

### **Example 3: Health Risk Prediction Flow**

```
START: User fills health form
│
├─ Component: components/HealthRiskPredictor.jsx
│  └─ Form Data:
│     {
│       age: 24,
│       bmi: 24.5,
│       cycleRegularity: "irregular",
│       symptoms: ["fatigue", "weight_gain"],
│       fatigueLevel: 7,
│       stressLevel: 8
│     }
│
├─ User clicks "Predict Risk"
│  └─ Call: services/api.js → api.predictHealth(formData)
│  └─ HTTP: POST http://localhost:3000/api/health/predict
│  └─ Body: { formData }
│
├─ Backend: server/routes/healthRoutes.js
│  └─ Route: POST /api/health/predict
│  └─ Controller: healthController.predictHealth()
│
├─ Backend: server/controllers/healthController.js
│  └─ Extract form data
│  └─ Validate data
│  └─ Call: mlService.predictHealth(formData)
│
├─ Backend: server/services/mlService.js
│  └─ Make HTTP call:
│     POST http://localhost:8001/predict/health
│     { age, bmi, symptoms, ... }
│  └─ Wait for response from Python ML service
│
├─ Python: ml-service/main.py
│  └─ Receive form data
│
├─ Python: ml-service/predict.py
│  └─ ML Logic:
│     ├─ Load trained model
│     ├─ Pre-process data (normalize, encode)
│     ├─ Run prediction:
│        score = 20
│        if irregular: score += 35 → 55
│        if fatigue > 6: score += 15 → 70
│        ...
│     ├─ Determine category: "High" (score >= 60)
│     └─ Generate recommendations:
│        [
│          { condition: "PCOS", likelihood: 70, ... },
│          { condition: "Thyroid", likelihood: 45, ... }
│        ]
│
├─ Python: ml-service/main.py
│  └─ Format response:
│     {
│       "riskScore": 70,
│       "riskCategory": "High",
│       "possibleConditions": [
│         {
│           "condition": "PCOS",
│           "likelihood": 70,
│           "recommendations": ["See gynecologist", ...]
│         }
│       ]
│     }
│  └─ Return to Backend
│
├─ Backend: server/services/mlService.js
│  └─ Receive response
│  └─ Return to controller
│
├─ Backend: server/controllers/healthController.js
│  └─ Possibly:
│     ├─ Save result to db.healthRecords
│     ├─ Add user context
│     └─ Log for analytics
│  └─ Return to frontend
│
├─ Frontend: services/api.js
│  └─ Parse response
│  └─ Return to HealthRiskPredictor.jsx
│
├─ Frontend: components/HealthRiskPredictor.jsx
│  └─ Update state:
│     setPredictionResult({
│       riskScore: 70,
│       riskCategory: "High",
│       ...
│     })
│  └─ React re-renders
│  └─ Display results with color-coded risk level
│
END: User sees "High Risk" with recommendations
```

---

## **PART 6: QUICK REFERENCE - Which File Does What?**

| User Action | Frontend Component | Backend Route | Controller | Service | Python Service | Database |
|---|---|---|---|---|---|---|
| **Login** | pages/Login.jsx | /api/auth/login | authController | N/A | N/A | db.users |
| **Browse Health Data** | pages/Health.jsx | /api/health/records | healthController | N/A | N/A | db.healthRecords |
| **Track Period** | PeriodTrackerModal.jsx | /api/health/track | healthController | N/A | N/A | db.healthRecords |
| **Predict Health Risk** | HealthRiskPredictor.jsx | /api/health/predict | healthController | mlService.js | ml-service/predict.py | db.users + result |
| **Ask RAG Question** | RAGAssistantModal.jsx | /api/rag/query | ragController | ragService.js | rag-service/main.py | N/A |
| **Browse Legal Info** | pages/Legal.jsx | /api/legal/rights | legalController | N/A | N/A | db.documents |
| **Browse Jobs** | pages/Career.jsx | /api/career/jobs | careerController | N/A | N/A | db.jobs |
| **Apply for Job** | Career.jsx | /api/career/apply | careerController | N/A | N/A | db.applications |
| **Trigger SOS** | SOSButton.jsx | /api/sos/alert | sosController | notificationService.js | N/A | db.sosEvents |
| **View Profile** | pages/Profile.jsx | /api/auth/me | authController | N/A | N/A | db.users |

---

## **PART 7: Environment & Port Configuration**

```
FRONTEND
├─ Runs on: http://localhost:5173 (Vite dev server)
├─ Builds to: dist/ folder
└─ Calls backend on: http://localhost:3000

BACKEND (Express)
├─ Runs on: http://localhost:3000
├─ Entry: server.js
├─ Environment: NODE_ENV = development
└─ Environment vars: .env.local (GEMINI_API_KEY, etc)

PYTHON RAG MICROSERVICE
├─ Runs on: http://localhost:8000
├─ Entry: rag-service/main.py (FastAPI)
├─ Command: uvicorn main:app --port 8000 --reload
├─ Documents: rag-service/documents/
├─ Embeddings: rag-service/embeddings/
└─ Requires: rag-service/requirements.txt installed

PYTHON ML MICROSERVICE
├─ Runs on: http://localhost:8001
├─ Entry: ml-service/main.py (FastAPI)
├─ Command: uvicorn main:app --port 8001 --reload
├─ ML Model: ml-service/predict.py
└─ Requires: ml-service/requirements.txt installed

MOCK DATABASE
├─ Location: server/config/db.js
├─ Data: JavaScript objects (users, jobs, health records, etc)
├─ Persistence: In-memory only (resets on server restart)
└─ Future: Will be replaced with PostgreSQL
```

---

## **PART 8: FOLDER RESPONSIBILITY CHECKLIST**

### **src/ (Frontend)**
- ✅ User Interface & Interactions
- ✅ Form inputs & validation
- ✅ State management (React hooks, Context)
- ✅ API calls (via services/api.js)
- ✅ Routing between pages
- ✅ Styling (Tailwind CSS)
- ✅ Component composition

### **server/routes/** (Backend Routing)
- ✅ Define API endpoints (GET/POST/PUT/DELETE)
- ✅ Attach middleware (auth checks)
- ✅ Route to correct controller
- ✅ Handle URL parameters & query strings

### **server/controllers/** (Backend Business Logic)
- ✅ Extract request data
- ✅ Validate inputs
- ✅ Execute business logic
- ✅ Call services (if needed)
- ✅ Query database/models (if needed)
- ✅ Format & send response

### **server/middleware/** (Backend Request Interceptors)
- ✅ Authentication (verify token)
- ✅ Authorization (check permissions)
- ✅ Request logging
- ✅ Error handling

### **server/services/** (Backend External Service Calls)
- ✅ Call Python microservices (RAG, ML)
- ✅ Send notifications (email, SMS)
- ✅ Handle HTTP requests to external APIs
- ✅ Format data for external services

### **server/models/** (Backend Data Structure)
- ✅ Define data schemas
- ✅ CRUD operations (Create, Read, Update, Delete)
- ✅ Data validation
- ✅ Database queries

### **server/config/** (Backend Configuration)
- ✅ Database connection & initialization
- ✅ Mock data (db.js)
- ✅ Environment variables
- ✅ Application settings

### **rag-service/** (Python RAG Microservice)
- ✅ Embedding & vector store management
- ✅ Document retrieval from vector DB
- ✅ LLM prompt generation & calling
- ✅ Response generation with citations
- ✅ Multi-pillar knowledge base

### **ml-service/** (Python ML Microservice)
- ✅ Health risk prediction models
- ✅ Data preprocessing
- ✅ Model inference
- ✅ Output formatting & recommendations

---

This structure makes it **modular**, **maintainable**, and **scalable**. Each folder has a clear responsibility! 🚀
