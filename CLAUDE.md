# CLAUDE.md - AI Assistant Guide for Timeline App

> **Last Updated**: 2025-11-16
> **Repository**: jsim01/jsim01
> **Purpose**: Guide for AI assistants working on the Timeline App codebase

## Table of Contents
- [Project Overview](#project-overview)
- [Development Philosophy](#development-philosophy)
- [Codebase Structure](#codebase-structure)
- [Core Concepts](#core-concepts)
- [Development Workflows](#development-workflows)
- [Technology-Specific Guidelines](#technology-specific-guidelines)
- [AI Assistant Guidelines](#ai-assistant-guidelines)
- [Common Commands](#common-commands)
- [MVP Roadmap](#mvp-roadmap)
- [Maintaining This File](#maintaining-this-file)

---

## Project Overview

### What is Timeline App?

Timeline App is a mobile application (iOS/Android) for recording daily timeline events with a single tap. Users can:

- **Quick Event Recording**: Record "current time + location" events with one button click
- **Rich Event Data**: Add text, templates, or public transit information to events
- **Templates (Favorites)**: Manage frequently used event templates
- **Timeline Views**: View and sort daily/weekly/monthly timelines
- **Transit Integration**: Location-based or API-based public transit information
- **AI Features**: Simple AI auto-tagging and recommendations
- **Future Extensions**: Photo/voice input, widget support

### Tech Stack

**Frontend (Mobile)**:
- React Native
- Expo
- TypeScript
- Zustand (state management)
- axios (API communication)
- Jest (testing)

**Backend**:
- FastAPI
- PostgreSQL (production) / SQLite (development)
- Python 3.9+
- SQLAlchemy (ORM)

**Infrastructure**:
- Expo Application Services (EAS) for builds
- expo-location for geolocation
- React Navigation for routing

### Quick Start

```bash
# Frontend setup
npx create-expo-app@latest timeline-app
cd timeline-app
npm install

# Install required dependencies
npx expo install expo-location react-native-reanimated react-native-gesture-handler
npm install zustand axios zod

# Start development server
npx expo start

# Backend setup
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install fastapi uvicorn sqlalchemy psycopg2-binary python-dotenv

# Run backend
uvicorn main:app --reload
```

---

## Development Philosophy

### 🎯 CRITICAL: Design-First Approach

**ALWAYS follow this order:**

1. **Design** → Define data models, API specs, architecture
2. **Review** → Get approval on design
3. **Implement** → Write code only after design approval

**Never skip design phase.** Claude must present design documents before writing any code.

### Core Principles

#### 1. Data-Driven Design
- All events, templates, and transit data must be structured as JSON/database models
- Define schemas explicitly before implementation
- Use TypeScript interfaces and Python Pydantic models

#### 2. Modularity & Separation of Concerns
- **UI Layer**: React components (screens, components)
- **State Layer**: Zustand stores
- **API Layer**: Separated API clients (eventsApi, transitApi)
- **Utils**: Reusable utility functions

#### 3. Safety First
- Always show diffs before modifying files
- Never install packages without explicit approval
- Review security implications before implementing features

#### 4. Extensibility
- Public transit APIs: Use `TransitProvider` abstraction layer
- AI recommendations: Use `SuggestionEngine` interface
- Storage: Design for easy migration from local → server

---

## Codebase Structure

### Required Directory Structure

```
/project-root
  ├── app.json                      # Expo configuration
  ├── package.json
  ├── tsconfig.json
  ├── .env                          # Environment variables
  ├── .gitignore
  │
  ├── src/
  │   ├── screens/
  │   │   ├── HomeScreen.tsx        # Daily timeline view
  │   │   ├── EventDetailScreen.tsx # Event creation/editing
  │   │   ├── FavoritesScreen.tsx   # Template management
  │   │   ├── StatsScreen.tsx       # Statistics view
  │   │   └── SettingsScreen.tsx    # App settings
  │   │
  │   ├── components/
  │   │   ├── TimelineItem.tsx      # Individual timeline entry
  │   │   ├── FavoriteChip.tsx      # Template button component
  │   │   └── TransitSegment.tsx    # Transit trip display
  │   │
  │   ├── navigation/
  │   │   └── RootNavigator.tsx     # Navigation configuration
  │   │
  │   ├── store/
  │   │   ├── eventsStore.ts        # Event state management (Zustand)
  │   │   ├── favoritesStore.ts     # Template state management
  │   │   └── settingsStore.ts      # App settings state
  │   │
  │   ├── api/
  │   │   ├── eventsApi.ts          # Event CRUD operations
  │   │   ├── transitApi.ts         # Transit data fetching
  │   │   └── authApi.ts            # Authentication
  │   │
  │   ├── utils/
  │   │   ├── time.ts               # Time formatting utilities
  │   │   ├── date.ts               # Date manipulation
  │   │   ├── location.ts           # Location utilities
  │   │   └── transit.ts            # Transit data processing
  │   │
  │   ├── types/
  │   │   ├── event.ts              # Event type definitions
  │   │   ├── template.ts           # Template type definitions
  │   │   └── transit.ts            # Transit type definitions
  │   │
  │   └── config/
  │       ├── env.ts                # Environment configuration
  │       └── constants.ts          # App constants
  │
  ├── backend/
      ├── main.py                   # FastAPI entry point
      ├── models.py                 # SQLAlchemy models
      ├── database.py               # Database configuration
      ├── config.py                 # Backend configuration
      │
      ├── routers/
      │   ├── events.py             # Event endpoints
      │   ├── transit.py            # Transit endpoints
      │   └── users.py              # User endpoints
      │
      └── schemas/
          ├── event.py              # Pydantic schemas for events
          ├── template.py           # Pydantic schemas for templates
          └── transit.py            # Pydantic schemas for transit
```

---

## Core Concepts

### 1. Event Structure (CRITICAL)

**TypeScript Definition:**
```typescript
interface Event {
  id: string;                       // Unique identifier (UUID)
  timestamp: string;                // ISO8601 format
  title: string | null;             // Optional event title
  note: string | null;              // Optional notes
  category: string | null;          // Optional category
  location: {
    lat: number;
    lon: number;
  } | null;
  transit?: TransitTrip[];          // Optional transit information
}
```

**Key Rules:**
- `timestamp` must always be ISO8601 format
- Location is optional but recommended
- Transit data is only added when user explicitly requests it

### 2. Template (Favorite) Structure

```typescript
interface Template {
  id: string;                       // Unique identifier (UUID)
  label: string;                    // Display name
  icon: string;                     // Icon identifier or emoji
  defaultCategory: string | null;   // Pre-filled category
}
```

### 3. Transit Trip Structure

```typescript
interface TransitTrip {
  type: "BUS" | "SUBWAY" | "TRAIN";
  lineName: string;                 // e.g., "Line 2", "Bus 405"
  stationFrom: string;
  stationTo: string;
  departureTime: string;            // ISO8601
  arrivalTime: string;              // ISO8601
}
```

### 4. Abstraction Interfaces

#### Transit Provider Interface
```typescript
interface TransitProvider {
  searchTripByTime(
    location: { lat: number; lon: number },
    timestamp: string
  ): Promise<TransitTrip[]>;

  searchStations(keyword: string): Promise<Station[]>;

  getNearbyStations(
    location: { lat: number; lon: number }
  ): Promise<Station[]>;
}
```

**Implementation Strategy:**
- Start with mock provider for MVP
- Design for easy swap to real API later
- Keep provider logic isolated

#### Suggestion Engine Interface
```typescript
interface SuggestionEngine {
  suggestLabel(
    eventHistory: Event[],
    context: { time: string; weekday: number; location?: Location }
  ): string[];  // Returns suggestions in priority order
}
```

**Implementation Strategy:**
- MVP: Rule-based suggestions (time of day, weekday, location)
- Future: Server-based ML model

---

## Development Workflows

### Git Workflow

#### Branch Naming
- **Feature**: `feature/<description>` or `claude/<session-id>`
- **Bug Fix**: `fix/<issue-description>`
- **Documentation**: `docs/<description>`

#### Commit Message Format
```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `refactor`: Code refactoring
- `test`: Tests
- `chore`: Maintenance

**Examples:**
```
feat(events): add event creation with location

Implements event creation flow with automatic location capture
using expo-location. Includes permission handling for iOS/Android.

---

fix(timeline): resolve timezone display bug

Converts all timestamps to local timezone before display.

---

docs(claude): update development workflow
```

### Design-First Workflow (CRITICAL)

**Before any implementation, Claude MUST:**

1. **Understand Requirements**
   - List all features to implement
   - Identify data models needed
   - Note API requirements

2. **Create Design Document**
   - Wireframes (text-based description)
   - Data model schemas
   - API endpoint specifications
   - Component hierarchy
   - State management plan

3. **Get Approval**
   - Present design to user
   - Wait for explicit approval
   - Answer clarifying questions

4. **Only Then Implement**
   - Follow approved design exactly
   - Use TodoWrite to track tasks
   - Show diffs before file modifications

**Example Design Document Template:**

```markdown
## Feature: Event Creation with Location

### Wireframe
- Screen: EventDetailScreen
- Components:
  - TimestampDisplay (auto-filled, current time)
  - LocationDisplay (auto-filled if permission granted)
  - TitleInput (optional text field)
  - SaveButton

### Data Models
Event {
  id: UUID
  timestamp: ISO8601
  location: { lat, lon } | null
  title: string | null
}

### API Endpoints
POST /api/events
Body: { timestamp, location?, title? }
Response: { id, ...event }

### State Management
- Store: eventsStore
- Actions: addEvent, updateEvent, deleteEvent
- Selectors: getEventsByDate, getEventById

### Implementation Steps
1. Create EventDetailScreen component
2. Implement location permission request
3. Add Zustand store for events
4. Create API client for event creation
5. Wire up UI to state and API
```

### Testing Strategy

#### Test Coverage Goals
- **Unit Tests**: Individual functions, utilities
- **Component Tests**: React components with React Testing Library
- **Integration Tests**: API client interactions
- **E2E Tests**: Complete user flows (optional for MVP)

#### Test Writing Guidelines
```typescript
// Good: Descriptive test name
describe('TimelineItem', () => {
  it('displays event time in local timezone', () => {
    // Arrange
    const event = { timestamp: '2025-01-15T10:00:00Z', ... };

    // Act
    render(<TimelineItem event={event} />);

    // Assert
    expect(screen.getByText(/10:00/)).toBeInTheDocument();
  });
});
```

---

## Technology-Specific Guidelines

### React Native Development Rules

#### 1. TypeScript is Mandatory
- All files must use `.ts` or `.tsx` extensions
- Define proper interfaces for all props
- Use strict type checking

```typescript
// Good
interface TimelineItemProps {
  event: Event;
  onPress: (id: string) => void;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ event, onPress }) => {
  // ...
};

// Bad: No types
const TimelineItem = ({ event, onPress }) => {
  // ...
};
```

#### 2. Component Structure
- Use functional components (FC) only
- Use React Hooks for state and effects
- Keep components small and focused

```typescript
// Component file structure
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// 1. Interfaces
interface Props {
  // ...
}

// 2. Component
const MyComponent: React.FC<Props> = ({ ... }) => {
  // 3. Hooks
  const [state, setState] = useState();

  useEffect(() => {
    // ...
  }, []);

  // 4. Event handlers
  const handlePress = () => {
    // ...
  };

  // 5. Render
  return (
    <View style={styles.container}>
      {/* ... */}
    </View>
  );
};

// 6. Styles
const styles = StyleSheet.create({
  container: {
    // ...
  },
});

export default MyComponent;
```

#### 3. Styling
- Use `StyleSheet.create` for performance
- Consider styled-components/native for complex styling
- Follow consistent spacing/color schemes

#### 4. State Management (Zustand)
```typescript
// eventsStore.ts
import create from 'zustand';

interface EventsState {
  events: Event[];
  addEvent: (event: Event) => void;
  updateEvent: (id: string, updates: Partial<Event>) => void;
  deleteEvent: (id: string) => void;
}

export const useEventsStore = create<EventsState>((set) => ({
  events: [],

  addEvent: (event) =>
    set((state) => ({ events: [...state.events, event] })),

  updateEvent: (id, updates) =>
    set((state) => ({
      events: state.events.map(e =>
        e.id === id ? { ...e, ...updates } : e
      ),
    })),

  deleteEvent: (id) =>
    set((state) => ({
      events: state.events.filter(e => e.id !== id),
    })),
}));
```

#### 5. API Communication
```typescript
// eventsApi.ts
import axios from 'axios';
import { Event } from '../types/event';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL;

export const eventsApi = {
  async createEvent(event: Omit<Event, 'id'>): Promise<Event> {
    const response = await axios.post(`${API_BASE_URL}/events`, event);
    return response.data;
  },

  async getEvents(date: string): Promise<Event[]> {
    const response = await axios.get(`${API_BASE_URL}/events`, {
      params: { date },
    });
    return response.data;
  },

  // ... other methods
};
```

### FastAPI Development Rules

#### 1. Project Structure
```python
# main.py
from fastapi import FastAPI
from routers import events, transit, users
from database import engine, Base

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Timeline API")

# Include routers
app.include_router(events.router, prefix="/api/events", tags=["events"])
app.include_router(transit.router, prefix="/api/transit", tags=["transit"])
app.include_router(users.router, prefix="/api/users", tags=["users"])
```

#### 2. Models (SQLAlchemy)
```python
# models.py
from sqlalchemy import Column, String, DateTime, Float, JSON
from database import Base
import uuid

class Event(Base):
    __tablename__ = "events"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String, nullable=False, index=True)
    timestamp = Column(DateTime, nullable=False, index=True)
    title = Column(String, nullable=True)
    note = Column(String, nullable=True)
    category = Column(String, nullable=True)
    location = Column(JSON, nullable=True)  # {"lat": float, "lon": float}
    transit = Column(JSON, nullable=True)    # List of TransitTrip objects
```

#### 3. Schemas (Pydantic)
```python
# schemas/event.py
from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime

class Location(BaseModel):
    lat: float
    lon: float

class TransitTrip(BaseModel):
    type: str  # "BUS" | "SUBWAY" | "TRAIN"
    lineName: str
    stationFrom: str
    stationTo: str
    departureTime: datetime
    arrivalTime: datetime

class EventCreate(BaseModel):
    timestamp: datetime
    title: Optional[str] = None
    note: Optional[str] = None
    category: Optional[str] = None
    location: Optional[Location] = None
    transit: Optional[List[TransitTrip]] = None

class EventResponse(EventCreate):
    id: str
    user_id: str

    class Config:
        from_attributes = True
```

#### 4. Routers
```python
# routers/events.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from database import get_db
from schemas.event import EventCreate, EventResponse
from models import Event

router = APIRouter()

@router.post("/", response_model=EventResponse)
def create_event(
    event: EventCreate,
    user_id: str,  # TODO: Get from auth
    db: Session = Depends(get_db)
):
    db_event = Event(
        user_id=user_id,
        **event.dict()
    )
    db.add(db_event)
    db.commit()
    db.refresh(db_event)
    return db_event

@router.get("/", response_model=List[EventResponse])
def get_events(
    date: str,  # YYYY-MM-DD
    user_id: str,  # TODO: Get from auth
    db: Session = Depends(get_db)
):
    # Filter events by date
    # ...
    return events
```

#### 5. Authentication Strategy
- **MVP**: Device ID-based anonymous accounts
- **Future**: OAuth integration (Google, Apple)

```python
# Initial: Simple device ID
@router.post("/events")
def create_event(
    event: EventCreate,
    device_id: str = Header(...),
    db: Session = Depends(get_db)
):
    # Use device_id as user identifier
    pass
```

### Expo/iOS/Android Development

#### 1. Permissions (expo-location)
```typescript
// utils/location.ts
import * as Location from 'expo-location';

export async function requestLocationPermission(): Promise<boolean> {
  const { status } = await Location.requestForegroundPermissionsAsync();
  return status === 'granted';
}

export async function getCurrentLocation(): Promise<Location> {
  const hasPermission = await requestLocationPermission();
  if (!hasPermission) {
    throw new Error('Location permission denied');
  }

  const location = await Location.getCurrentPositionAsync({
    accuracy: Location.Accuracy.Balanced,
  });

  return {
    lat: location.coords.latitude,
    lon: location.coords.longitude,
  };
}
```

#### 2. iOS Specific (Info.plist)
Expo automatically adds these, but verify in `app.json`:
```json
{
  "expo": {
    "ios": {
      "infoPlist": {
        "NSLocationWhenInUseUsageDescription": "Timeline App needs your location to record events.",
        "NSLocationAlwaysUsageDescription": "Timeline App needs your location to record events in the background."
      }
    }
  }
}
```

#### 3. Android Specific
```json
{
  "expo": {
    "android": {
      "permissions": [
        "ACCESS_FINE_LOCATION",
        "ACCESS_COARSE_LOCATION"
      ]
    }
  }
}
```

#### 4. Widget Support (Future)
- iOS: Use WidgetKit (requires native code)
- Android: Use Android Glance API
- Separate sprint required

#### 5. Background Location (Future)
- Requires Foreground Service on Android
- Significant battery impact - implement carefully

### Transit Integration Rules

#### 1. Provider Abstraction
```typescript
// api/transitProvider.ts
export interface TransitProvider {
  searchTripByTime(
    location: { lat: number; lon: number },
    timestamp: string
  ): Promise<TransitTrip[]>;

  searchStations(keyword: string): Promise<Station[]>;

  getNearbyStations(
    location: { lat: number; lon: number }
  ): Promise<Station[]>;
}

// Mock implementation for MVP
export class MockTransitProvider implements TransitProvider {
  async searchTripByTime(location, timestamp): Promise<TransitTrip[]> {
    // Return mock data
    return [
      {
        type: "SUBWAY",
        lineName: "Line 2",
        stationFrom: "Gangnam",
        stationTo: "Seoul Station",
        departureTime: timestamp,
        arrivalTime: new Date(new Date(timestamp).getTime() + 30 * 60000).toISOString(),
      }
    ];
  }

  // ... other methods with mock data
}

// Real implementation (future)
export class KakaoTransitProvider implements TransitProvider {
  // Implement with real Kakao API
}
```

### AI Suggestion System Rules

#### 1. Suggestion Engine Interface
```typescript
// utils/suggestionEngine.ts
export interface SuggestionEngine {
  suggestLabel(
    eventHistory: Event[],
    context: {
      time: string;
      weekday: number;
      location?: { lat: number; lon: number };
    }
  ): string[];
}

// Rule-based implementation for MVP
export class RuleBasedSuggestionEngine implements SuggestionEngine {
  suggestLabel(eventHistory, context): string[] {
    const suggestions: string[] = [];
    const hour = new Date(context.time).getHours();

    // Time-based suggestions
    if (hour >= 7 && hour <= 9) {
      suggestions.push("출근", "아침식사", "운동");
    } else if (hour >= 12 && hour <= 14) {
      suggestions.push("점심식사", "미팅");
    } else if (hour >= 18 && hour <= 20) {
      suggestions.push("퇴근", "저녁식사");
    }

    // Weekday-based suggestions
    if (context.weekday >= 1 && context.weekday <= 5) {
      suggestions.push("업무", "회의");
    } else {
      suggestions.push("휴식", "취미");
    }

    // History-based suggestions (frequent labels)
    const frequentLabels = this.getFrequentLabels(eventHistory);
    suggestions.push(...frequentLabels.slice(0, 3));

    // Remove duplicates and return top 5
    return [...new Set(suggestions)].slice(0, 5);
  }

  private getFrequentLabels(events: Event[]): string[] {
    // Count label frequency and return sorted
    // ...
  }
}
```

---

## AI Assistant Guidelines

### When Starting a New Task (CRITICAL)

**ALWAYS follow these steps:**

1. **Understand the Request**
   - Ask clarifying questions if ambiguous
   - Identify the scope (UI only? API? Both?)
   - Determine if it's a question or implementation task

2. **Think Hard / Design First**
   - Use "think" or "think hard" mode
   - Create design document BEFORE coding
   - Wait for explicit approval

3. **Use TodoWrite for Planning**
   - Break down complex tasks into steps
   - Track progress with todo statuses
   - Mark todos as in_progress/completed appropriately

4. **Search Before Creating**
   - Check if similar functionality exists
   - Use Grep/Glob to find related code
   - Reuse existing patterns

5. **Show Diffs Before Modifying**
   - Never rewrite entire files
   - Show minimal, targeted changes
   - Explain why each change is necessary

### Code Implementation Checklist

#### Before Writing Code
- [ ] Design document created and approved
- [ ] Relevant existing files read and understood
- [ ] Data models defined (TypeScript interfaces)
- [ ] API contracts specified
- [ ] TodoWrite used to plan implementation steps

#### While Writing Code
- [ ] Follow existing code style and patterns
- [ ] Add TypeScript types for all variables/functions
- [ ] Implement proper error handling
- [ ] Validate and sanitize all inputs
- [ ] Check for security vulnerabilities (SQL injection, XSS, etc.)
- [ ] Add comments for complex logic only (code should be self-documenting)

#### After Writing Code
- [ ] Write/update tests
- [ ] Run tests to verify nothing breaks
- [ ] Update documentation if behavior changes
- [ ] Show diff of changes
- [ ] Explain what was changed and why

### Communication Style

- **Be Concise**: Short, clear explanations
- **Be Specific**: Reference files with line numbers (e.g., `src/screens/HomeScreen.tsx:42`)
- **Be Honest**: Say "I don't know" rather than guessing
- **Ask Questions**: Clarify ambiguous requirements
- **No Emojis**: Unless explicitly requested

### Tool Usage Best Practices

1. **Prefer Specialized Tools**
   - Use `Read` instead of `cat`
   - Use `Edit` instead of `sed`
   - Use `Write` for new files only
   - Use `Bash` only for terminal operations (git, npm, etc.)

2. **Use Task Tool for Exploration**
   - When searching for patterns: `Task` with `subagent_type=Explore`
   - For understanding codebase structure
   - For open-ended searches

3. **Parallel Execution**
   - Call independent tools in parallel when possible
   - Example: Read multiple files simultaneously

4. **Search Efficiently**
   - Use `Grep` for content search
   - Use `Glob` for file pattern matching

### Common Mistakes to Avoid

❌ **Don't:**
- Skip design phase and jump to coding
- Rewrite entire files (use Edit for targeted changes)
- Install packages without asking
- Create files without reading existing codebase
- Commit without running tests
- Guess at implementation details
- Over-engineer solutions
- Batch todo completions

✅ **Do:**
- Always design first, then implement
- Show diffs before modifying files
- Search for existing implementations
- Follow established patterns
- Ask clarifying questions
- Test changes thoroughly
- Use TodoWrite for complex tasks
- Mark todos in_progress before starting
- Mark todos completed immediately after finishing

### Refactoring Guidelines

**When to refactor:**
- After implementing a significant feature
- When code duplication is noticed
- When component complexity grows

**How to refactor:**
1. **Request "Refactoring Plan" first**
2. Wait for user approval
3. Ensure tests exist before refactoring
4. Make incremental changes
5. Run tests after each change
6. Don't change functionality while refactoring

---

## Common Commands

### Expo / React Native

```bash
# Create new Expo project
npx create-expo-app@latest timeline-app
cd timeline-app

# Install dependencies
npm install

# Install Expo-specific packages
npx expo install expo-location
npx expo install react-native-reanimated react-native-gesture-handler

# Install other dependencies
npm install zustand axios zod
npm install -D @types/react @types/react-native

# Start development server
npx expo start

# Run on specific platform
npx expo start --ios
npx expo start --android
npx expo start --web

# Type checking
npm run typecheck

# Run tests
npm run test
npm run test:watch

# Build for production
eas build -p ios
eas build -p android
eas build -p all

# Submit to stores
eas submit -p ios
eas submit -p android
```

### FastAPI Backend

```bash
# Create virtual environment
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install dependencies
pip install fastapi uvicorn sqlalchemy psycopg2-binary python-dotenv pydantic

# Install development dependencies
pip install pytest pytest-asyncio httpx

# Run development server
uvicorn main:app --reload

# Run with specific host/port
uvicorn main:app --reload --host 0.0.0.0 --port 8000

# Run tests
pytest
pytest --cov=.  # With coverage

# Generate requirements.txt
pip freeze > requirements.txt

# Database migrations (with Alembic)
alembic init alembic
alembic revision --autogenerate -m "Initial migration"
alembic upgrade head
```

### Git Commands

```bash
# Create and switch to feature branch
git checkout -b feature/event-creation

# Stage changes
git add .

# Commit with conventional commit message
git commit -m "feat(events): add event creation flow"

# Push to remote (first time)
git push -u origin feature/event-creation

# Push to remote (subsequent)
git push

# View status
git status

# View diff
git diff
git diff --staged

# View commit history
git log --oneline
```

---

## MVP Roadmap

### MVP 1 — Local-Based Recording

**Goal**: Basic event recording with local storage

- [ ] Event creation/editing/deletion
- [ ] Favorite templates (CRUD)
- [ ] Daily timeline UI
- [ ] Location permission handling
- [ ] Location recording and storage
- [ ] Local storage (AsyncStorage or SQLite)

**Estimated Duration**: 1-2 weeks

### MVP 2 — API Integration

**Goal**: Backend integration and synchronization

- [ ] FastAPI event CRUD endpoints
- [ ] User identification (device ID)
- [ ] Statistics API endpoints
- [ ] Synchronization (local ↔ backend)
- [ ] Error handling and retry logic
- [ ] Authentication flow

**Estimated Duration**: 1-2 weeks

### MVP 3 — Transit & Recommendations

**Goal**: Transit integration and AI suggestions

- [ ] Transit provider interface (mock implementation)
- [ ] Suggestion engine (rule-based)
- [ ] Transit data UI components
- [ ] Suggestion UI and interactions
- [ ] Integration with event creation flow

**Estimated Duration**: 1 week

### Future Extensions

**Planned but not in MVP:**

- [ ] Photo/voice event support
- [ ] iOS/Android widget
- [ ] Server-based AI recommendation model
- [ ] Real public transit API integration (Kakao, Google Maps)
- [ ] Weekly/monthly timeline views
- [ ] Data export functionality
- [ ] Social sharing features
- [ ] Multi-device synchronization
- [ ] Background location tracking

---

## Security Best Practices

### Critical Security Guidelines

⚠️ **NEVER:**
1. Commit secrets, API keys, or passwords
2. Trust user input without validation
3. Use string concatenation for SQL queries
4. Expose sensitive data in API responses
5. Store passwords in plain text
6. Skip authentication checks

✅ **ALWAYS:**
1. Use environment variables for secrets (`.env`)
2. Validate and sanitize all user inputs
3. Use parameterized queries (SQLAlchemy ORM)
4. Implement proper authentication and authorization
5. Hash passwords (bcrypt, argon2)
6. Use HTTPS for all API communication
7. Implement rate limiting on API endpoints
8. Log security events (but never log sensitive data)

### Common Vulnerabilities to Avoid

**SQL Injection:**
```python
# Bad
db.execute(f"SELECT * FROM events WHERE id = '{event_id}'")

# Good
event = db.query(Event).filter(Event.id == event_id).first()
```

**XSS (Cross-Site Scripting):**
```typescript
// Bad
<div dangerouslySetInnerHTML={{ __html: userInput }} />

// Good
<div>{userInput}</div>  // React automatically escapes
```

**Command Injection:**
```python
# Bad
os.system(f"convert {user_filename}.jpg output.png")

# Good
subprocess.run(["convert", f"{validated_filename}.jpg", "output.png"])
```

---

## Maintaining This File

### When to Update CLAUDE.md

Update this file when:
- [ ] New features are added to the roadmap
- [ ] Tech stack changes (new libraries, frameworks)
- [ ] New conventions are established
- [ ] API contracts change
- [ ] Security guidelines need updates
- [ ] Common patterns emerge
- [ ] Development workflow changes

### Update Checklist

1. Update "Last Updated" date at the top
2. Keep information accurate and current
3. Remove outdated sections
4. Add examples for new patterns
5. Test that all commands still work
6. Commit with message: `docs(claude): update CLAUDE.md with [description]`

---

## Resources

### Internal Documentation
- README.md - Project overview and quick start
- docs/ - Detailed documentation (when created)
- API documentation (when implemented)

### External Resources

**React Native / Expo:**
- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [React Navigation](https://reactnavigation.org/docs/getting-started)

**State Management:**
- [Zustand Documentation](https://github.com/pmndrs/zustand)

**Backend:**
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [SQLAlchemy Documentation](https://docs.sqlalchemy.org/)
- [Pydantic Documentation](https://docs.pydantic.dev/)

**Security:**
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [OWASP Mobile Security](https://owasp.org/www-project-mobile-top-10/)

**Best Practices:**
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Semantic Versioning](https://semver.org/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)

---

## Final Reminders for AI Assistants

### The Golden Rules

1. **Design → Approve → Implement**
   - Never skip design phase
   - Always get approval before coding

2. **Show, Don't Overwrite**
   - Show diffs before modifying
   - Make minimal, targeted changes

3. **Type Everything**
   - TypeScript for frontend
   - Pydantic for backend
   - No `any` types

4. **Test Everything**
   - Write tests before marking tasks complete
   - Run tests before committing

5. **Security First**
   - Think about security implications
   - Validate inputs, sanitize outputs
   - Never commit secrets

6. **Ask When Uncertain**
   - Better to ask than to guess
   - Clarify ambiguous requirements

---

**Remember**: We're building a maintainable, secure, well-tested mobile app. Quality over speed. Clarity over cleverness. Design before implementation.
