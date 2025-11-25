# CLAUDE.md - AI Assistant Guide for backToStudyTrack

**Last Updated:** 2025-11-25

## Project Overview

**backToStudyTrack (自學重啟系列)** is a full-stack learning portfolio application built to document web development studies, experiments with UI plugins, frameworks, and backend development practice. This is primarily a learning/practice repository, not production code.

**Primary Purpose:**
- Document learning progress with web development
- Experiment with Vue/Nuxt plugins and animations
- Practice backend development patterns (Node.js, Express, MongoDB)
- Maintain a portfolio of technical demos and articles

**Language:** Interface and commit messages use Traditional Chinese (繁體中文)

---

## Technology Stack

### Frontend
- **Framework:** Nuxt 3 (v3.17.1) + Vue 3 (v3.5.13)
- **Rendering:** Client-side only (SSR disabled)
- **Styling:** Tailwind CSS (v3.4.17), SCSS/Sass
- **TypeScript:** v5.8.3 with strict type checking
- **Animation:** GSAP (v3.13.0), vue-fullpage.js (v0.2.21)
- **Components:** nuxt-swiper (v2.0.1)
- **Build:** Vite (via Nuxt), vue-tsc

### Backend
- **Runtime:** Node.js with ES Modules
- **Framework:** Express (v5.1.0)
- **Database:** MongoDB via Mongoose (v8.19.2)
- **Middleware:** CORS, body-parser, formidable

### Development Tools
- **Linting:** ESLint (v8.57.1) with @nuxtjs/eslint-config-typescript
- **Formatting:** Prettier (v3.5.3) with prettier-plugin-tailwindcss
- **Editor:** VS Code (configured)

---

## Directory Structure

```
backToStudyTrack/
├── .claude/                    # Claude AI configuration
├── .vscode/                    # VS Code settings (formatter, linter)
├── articles/                   # Article metadata and content definitions
│   ├── index.ts               # Central exports
│   └── plugins/               # Plugin-specific articles (nuxt-swiper, gsap, etc.)
├── backend/                    # Backend code (separate from Nuxt)
│   └── nodejs/                # Node.js practice exercises
│       ├── *.js               # Individual exercises (date-named)
│       └── todoList/          # MVC practice iterations
│           └── mvc-MMDD/      # Date-versioned MVC implementations
│               ├── app.js
│               ├── bin/www
│               ├── connections/    # DB setup
│               ├── controllers/    # Business logic
│               ├── model/          # Mongoose models
│               ├── routers/        # Route definitions
│               └── service/        # Response handlers
├── components/                 # Vue components
│   ├── Articles.vue, Breadcrumb.vue, Header.vue, MainMenu.vue
│   └── plugins/               # Plugin demo components
│       └── [plugin-name]/
│           └── [YYYY-MMDD-HHMM]/index.vue  # Date-stamped demos
├── composables/                # Vue composables (shared logic)
│   ├── useArticle.ts          # Article fetching & component loading
│   ├── useFullPage.ts         # Full-screen mode
│   └── useGsap.ts             # GSAP utilities
├── layouts/                    # Nuxt layouts
│   └── default.vue            # Default layout with header/breadcrumb
├── menuList/                   # Menu structure definitions
│   ├── pageMenu/              # Top-level menu
│   └── lv1Menu/               # Category-level menus
├── pages/                      # Nuxt pages (file-based routing)
│   ├── index.vue              # Homepage
│   └── [lv1]/[name]/[notionCardId]/index.vue  # 3-level routing
├── plugins/                    # Nuxt plugins
│   └── fullPage.ts
├── public/                     # Static assets
├── server/                     # Nuxt server directory
├── types/                      # TypeScript type definitions
│   ├── index.ts               # Core types (Article, MenuList)
│   ├── composables.ts
│   └── *.d.ts                 # Third-party declarations
├── utils/                      # Utility functions
│   └── index.ts               # debounce, etc.
├── nuxt.config.ts             # Nuxt configuration
├── package.json               # Dependencies
├── tailwind.config.js         # Tailwind config
└── tsconfig.json              # TypeScript config
```

---

## Critical Conventions

### Naming Conventions

| Type | Convention | Example |
|------|-----------|---------|
| Components | PascalCase | `MainMenu.vue`, `Breadcrumb.vue` |
| Composables | camelCase with `use` prefix | `useArticle.ts`, `useFullPage.ts` |
| Types/Interfaces | PascalCase | `Article`, `MenuList`, `UseArticle` |
| Backend Models | camelCase + `Model` suffix | `todoListModel.js`, `userModel.js` |
| Backend Controllers | camelCase + `Controller` suffix | `todoListController`, `httpController` |
| Services | camelCase + `Handler` suffix | `successHandler`, `errorHandler` |
| Plugin Demos | Date-stamped | `components/plugins/gsap/2025-0522-2330/` |
| Backend Iterations | Date-versioned | `backend/nodejs/todoList/mvc-1124/` |

