export interface HelpArticle {
  id: string;
  title: string;
  content: string;
  category: 'getting-started' | 'tasks' | 'settings' | 'troubleshooting';
}

export const helpArticles: HelpArticle[] = [
  {
    id: 'getting-started',
    title: 'Getting Started with TaskML',
    content: 'Learn how to set up your account and create your first task...',
    category: 'getting-started'
  },
  {
    id: 'create-task',
    title: 'How to Create and Manage Tasks',
    content: 'Step-by-step guide to creating and organizing your tasks...',
    category: 'tasks'
  },
  {
    id: 'notifications',
    title: 'Configuring Notifications',
    content: 'Learn how to customize your notification preferences...',
    category: 'settings'
  }
];

export const faqs = [
  {
    question: 'How do I reset my password?',
    answer: 'You can reset your password by clicking the "Forgot Password" link on the login page...'
  },
  {
    question: 'Can I share tasks with my team?',
    answer: 'Yes! You can share tasks by assigning them to team members...'
  },
  {
    question: 'How do I export my task data?',
    answer: 'To export your task data, go to Settings > Account > Export Data...'
  }
];