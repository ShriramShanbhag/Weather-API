Here’s a clean, interview-ready Q&A summary you can directly drop into a Markdown file for GitHub:


# Async Tasks in Backend (Node.js) — Interview Q&A

## 1. Why do we need async tasks in backend systems?

**Answer:**
Async tasks allow us to move slow or non-critical work (like sending emails, processing files, or calling external APIs) outside the request-response cycle.

**Benefits:**
- Faster API responses
- Better user experience
- Improved scalability
- Fault isolation (failures don’t break main flow)

---

## 2. How are async tasks typically implemented?

**Answer:**
Using a **job queue + worker architecture**:

1. API receives request
2. Pushes job to a queue (e.g., Redis)
3. Returns response immediately
4. Worker processes job asynchronously

**Popular tools:**
- BullMQ (Node.js)
- Celery (Python)
- Sidekiq (Ruby)

---

## 3. What happens when multiple users trigger async jobs?

**Answer:**
- Each request adds a job to the queue
- Jobs are stored (e.g., in Redis)
- Workers pull and process them independently
- Jobs can be processed sequentially or concurrently

---

## 4. If Node.js is single-threaded, how does it handle background jobs?

**Answer:**
Node.js is **single-threaded per process**, but:
- You can run multiple processes (API + workers)
- Each process has its own event loop
- Workers are separate processes consuming jobs

---

## 5. Does Node.js automatically create worker processes?

**Answer:**
No.

- You must explicitly run worker processes
- Example:
  ```bash
  node server.js
  node worker.js

In production, tools like PM2 or Docker manage multiple processes.

---

## 6. What happens when using BullMQ in NestJS?

**Answer:**

* `BullModule.registerQueue()` → only registers queue (producer)
* `@Processor()` → creates a worker (consumer)

**Default behavior:**

* 1 worker per process
* Concurrency = 1 (unless configured)

---

## 7. How can we scale workers?

**Answer:**

### Option 1: Multiple processes

```bash
pm2 start worker.js -i 4
```

### Option 2: Increase concurrency

```ts
@Process({ concurrency: 5 })
```

---

## 8. What is exponential backoff?

**Answer:**
A retry strategy where delay increases exponentially after each failure.

**Example:**

* 1st retry → 1s
* 2nd retry → 2s
* 3rd retry → 4s
* 4th retry → 8s

**Why use it?**

* Prevents overloading failing systems
* Increases success rate of retries

---

## 9. What is Node.js internally built on?

**Answer:**

* V8 engine → executes JavaScript
* libuv → handles async I/O and event loop
* C++ bindings → interact with OS

**Better definition:**

> Node.js is a JavaScript runtime with an event-driven, non-blocking I/O model built on top of C++ and OS primitives.

---

## 10. What is libuv?

**Answer:**
libuv is a C library that provides:

* Event loop
* Async I/O handling
* Thread pool for blocking operations

---

## 11. Which tasks use libuv thread pool?

**Answer:**

### Uses thread pool:

* File system (fs module)
* Crypto operations
* Compression (zlib)

### Does NOT use thread pool:

* Network I/O (handled by OS async APIs)

---

## 12. Does CPU-heavy JavaScript use libuv thread pool?

**Answer:**
No.

* Runs on main thread
* Blocks event loop

**Solution:**

* Worker threads
* Separate processes

---

## 13. What is the difference between event loop and thread pool?

**Answer:**

| Component   | Role                                   |
| ----------- | -------------------------------------- |
| Event Loop  | Handles async callbacks and scheduling |
| Thread Pool | Executes blocking tasks in background  |

---

## 14. How does Node.js achieve concurrency?

**Answer:**

* Non-blocking I/O
* Event loop scheduling
* Delegation to OS and libuv
* Multiple processes for parallelism

---

## 15. What is the mental model for Node.js?

**Answer:**

* Single-threaded per process
* Event loop orchestrates tasks
* OS handles network I/O
* libuv thread pool handles blocking work
* Multiple processes = scalability

---

## 16. What is the recommended architecture for async jobs?

**Answer:**

### Small apps:

* API + worker in same process

### Production systems:

* Separate services:

  * API → pushes jobs
  * Worker → processes jobs

---

## 17. What are common mistakes?

**Answer:**

* Doing async work inside request handler
* Not using retries
* Not handling failures
* Running CPU-heavy code on main thread
* Not scaling workers

---

## 18. Simple mental analogy

**Answer:**

* API = receptionist
* Queue = task list
* Worker = employee
* Event loop = coordinator
* Thread pool = helper staff

---

## Final Takeaway

> Node.js is single-threaded, but backend systems built with it are **multi-process and highly concurrent** using async I/O, queues, and workers.

```

---

If you want, I can also:
- turn this into **flashcards**
- or add **real interview questions (FAANG-style)** based on this topic
```
