# Task Manager (React + Vite + shadcn/ui)

A small task manager built for the class challenge. You can add, search, filter, edit, complete and delete tasks. Tasks are saved in the browser (localStorage).

## Run it

```bash
npm install
npm run dev
```

## How this project was set up (from scratch)

```bash
npm create vite@latest task-manager -- --template react
cd task-manager
npm install
npm install tailwindcss @tailwindcss/vite     # Tailwind CSS v4
npx shadcn@latest init                        # shadcn/ui
npx shadcn@latest add button card input label textarea badge checkbox
npm install react-router-dom                  # for useNavigate
```

Config pieces: `vite.config.js` (Tailwind plugin + `@` alias), `jsconfig.json` (alias for editor), `components.json` (shadcn config), `src/index.css` (Tailwind import + theme colors).

## Pages

| Route        | File                     | What it does                                  |
|--------------|--------------------------|-----------------------------------------------|
| `/`          | `src/pages/Home.jsx`     | Task list, search, filter, check, delete      |
| `/new`       | `src/pages/NewTask.jsx`  | Form to create a task                         |
| `/task/:id`  | `src/pages/TaskDetail.jsx` | View, edit, complete, delete one task       |
| `*`          | `src/pages/NotFound.jsx` | 404 page                                      |

## React Hooks used (explain this part to sir)

### useState
- `App.jsx`: `tasks` array, the single source of truth for the whole app.
- `Home.jsx`: `filter` (all/active/done) and `query` (search text).
- `NewTask.jsx`: `title`, `description`, `priority`, `error` for the form.
- `TaskDetail.jsx`: `isEditing` and the draft `title` / `description`.

### useEffect
- `App.jsx`: saves `tasks` to localStorage whenever `tasks` changes (dependency `[tasks]`).
- `Home.jsx`: updates `document.title` with the pending count, e.g. "(3) Task Manager".
- `NewTask.jsx`: clears the validation error when the user starts typing.
- `TaskDetail.jsx`: redirects to `/` if the task doesn't exist, and sets the tab title.

### useNavigate
- `Home.jsx`: clicking a card goes to `/task/:id`; the empty-state button goes to `/new`.
- `NewTask.jsx`: after saving, `navigate("/")`; Cancel uses `navigate(-1)`.
- `TaskDetail.jsx`: Back uses `navigate(-1)`; after delete, `navigate("/")`; missing task redirects with `{ replace: true }`.
- `NotFound.jsx`: "Go home" button.

## shadcn/ui components used

`Button`, `Card` (+ Header/Title/Description/Content/Footer), `Input`, `Textarea`, `Label`, `Badge`, `Checkbox`. They live in `src/components/ui/` and are plain files you own and can edit. Button variants (`default`, `outline`, `destructive`, `ghost`) come from `class-variance-authority`, and the `cn()` helper in `src/lib/utils.js` merges Tailwind classes.

## Push to GitHub

```bash
git init
git add .
git commit -m "Task manager with React, Vite and shadcn/ui"
git branch -M main
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
```

(Create the empty repo on github.com first.)
