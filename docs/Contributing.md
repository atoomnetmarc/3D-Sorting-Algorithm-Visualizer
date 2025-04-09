# Contributing Guidelines

---

## Coding Standards

- **Modular structure:** Separate files for HTML (`index.html`), CSS (`style.css`), and JavaScript (`app.js`)
- **Modern JavaScript:** Use ES modules with `import` statements and `async/await`
- **Asynchronous generators:** Sorting algorithms yield steps for smooth visualization
- **Separation of concerns:** UI, rendering, and sorting logic are clearly separated
- **Consistent formatting:** 2-space indentation, descriptive variable names, comments where necessary
- **Responsive design:** UI overlays the canvas without interfering with interaction
- **Modular algorithm files:** Each sorting algorithm in its own file inside `algorithm/`

---

## SOLID Principles

- **Single Responsibility Principle:** Each module/class should have one reason to change
- **Open/Closed Principle:** Software entities should be open for extension, closed for modification
- **Liskov Substitution Principle:** Subtypes must be substitutable for their base types
- **Interface Segregation Principle:** Favor small, specific interfaces over large, general ones
- **Dependency Inversion Principle:** High-level modules should not depend on low-level modules; both depend on abstractions

---

## Importance of Maintainable Code

Writing maintainable code ensures the project can be easily understood, extended, and debugged by current and future developers. It:

- Reduces technical debt
- Facilitates collaboration
- Allows smooth evolution as features are added or requirements change
- Leads to more robust, scalable, and long-lasting software

---

## Contribution Process

1. Fork the repository
2. Create a new branch for your feature or fix
3. Write clear, well-documented code following the standards above
4. Test your changes thoroughly
5. Submit a pull request with a clear description of your changes