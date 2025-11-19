# List of AI Prompts I used

This document contains practical recent prompts for myself when AI assistants, though its not everything.


## Prompt 1: Improving the AnimeCard Component
**Context**: i have an `@/src/features/anime/components/AnimeCard.tsx` component that displays basic anime information. I want to make it more interactive and visually appealing while keeping it clean and reusable. however do not overengineer and keep single responsibility principle (SRP)
also follow the existing shadcn/ui patterns in the project

## Prompt 2: Enhancing the SearchBar Component with Advanced Features
**Context**: My SearchBar component already solid loading and debouncing implemented. however i need to enhance my existing @/src/features/anime/components/SearchBar.tsx component with these enhancements: 

- add small loading states with spinners
- clear and submit buttons with accessibility
- Redux state management with local state sync
- Form submission handling

## Prompt 3: Creating an Empty State Component
**Context**: When no search results are found, users just see a blank area. I need a helpful empty state we can a simple @/src/features/anime/components/EmptyState.tsx` that cover EmptyState component for when no anime search results are found

## Prompt 6: Adding Smooth Page Transitions
Help me add smooth page transitions to improve user experience between @/src/App.tsx @/src/features/anime/pages/SearchPage.tsx and @/src/features/anime/pages/DetailPage.tsx
Current setup:
- React Router for navigation
- Search page at `/`
- Detail page at `/anime/:id`


## Prompt 7: Revise prompt
according to AI Engineering book take aways are below when create a prompt
```
Excellent! This is gold for crafting your Claude Code prompt. Here are the **key takeaways** organized by priority:

---

## 🎯 Critical Takeaways (Must Apply)

### 1. **Prompt Anatomy = 4 Components**
Your prompt should have:
- ✅ **Task Description** (role/persona + output format) → Goes FIRST
- ✅ **The Task** (concrete question/request)
- ✅ **Examples** (few-shot learning when needed)
- ✅ **Context** (requirements, APIs, standards) → Put at BEGINNING or END

**For your project:**
```
[TASK DESCRIPTION - System role]
You are an expert React engineer following clean code principles.

[CONTEXT - At beginning]
Tech stack: React 19, TypeScript, Redux Toolkit, Jikan API v4
Clean code rules: [reference your document]

[THE TASK]
Build an Anime Search App with [specific requirements]

[EXAMPLES - if needed]
// Show example of good vs bad component structure
```

### 2. **Position Matters (Needle in Haystack)**
> "Models prioritize information at the **BEGINNING and END** of the prompt"

**Action:** Put your most critical requirements at:
- 🔝 **Start:** Tech stack, must-use tools (Redux, TypeScript, port 4000)
- 🔚 **End:** Critical reminders (no class components, implement debouncing)

### 3. **Be EXPLICIT About Output Format**
> "Specify what the **keys** should be... use **markers** to mark the end"

**For Claude Code:**
```
## Implementation Plan
1. Set up routing structure
2. Create Redux slice for anime state
...

## File Structure
Provide exact folder structure with:
src/
  features/
    anime/
      components/
      ...
```

---

## 🔧 Techniques to Use

### 4. **Adopt a Persona**
> "Ask the model to adopt a persona (e.g., expert software architect)"

**For your prompt:**
```
You are a senior React engineer with expertise in:
- Clean code principles and SOLID design
- Redux Toolkit and modern React patterns
- TypeScript best practices
- API integration with proper error handling
```

### 5. **Chain-of-Thought (CoT) Prompting**
> "Ask it to **'think step by step'** or **'explain your decision'**"

**Apply it:**
```
Before implementing, please:
1. Analyze the requirements
2. Plan the component structure
3. Identify potential issues (race conditions, rate limits)
4. Then proceed with implementation
```

### 6. **Break Down Complex Tasks (Decomposition)**
> "Decompose the task into simpler, chained subtasks"

**For your app:**
Instead of: "Build the entire app"

Use:
```
Step 1: Set up project structure with Redux
Step 2: Implement search page with debouncing
Step 3: Add request cancellation
Step 4: Build detail page
Step 5: Add error handling
```

