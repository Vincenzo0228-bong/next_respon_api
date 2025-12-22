# Posts Application

A front-end application built with Next.js, Redux Toolkit, RTK Query, React Hook Form, and TypeScript.

## Features

### Home Page (`/posts`)
- **Post List**: Displays posts with title and brief description
- **Search Functionality**: Search posts by title using `?title_like=` query parameter
- **Pagination**: 
  - Shows 10 posts per page
  - Displays maximum 10 page numbers in pagination
  - Active page is highlighted
  - Previous/Next buttons for navigation
- **URL State Persistence**: Search query and page number are saved in URL and restored on page refresh
- **Click to Navigate**: Click on any post title to view its details and comments

### Post Comments Page (`/posts/[id]`)
- **Post Details**: Shows full post title and body
- **Comments List**: Displays all comments for the post with:
  - Comment title (name)
  - Comment body
  - Author's email
- **Back Navigation**: Link to return to the posts list

## Technology Stack

- **Next.js 16** - React framework with App Router
- **Redux Toolkit** - State management
- **RTK Query** - Data fetching and caching
- **React Hook Form** - Form handling for search
- **TypeScript** - Type safety
- **SCSS Modules** - Component-scoped styling
- **JSONPlaceholder API** - Mock API for posts and comments

## Project Structure

```
src/
├── app/
│   ├── posts/
│   │   ├── page.tsx              # Home page with posts list
│   │   ├── posts.module.scss     # Styles for posts page
│   │   └── [id]/
│   │       ├── page.tsx          # Post details and comments page
│   │       └── post.module.scss # Styles for post page
│   ├── providers.tsx             # Redux Provider wrapper
│   └── layout.tsx                # Root layout with Providers
├── components/
│   ├── PostCard.tsx              # Post card component
│   ├── PostCard.module.scss
│   ├── CommentCard.tsx           # Comment card component
│   ├── CommentCard.module.scss
│   ├── SearchForm.tsx            # Search form component
│   ├── SearchForm.module.scss
│   ├── Pagination.tsx            # Pagination component
│   └── Pagination.module.scss
└── store/
    ├── api.ts                    # RTK Query API slice
    ├── store.ts                  # Redux store configuration
    └── hooks.ts                  # Typed Redux hooks
```

## Usage

1. Navigate to `/posts` to see the posts list
2. Use the search field to filter posts by title
3. Click on pagination numbers to navigate between pages
4. Click on any post title to view its details and comments
5. Use the "Back to Posts" link to return to the list

## API Endpoints Used

- `GET /posts` - Get all posts (with pagination and search)
- `GET /posts/:id` - Get a specific post
- `GET /posts/:id/comments` - Get comments for a post

## Features Implemented

✅ Component-based architecture  
✅ SCSS modules for styling  
✅ No UI libraries (custom components)  
✅ Redux Toolkit + RTK Query  
✅ TypeScript throughout  
✅ React Hook Form for search  
✅ URL state persistence  
✅ API-side search and pagination  
✅ Responsive design  
✅ Loading and error states  

