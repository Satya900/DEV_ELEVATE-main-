# Task Management App

A modern, collaborative task management application built with Vue.js and Firebase, designed to help teams organize, track, and complete projects efficiently.

## Overview

This task management platform combines intuitive design with powerful features to streamline team collaboration and project management. Built with real-time synchronization and responsive design principles.

## Key Features

### Core Functionality
- **Real-time Collaboration**: Live updates across all connected users
- **Project Organization**: Hierarchical project and task structure
- **Team Management**: User roles and permissions system
- **Progress Tracking**: Visual progress indicators and analytics
- **Deadline Management**: Due date tracking with notifications
- **File Attachments**: Document and image sharing capabilities

### User Experience
- **Drag & Drop Interface**: Intuitive task management with Kanban boards
- **Dark/Light Mode**: Customizable theme preferences
- **Mobile Responsive**: Optimized for all device sizes
- **Offline Support**: Continue working without internet connection
- **Search & Filter**: Advanced task filtering and search capabilities

## Technology Stack

### Frontend Architecture
```vue
<!-- Vue 3 Composition API Example -->
<template>
  <div class="task-board">
    <div 
      v-for="column in columns" 
      :key="column.id"
      class="task-column"
      @drop="onDrop($event, column.id)"
      @dragover.prevent
    >
      <h3>{{ column.title }}</h3>
      <TaskCard
        v-for="task in column.tasks"
        :key="task.id"
        :task="task"
        @update="updateTask"
        draggable="true"
        @dragstart="onDragStart($event, task)"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useTaskStore } from '@/stores/tasks'

const taskStore = useTaskStore()
const columns = ref([])

onMounted(async () => {
  columns.value = await taskStore.fetchColumns()
})

const onDragStart = (event, task) => {
  event.dataTransfer.setData('text/plain', task.id)
}

const onDrop = async (event, columnId) => {
  const taskId = event.dataTransfer.getData('text/plain')
  await taskStore.moveTask(taskId, columnId)
}
</script>
```

### State Management with Pinia
```javascript
// stores/tasks.js
import { defineStore } from 'pinia'
import { db } from '@/firebase/config'
import { collection, onSnapshot, updateDoc, doc } from 'firebase/firestore'

export const useTaskStore = defineStore('tasks', {
  state: () => ({
    tasks: [],
    projects: [],
    loading: false
  }),

  actions: {
    async fetchTasks(projectId) {
      this.loading = true
      const tasksRef = collection(db, 'projects', projectId, 'tasks')
      
      onSnapshot(tasksRef, (snapshot) => {
        this.tasks = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        this.loading = false
      })
    },

    async updateTask(taskId, updates) {
      const taskRef = doc(db, 'tasks', taskId)
      await updateDoc(taskRef, {
        ...updates,
        updatedAt: new Date()
      })
    }
  }
})
```

### Firebase Integration
```javascript
// firebase/config.js
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  // Your Firebase configuration
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)
export const storage = getStorage(app)
```

## Real-time Features

### Live Updates
```javascript
// Real-time task updates
const setupRealtimeListeners = (projectId) => {
  const tasksRef = collection(db, 'projects', projectId, 'tasks')
  
  return onSnapshot(tasksRef, (snapshot) => {
    snapshot.docChanges().forEach((change) => {
      if (change.type === 'added') {
        addTaskToBoard(change.doc.data())
      } else if (change.type === 'modified') {
        updateTaskOnBoard(change.doc.data())
      } else if (change.type === 'removed') {
        removeTaskFromBoard(change.doc.id)
      }
    })
  })
}
```

### Collaborative Editing
```javascript
// Presence system for showing active users
const usePresence = (projectId) => {
  const activeUsers = ref([])
  
  onMounted(() => {
    const presenceRef = doc(db, 'presence', projectId)
    
    // Update user presence
    updateDoc(presenceRef, {
      [`users.${currentUser.uid}`]: {
        name: currentUser.displayName,
        lastSeen: serverTimestamp(),
        cursor: null
      }
    })
    
    // Listen for presence changes
    onSnapshot(presenceRef, (doc) => {
      activeUsers.value = Object.values(doc.data()?.users || {})
    })
  })
  
  return { activeUsers }
}
```

## UI Components