### File Organization

**Plugin Demonstrations:**
```
components/plugins/[plugin-name]/[YYYY-MMDD-HHMM]/index.vue
```
- Each demo gets its own dated directory
- Supports multiple versions of the same plugin experiment
- Automatically discovered via glob imports

**Articles Structure:**
```
articles/plugins/[plugin-name]/index.ts
```
- Tight coupling between `menuList/` and `articles/`
- Each article has: title, notionCardId, notionPath
- Dynamic component loaded based on notionCardId

**Backend MVC Pattern:**
```
backend/nodejs/todoList/mvc-MMDD/
  ├── app.js              # Express app setup
  ├── bin/www             # Server startup
  ├── connections/        # Database connection
  ├── controllers/        # Business logic
  ├── model/              # Mongoose schemas
  ├── routers/            # Route definitions
  └── service/            # Success/error handlers
```

---

## Code Style and Quality

### ESLint Rules
- Single quotes for strings
- 2-space indentation
- No `var` keyword (use `const`/`let`)
- Explicit function return types (TypeScript)
- No unused variables (warning)
- Strict equality (`===`)

### Prettier Configuration
- Double quotes (overrides ESLint for consistency)
- Tab width: 2 spaces
- Trailing comma: ES5
- Print width: 80 characters
- Arrow parens: always
- End of line: LF

### TypeScript Standards
1. **Explicit Return Types Required** - All functions must declare return types
2. **Type Imports** - Use `import type` for type-only imports
3. **Generic Usage** - Extensive use of `Ref<T>` for reactive references
4. **Interface Definitions** - All data structures must be typed

### Vue/Nuxt Patterns
1. **Script Setup** - All components use `<script setup lang="ts">`
2. **Composables Pattern** - Extract business logic to composables
3. **Dynamic Components** - Use `defineAsyncComponent` + `shallowRef`
4. **Auto Imports** - Leverage Nuxt auto-imports
5. **File-Based Routing** - Follow Nuxt conventions for pages

### Styling Patterns
1. **Utility-First** - Tailwind classes in templates
2. **@apply Directive** - Use in scoped SCSS for reusable patterns
3. **Scoped Styles** - All component styles are scoped
4. **Deep Selectors** - `:deep()` for styling child components
5. **Part Selectors** - `::part()` for Web Component styling (Swiper)

---

## Key Architectural Patterns

### 1. Dynamic Component Loading

The app uses glob imports for automatic component discovery:

```typescript
// In useArticle.ts
const modules = import.meta.glob('@/components/*/*/*/index.vue')

const getCurrentDynamicComponent = (): void => {
  const matchedPath = Object.keys(modules).find(path =>
    path.includes(`/${article.value?.notionCardId}/index.vue`)
  )
  if (matchedPath) {
    article.value.component = shallowRef(
      defineAsyncComponent(modules[matchedPath])
    )
  }
}
```

**Benefits:**
- Automatic component discovery
- Code splitting per article
- No manual registration needed

### 2. Notion Integration

Articles link to Notion for detailed content:

```typescript
interface Article {
  title: string;
  notionCardId: string;  // Date-based ID: "2025-0519-2030"
  notionPath: string;    // Notion page URL
  component?: Component; // Dynamically loaded demo
}
```

### 3. Three-Level Routing

```
/[lv1]/[name]/[notionCardId]
```

Example: `/plugins/nuxt-swiper/2025-0519-2030`

- **lv1:** Category (plugins, htmlCss, etc.)
- **name:** Subcategory (nuxt-swiper, gsap, etc.)
- **notionCardId:** Article identifier (date-time stamp)

### 4. MVC Backend Pattern (Latest: mvc-1124)

```
Request → Router → Controller → Model/Database
                 ↓
              Service (success/error handlers)
```

**API Response Format:**
```json
{
  "status": "success" | "error",
  "statusCode": 200,
  "message": "操作成功",
  "data": {...}
}
```

### 5. State Management

- **No Vuex/Pinia** - Uses composables with module-level state
- Reactive state shared across components
- Example: `isFullScreen` in `useFullPage`

---

## Common Development Tasks

### Adding a New Plugin Demonstration

1. **Create article metadata:**
   ```typescript
   // articles/plugins/[plugin-name]/index.ts
   import type { Article } from '@/types'

   export const newPluginArticles: Article[] = [
     {
       title: 'Plugin Demo',
       notionCardId: '2025-MMDD-HHMM',
       notionPath: 'notion-page-id'
     }
   ]
   ```

