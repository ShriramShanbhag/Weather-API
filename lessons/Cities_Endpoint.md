# Backend Engineering Interview Q&A: City Search Implementation

This document summarizes the architectural decisions, challenges, and optimizations encountered while building a high-performance City Search API using NestJS and PostgreSQL.

---

### 1. Data Management & Scaling

**Q: How do you handle a large (25MB+) JSON dataset in a Node.js backend?**
**A:** There are two main approaches. 
1. **In-Memory:** Load and parse on startup. Fast but increases RAM footprint (25MB JSON can become 150MB+ in V8 heap) and doesn't scale well with multiple server instances.
2. **Persistent Database (Recommended):** Ingest the data into a database like PostgreSQL or SQLite. This keeps the Node.js memory footprint low and allows for powerful indexing and querying.

**Q: When seeding 100,000+ records, why use Batching instead of a single insert?**
**A:** Two reasons:
1. **Database Limits:** PostgreSQL has a hard limit of **65,535 parameters** per query. If an entity has 10 columns, you can't insert more than ~6,500 rows at once.
2. **Network/Memory:** Large payloads can exceed network packet sizes or cause memory spikes in the Node.js process. Batching (e.g., 1000 rows at a time) is the "sweet spot" for performance and safety.

---

### 2. TypeORM & Database Architecture

**Q: What is the difference between `synchronize: true` and manual migrations?**
**A:** `synchronize` is for rapid prototyping; it auto-modifies your DB to match your code. It is **dangerous** for production because it can accidentally drop columns or tables. Manual migrations are version-controlled SQL scripts that provide a safe, predictable, and reversible way to update database schemas across team environments.

**Q: Why do we need an `ormconfig.ts` or `DataSource` file even if migrations are already generated?**
**A:** Migration files contain the *instructions* (the SQL), but they don't contain the *address* (credentials). The `DataSource` configuration provides the host, username, and password needed to actually connect to the database and execute those instructions.

**Q: Explain the difference between `repository.save()` and `repository.insert()`.**
**A:** 
- `save()` is an **Upsert**. It checks if a record exists first (performs a SELECT), then decides to UPDATE or INSERT. It also triggers lifecycle hooks. It is slower but safer.
- `insert()` is a **Raw Insert**. It blindly fires an INSERT SQL command. It's much faster but will fail if there is a primary key conflict. It is ideal for high-performance bulk seeding.

---

### 3. NestJS Architecture

**Q: Explain Dependency Injection (DI) in the context of a NestJS Service.**
**A:** DI is a design pattern where a class requests its dependencies (like a Repository) from an external system (the NestJS IoC Container) rather than creating them itself. This makes code modular, testable, and allows NestJS to manage Singletons efficiently.

**Q: What is the purpose of `exports` in a NestJS Module?**
**A:** Modules create encapsulation boundaries. By default, everything inside a module is private. `exports` is used to "poke a hole" in that boundary, making specific providers (like a `CityService`) available to any other module that imports it.

---

### 4. Performance & Search Optimization

**Q: How does a B-Tree Index improve search performance?**
**A:** Without an index, the DB performs a "Full Table Scan" (O(N)), checking every row. An index creates a sorted side-structure (O(log N)) that allows the database to perform a binary search, jumping directly to the relevant data.

**Q: What is the performance difference between `Like('query%')` and `Like('%query%')`?**
**A:** 
- `query%` (Starts With) can utilize a B-Tree index, making it extremely fast.
- `%query%` (Contains) cannot use a standard index because the starting character is unknown, forcing a slow Full Table Scan.

---

### 5. API Security & Pagination

**Q: Why should you always cap the `limit` parameter in a pagination API?**
**A:** To prevent **Resource Exhaustion**. Without a cap, a user could request `?limit=1000000`, forcing the server to fetch and stringify a massive amount of data, likely causing an Out of Memory (OOM) crash.

**Q: What is the tradeoff between Offset Pagination and Cursor Pagination?**
**A:** 
- **Offset (`limit`/`skip`):** Easy to implement and allows jumping to specific pages (e.g., "Page 5"). However, it gets slower on deep pages because the DB still has to scan past the skipped rows.
- **Cursor (`after_id`):** Constant performance (O(1)) regardless of depth and handles real-time data better (no skipped/duplicate items). However, it does not allow jumping to a specific page number.