### Task Card Component
```vue
<template>
  <div 
    class="task-card"
    :class="[
      `priority-${task.priority}`,
      { 'overdue': isOverdue }
    ]"
  >
    <div class="task-header">
      <h4>{{ task.title }}</h4>
      <TaskMenu :task="task" @edit="editTask" @delete="deleteTask" />
    </div>
    
    <p class="task-description">{{ task.description }}</p>
    
    <div class="task-meta">
      <div class="assignees">
        <UserAvatar 
          v-for="user in task.assignees" 
          :key="user.id"
          :user="user"
          size="sm"
        />
      </div>
      
      <div class="task-info">
        <span v-if="task.dueDate" class="due-date">
          {{ formatDate(task.dueDate) }}
        </span>
        <TaskPriority :priority="task.priority" />
      </div>
    </div>
    
    <div v-if="task.tags.length" class="task-tags">
      <span 
        v-for="tag in task.tags" 
        :key="tag"
        class="tag"
        :style="{ backgroundColor: getTagColor(tag) }"
      >
        {{ tag }}
      </span>
    </div>
  </div>
</template>

<style scoped>
.task-card {
  @apply bg-white rounded-lg shadow-sm border p-4 mb-3 cursor-pointer;
  @apply hover:shadow-md transition-shadow duration-200;
}

.priority-high {
  @apply border-l-4 border-red-500;
}

.priority-medium {
  @apply border-l-4 border-yellow-500;
}

.priority-low {
  @apply border-l-4 border-green-500;
}

.overdue {
  @apply bg-red-50 border-red-200;
}
</style>
```

## Data Models

### Firestore Schema
```javascript
// Project document structure
{
  id: "project_id",
  name: "Project Name",
  description: "Project description",
  owner: "user_id",
  members: ["user_id_1", "user_id_2"],
  settings: {
    isPublic: false,
    allowGuests: true
  },
  createdAt: timestamp,
  updatedAt: timestamp
}

// Task document structure
{
  id: "task_id",
  title: "Task title",
  description: "Task description",
  status: "todo", // todo, in-progress, done
  priority: "medium", // low, medium, high
  assignees: ["user_id"],
  tags: ["frontend", "bug"],
  dueDate: timestamp,
  createdBy: "user_id",
  createdAt: timestamp,
  updatedAt: timestamp,
  comments: [
    {
      id: "comment_id",
      text: "Comment text",
      author: "user_id",
      createdAt: timestamp
    }
  ]
}
```

## Authentication & Security

### Firebase Auth Integration
```javascript
// auth/index.js
import { auth } from '@/firebase/config'
import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth'

export const useAuth = () => {
  const user = ref(null)
  const loading = ref(true)

  const signIn = async (email, password) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password)
      return result.user
    } catch (error) {
      throw new Error(error.message)
    }
  }

  const signUp = async (email, password, displayName) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password)
      await updateProfile(result.user, { displayName })
      return result.user
    } catch (error) {
      throw new Error(error.message)
    }
  }

  onAuthStateChanged(auth, (firebaseUser) => {
    user.value = firebaseUser
    loading.value = false
  })

  return { user, loading, signIn, signUp, signOut }
}
```

### Security Rules
```javascript
// Firestore security rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /projects/{projectId} {
      allow read, write: if request.auth != null && 
        request.auth.uid in resource.data.members;
      
      match /tasks/{taskId} {
        allow read, write: if request.auth != null && 
          request.auth.uid in get(/databases/$(database)/documents/projects/$(projectId)).data.members;
      }
    }
  }
}
```

## Performance Optimizations

### Lazy Loading
```javascript
// Lazy load components for better performance
const TaskBoard = defineAsyncComponent(() => import('@/components/TaskBoard.vue'))
const ProjectSettings = defineAsyncComponent(() => import('@/components/ProjectSettings.vue'))
```

### Virtual Scrolling
```vue
<!-- For large task lists -->
<template>
  <RecycleScroller
    class="scroller"
    :items="tasks"
    :item-size="120"
    key-field="id"
    v-slot="{ item }"
  >
    <TaskCard :task="item" />
  </RecycleScroller>
</template>
```

## Testing

### Unit Tests with Vitest
```javascript
// tests/TaskCard.test.js
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import TaskCard from '@/components/TaskCard.vue'

describe('TaskCard', () => {
  it('renders task title correctly', () => {
    const task = {
      id: '1',
      title: 'Test Task',
      description: 'Test Description',
      priority: 'medium'
    }
    
    const wrapper = mount(TaskCard, {
      props: { task }
    })
    
    expect(wrapper.text()).toContain('Test Task')
  })
})
```

## Deployment

### Build Configuration
```javascript
// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue', 'vue-router', 'pinia'],
          firebase: ['firebase/app', 'firebase/firestore', 'firebase/auth']
        }
      }
    }
  }
})
```

### Environment Configuration
```bash
# .env.production
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
```

## Future Roadmap

- **Time Tracking**: Built-in time tracking for tasks
- **Gantt Charts**: Visual project timeline management
- **API Integration**: Connect with external tools (Slack, GitHub)
- **Advanced Analytics**: Project performance insights
- **Mobile App**: Native mobile applications
- **Automation**: Workflow automation and triggers

## Contributing

We welcome contributions! Please check our contributing guidelines and feel free to submit issues and pull requests.

## License

This project is licensed under the MIT License.