2. **Create demo component:**
   ```
   components/plugins/[plugin-name]/[2025-MMDD-HHMM]/index.vue
   ```

3. **Add menu item:**
   ```typescript
   // menuList/lv1Menu/plugins/index.ts
   import { newPluginArticles } from '@/articles/plugins/[plugin-name]'

   export const pluginMenuList: MenuList[] = [
     {
       name: '[plugin-name]',
       articles: newPluginArticles,
       articleLength: getMenuArticleLength(newPluginArticles)
     }
   ]
   ```

4. **Component auto-loads** via glob import pattern

### Running the Frontend

```bash
npm install          # Install dependencies
npm run dev          # Start dev server (http://localhost:3000)
npm run build        # Build for production
npm run preview      # Preview production build
```

### Running Backend Exercises

```bash
cd backend/nodejs/todoList/mvc-1124
node bin/www         # Start server on port 8000
```

**MongoDB Required:** `mongodb://127.0.0.1:27017`

### Creating a New Backend Iteration

1. **Create dated folder:**
   ```bash
   mkdir backend/nodejs/todoList/mvc-MMDD
   ```

2. **Copy MVC structure:**
   ```
   mvc-MMDD/
     ├── app.js
     ├── bin/www
     ├── connections/index.js
     ├── controllers/
     ├── model/
     ├── routers/
     └── service/
   ```

3. **Follow established patterns:**
   - Mongoose schemas with timestamps
   - Success/error handler services
   - RESTful API routes
   - CORS middleware

---

## Database Schema (mvc-1124)

### TodoList Model

```javascript
{
  title: String (required),
  isDone: Boolean (default: false),
  user: ObjectId (ref: "user", required),
  createdAt: Date,   // auto-generated
  updatedAt: Date    // auto-generated
}
```

### User Model

```javascript
{
  username: String (required, unique),
  age: Number (min: 0),
  email: String (required, unique),
  address: String (required),
  password: String (required),
  createdAt: Date,   // auto-generated
  updatedAt: Date    // auto-generated
}
```

**Configuration:**
- `versionKey: false` - No `__v` field
- `timestamps: true` - Auto createdAt/updatedAt
- Relationships: One User → Many TodoLists

---

## API Reference (mvc-1124)

**Base URL:** `http://localhost:8000/todoList/api/v1`

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/todos` | Get all todos (with user population) |
| GET | `/todo/:id` | Get single todo by ID |
| POST | `/todos` | Create multiple todos (batch) |
| POST | `/todo` | Create single todo |
| DELETE | `/todos` | Delete all todos |
| DELETE | `/todo/:id` | Delete single todo by ID |
| PATCH | `/todos` | Update multiple todos (bulk write) |
| PATCH | `/todo/:id` | Update single todo by ID |

### CORS Configuration
- Origin: `*`
- Methods: GET, POST, PUT, DELETE
- Content-Type: `application/json`

---

## Git Workflow

### Commit Message Pattern

```
YYYY-MMDD area: description
```

**Examples:**
- `2025-1124 nodejs: todoList/populate 引用式資料`
- `2025-1118 nodejs: todoList/mvc-kata練習-6: mvc`
- `2025-0522 plugins: gsap/flip animation practice`

**Guidelines:**
- Use Traditional Chinese for descriptions
- Date format: YYYY-MMDD
- Area prefix: nodejs, plugins, frontend, etc.
- Clear, descriptive messages

### Branching

Current branch: `claude/claude-md-midzl5jyqw4xn8h1-01CQvkX6kd4pDxaDrZGCg1YYV`

- Feature branches: `claude/[feature]-[session-id]`
- Always push to designated branch
- Create branch locally if it doesn't exist

---

## Important Notes for AI Assistants

### DO's ✅

1. **Follow date-based naming** for plugin demos and backend iterations
2. **Maintain TypeScript strictness** - explicit return types always
3. **Use Traditional Chinese** for UI text and commit messages
4. **Respect the three-level routing** structure for pages
5. **Keep backend separate** - don't integrate Express into Nuxt server
6. **Use composables** for shared logic (not Vuex/Pinia)
7. **Test MongoDB connection** at `mongodb://127.0.0.1:27017`
8. **Follow MVC pattern** for backend code
9. **Use Tailwind utilities** for styling
10. **Leverage auto-imports** for components and composables

### DON'Ts ❌

