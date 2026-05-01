# Backend Engineering Interview Q&A: Auth, Queues, & Best Practices

This document summarizes key concepts and architectural decisions made during the implementation of User Management, JWT Authentication, and Asynchronous Processing in the Weather API project.

---

### 1. Database & Entities

**Q: What is the standard naming convention for Entities and Tables in a backend project?**
**A:** Classes/Entities should be **singular** (e.g., `User`) because an instance represents a single row. Table names should be **plural** (e.g., `users`) as they represent a collection. Filenames should follow the class name (e.g., `user.entity.ts`).

**Q: In TypeORM, what is the difference between `repository.create()` and `repository.save()`?**
**A:** `create()` only instantiates a new entity in memory and performs basic validation. It does **not** touch the database. `save()` is what executes the SQL `INSERT` or `UPDATE` command. Using `create()` first is a best practice as it ensures entity hooks (like `@BeforeInsert`) are properly prepared.

---

### 2. Security & Authentication

**Q: Why do we use a "Salt" when hashing passwords with Bcrypt?**
**A:** A salt is a random string added to the password before hashing. It ensures that two users with the same password (e.g., "password123") have completely different hashes in the database. This prevents "Rainbow Table" attacks where attackers use pre-calculated hashes of common passwords.

**Q: Explain the flow of a JWT Strategy in NestJS/Passport.**
**A:** 
1. The **Guard** extracts the token from the request header.
2. The **Passport Strategy** verifies the signature and expiration using a secret key.
3. If valid, the `validate(payload)` method is called with the decrypted JSON.
4. The object returned by `validate()` is automatically attached to the request as `request.user` by the "black box" of Passport.

**Q: How do you handle "Public" routes when using a Global Authentication Guard?**
**A:** You use a custom **Decorator** (e.g., `@Public()`) to attach metadata to specific routes. Then, in the Guard, you use the **Reflector** to check for this metadata. If it exists, the Guard returns `true` immediately, skipping the JWT check.

---

### 3. General Best Practices

**Q: When returning a newly created User, why should you exclude the password, even if it's hashed?**
**A:** It’s a security best practice to minimize the data exposed. Returning the hash reveals the algorithm used (e.g., `$2b$` for Bcrypt) and provides a starting point for offline brute-force attacks if the response is intercepted.

**Q: How does NestJS handle "Strict Null Checking" when destructuring database results?**
**A:** If a service returns `Entity | null`, TypeScript will throw a lint error if you try to destructure it directly. You must first perform a "Null Guard" (e.g., `if (!user) throw ...`) to satisfy the compiler that the object is safe to access.