### 7. **Few-Shot Examples** (When Needed)
> "Examples reduce ambiguity about desired output"

**For code quality:**
```
Example of GOOD component naming:
✅ AnimeCard, SearchResults, fetchAnimeList

Example of BAD component naming:
❌ AnimeManager, ProcessAnime, getStuff
```

---

## ⚠️ Anti-Patterns to AVOID

### 8. **Template Errors Kill Performance**
> "Even small errors, like an extra new line, can change model behavior"

**Action:** Keep your prompt clean:
- No extra newlines
- Consistent formatting
- Clear section breaks

### 9. **Don't Be Vague**
> "Avoid vague instructions where the model has to guess the intent"

**Bad:**
```
Make it good and follow best practices
```

**Good:**
```
Functions must:
- Do ONE thing only
- Have descriptive verb phrase names
- Keep indentation to 1-2 levels max
- Use const/let, never var
```

### 10. **Separate Prompts from Code**
> "Store them in a `prompts.py` file... enhances readability, facilitates reusability"

**Action:** Keep your CLAUDE.md file clean and separate from implementation

---

## 📊 Practical Optimization

### 11. **Token Efficiency Matters**
> "Opt for formats that minimize token usage"

**Example:**
```
Concise: chickpea --> edible
Verbose: Input: chickpea, Output: edible
```

**For your requirements:**
```
✅ "Port 4000, Redux required, no class components"
❌ "The development server should be configured to run on port 4000. You must use Redux Toolkit for state management. Do not create class components; only use functional components with hooks."
```

### 12. **Version and Track Prompts**
> "Version your prompts and use an experiment tracking tool"

**Action:** When iterating your CLAUDE.md:
```
v1: Initial requirements
v2: Added Jikan API details
v3: Added clean code principles
```

---

## 🎯 Synthesized Best Practice for YOUR Project

Based on these takeaways, here's how to structure your Claude Code prompt:

```markdown
# [1. PERSONA - First]
You are a senior React engineer specializing in clean code and modern React patterns.

# [2. CRITICAL CONTEXT - Beginning]
## Tech Stack (REQUIRED)
- React 19 + TypeScript (hooks only)
- Redux Toolkit (required)
- Vite (port 4000)
- Jikan API v4

## Must Follow
- Single responsibility functions
- Verb phrases for functions, noun phrases for components
- 250ms debouncing + request cancellation
- No `var`, no `null` returns, no class components

# [3. THE TASK]
Build an Anime Search App with:

## Page 1: Search
[specific requirements]

## Page 2: Detail
[specific requirements]

# [4. IMPLEMENTATION APPROACH - CoT]
Before coding, please:
1. Analyze requirements and identify challenges
2. Plan Redux slice structure
3. Design component hierarchy
4. Then implement step-by-step

# [5. FILE STRUCTURE - Clear Format]
src/
  features/
    anime/
      components/
      [exact structure]

# [6. EXAMPLES - Few-Shot]
✅ Good: fetchAnimeList, AnimeCard
❌ Bad: getStuff, Manager

# [7. CRITICAL REMINDERS - End Position]
- Cancel in-flight requests
- Implement 250ms debounce
- Port 4000 (required)
- No environment variables
```

---

## 💡 Top 5 Actionable Items for Your Prompt

1. **Put tech stack at the TOP** (position bias)
2. **Use explicit format specifications** ("Generate file structure as markdown tree")
3. **Add CoT instruction** ("Plan before implementing")
4. **Include bad/good examples** (few-shot for code quality)
5. **End with critical constraints** (port 4000, debouncing, cancellation)

---

## 🚀 Updated Priority Actions

Based on this analysis, you should:

1. ✅ **Revise your CLAUDE.md** to follow the 4-component structure
2. ✅ **Move critical requirements to top AND bottom** (position bias)
3. ✅ **Add explicit CoT instruction** ("Analyze requirements before coding")
4. ✅ **Include few-shot examples** (good vs bad component names)
5. ✅ **Be more explicit about output format** ("Create files in this structure: ...")

---
```
so i would like you to **revise my CLAUDE.md file** based on these prompt engineering principles. you can restructure it to follow the optimal anatomy and leverage position bias