1. **Don't create production-level optimizations** - this is a learning repo
2. **Don't refactor existing iterations** - they're historical practice
3. **Don't add English translations** - keep Chinese UI text
4. **Don't integrate backend with Nuxt server** - stay separate
5. **Don't use Vuex/Pinia** - use composables instead
6. **Don't skip TypeScript types** - all functions need return types
7. **Don't commit images** - they're gitignored
8. **Don't use `var`** - use `const` or `let`
9. **Don't skip ESLint rules** - follow configured standards
10. **Don't merge old MVC iterations** - keep them separate for comparison

### Special Considerations

1. **Learning Focus:** This is practice code, not production. Accept iterative approaches and multiple versions of similar code.

2. **Iterative MVC Pattern:** The `backend/nodejs/todoList/` directory contains multiple dated versions (mvc-1106, mvc-1110, etc.). Each is a complete iteration for learning purposes. Don't consolidate them.

3. **Notion Integration:** Articles link to external Notion pages. Don't create full article content in the repo - just metadata.

4. **Image Assets:** All images are gitignored. When discussing images, assume they exist locally but aren't committed.

5. **MongoDB Dependency:** Backend exercises require a running MongoDB instance. Remind users if commands will fail without it.

6. **Client-Side Only:** The Nuxt app has SSR disabled. Don't suggest server-side features.

7. **Auto-Discovery Pattern:** Components and articles are discovered via glob imports. Adding files in the correct pattern auto-registers them.

8. **Responsive to Date-Time:** File and folder naming uses precise timestamps (YYYY-MMDD-HHMM). Maintain this precision.

---

## Configuration Files Quick Reference

### nuxt.config.ts
```typescript
export default defineNuxtConfig({
  ssr: false,                    // Client-side only
  typescript: { typeCheck: true }, // Strict checking
  modules: ['@nuxtjs/tailwindcss', 'nuxt-swiper']
})
```

### .vscode/settings.json
- Format on save/paste: enabled
- Prettier as default formatter
- 2-space tabs, LF line endings
- Excludes: node_modules, .nuxt, .output, dist

### .eslintrc.cjs
- Extends: @nuxtjs/eslint-config-typescript
- Quotes: single (but Prettier uses double)
- Indent: 2 spaces
- No var, explicit return types required

---

## Useful Commands

### Frontend
```bash
npm run dev              # Dev server on :3000
npm run build            # Production build
npm run generate         # Static generation
npm run preview          # Preview build
```

### Backend (mvc-1124)
```bash
cd backend/nodejs/todoList/mvc-1124
node bin/www             # Start on :8000
```

### Linting/Formatting
```bash
npx eslint .             # Lint all files
npx prettier --write .   # Format all files
```

---

## Project Goals and Philosophy

This repository serves as:

1. **Learning Journal:** Document progress with Vue 3, Nuxt 3, TypeScript, Node.js, MongoDB
2. **Plugin Experimentation:** Test and demo various UI libraries and animation frameworks
3. **Pattern Practice:** Repeatedly practice MVC, REST API design, and modern frontend patterns
4. **Portfolio Showcase:** Maintain working demos of technical skills

**Core Philosophy:**
- Iteration over perfection
- Practice-oriented code
- Clear historical progression
- Notion as extended documentation

---

## FAQ for AI Assistants

**Q: Why are there multiple mvc-MMDD folders?**
A: Each is a complete iteration for learning purposes. Don't consolidate - they show progression.

**Q: Should I optimize the code for production?**
A: No, this is a learning repository. Keep solutions straightforward and educational.

**Q: Why is SSR disabled?**
A: Simplifies development and deployment for a personal portfolio. No server-side requirements.

**Q: Where's the article content?**
A: In Notion. The repo only contains metadata and demo components.

**Q: Can I use English for UI text?**
A: No, maintain Traditional Chinese for consistency with existing code.

**Q: Should I add tests?**
A: Not unless explicitly requested. This is practice code focused on learning fundamentals.

**Q: Why separate backend from Nuxt?**
A: Backend exercises are standalone Node.js/Express practice, separate from the Nuxt learning path.

---

## Version History

- **2025-11-25:** Initial CLAUDE.md creation
  - Comprehensive codebase analysis
  - Documentation of all major patterns
  - Git workflow and conventions
  - API reference for latest backend iteration

---

## Contact and Resources

- **Nuxt 3 Docs:** https://nuxt.com/docs
- **Vue 3 Docs:** https://vuejs.org/guide/
- **Tailwind CSS:** https://tailwindcss.com/docs
- **Mongoose:** https://mongoosejs.com/docs/guide.html
- **GSAP:** https://greensock.com/docs/

---

**Remember:** This codebase is about learning and iteration. Embrace the experimental nature, maintain the established patterns, and keep the Traditional Chinese language convention. 加油！ (Keep going!)
