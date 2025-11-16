# Timeline App - Comprehensive Design Document

> **Version**: 1.0
> **Date**: 2025-11-16
> **Status**: Draft - Pending Approval

---

## Table of Contents

1. [App Overview](#app-overview)
2. [Feature Requirements](#feature-requirements)
3. [User Flows](#user-flows)
4. [Screen Designs (Wireframes)](#screen-designs-wireframes)
5. [Data Models](#data-models)
6. [API Specifications](#api-specifications)
7. [Technology Stack](#technology-stack)
8. [Project Structure](#project-structure)
9. [Development Roadmap](#development-roadmap)
10. [Security & Privacy](#security--privacy)
11. [Extension Points](#extension-points)

---

## App Overview

### Concept Summary

**Timeline App** is a personal daily timeline recording application that allows users to:
- Record their day in time-based events with a single tap
- Automatically capture current time and location (optional)
- Quickly add context using templates/favorites
- Track public transit usage (bus, subway, train)
- Get AI-powered suggestions based on patterns
- View statistics and insights about their daily routines

### Core Philosophy

- **Minimal Friction**: One tap to record, fill details later
- **Privacy First**: Local-only mode available, explicit consent for all tracking
- **Extensible**: Designed for easy addition of photos, voice, widgets, and ML features
- **Cross-Platform**: iOS and Android from day one

### Working Name

"Timeline" (can be rebranded later with: Timelog, TimeTrack, OneDayLog, etc.)

---

## Feature Requirements

### Phase 1: Core Features (MVP 1)

#### 1.1 Basic Timeline Recording

**User Story**: As a user, I want to quickly record "now" so I can track my day without interruption.

**Requirements**:
- Tap a button to create an event with current timestamp
- Automatically capture location (if permission granted)
- View daily timeline as a vertical scrollable list
- Each event shows: time, title/tags, notes, icon
- Edit event details later

**Success Criteria**:
- Event creation takes < 2 seconds
- Timeline displays events in chronological order
- Supports day/week/month views (start with day view)

#### 1.2 Favorites / Templates

**User Story**: As a user, I want to reuse common activities (commute, gym, meals) without retyping.

**Requirements**:
- Create favorite templates with:
  - Label (e.g., "Morning Commute")
  - Icon/emoji
  - Default category (Work/Health/Leisure/etc.)
- Quick-apply templates to events
- Manage templates: create, edit, delete, reorder

**Success Criteria**:
- Templates display as chips/buttons during event editing
- One-tap application of template to event
- Support drag-and-drop reordering

#### 1.3 Event Details & Categories

**Requirements**:
- Each event can have:
  - Title (required after creation)
  - Notes (optional, multi-line)
  - Category (Work/Health/Leisure/Transport/Social/Other)
  - Location (optional, GPS coordinates)
  - Transit info (optional, added separately)
- Default categories provided, user can add custom ones

### Phase 2: Advanced Features (MVP 2)

#### 2.1 Public Transit Integration

**User Story**: As a user, I want to track which buses/trains I took so I can understand my commute patterns.

**Requirements**:
- Two modes:
  1. **Automatic** (location-based):
     - Use GPS + time to infer likely transit routes
     - Present suggestions for user confirmation
  2. **Manual**:
     - Search for stations/stops
     - Select route, departure/arrival times
- Transit trip includes:
  - Type (BUS/SUBWAY/TRAIN)
  - Line name/number
  - From station/stop
  - To station/stop
  - Departure/arrival times
- Display transit segments in timeline

**Technical**:
- Abstract transit API layer (easy to swap providers)
- Start with mock data, design for real API integration

#### 2.2 AI-Based Auto-Tagging & Recommendations

**User Story**: As a user, I want the app to learn my patterns and suggest labels automatically.

**Requirements**:
- Rule-based suggestions (Phase 2A):
  - Time of day + weekday → suggest common activities
  - Location + time → suggest activities done at that location before
  - Example: "Mon-Fri, 8-9am, near home → suggest 'Morning Commute'"
- ML-based suggestions (Phase 2B - future):
  - Server-side model trained on user's event history
  - Returns top 3-5 label suggestions with confidence scores

**UX**:
- Display suggestion chips above input field
- One-tap to accept suggestion
- Easy to dismiss/ignore

### Phase 3: Insights & Extensions (MVP 3)

#### 3.1 Statistics & Reports

**Requirements**:
- Time period selection: week, month, custom range
- Metrics:
  - Event count by category
  - Time spent (estimated) per category
  - Commute frequency and average duration
  - Most frequent activities
- Visualizations:
  - Simple bar charts (category distribution)
  - Donut chart (time allocation)
  - Text summaries

#### 3.2 Search & Filtering

**Requirements**:
- Search by keyword (title, notes)
- Filter by:
  - Date range
  - Category
  - Location (events near a place)
  - Presence of transit data
- Display filtered results in timeline format

#### 3.3 Widget Support (Future)

**Requirements** (design only for now):
- iOS/Android home screen widget
- Single button: "Log Now"
- Tapping widget:
  - Opens app
  - Creates event with current timestamp
  - Shows quick-edit screen

**Implementation Note**: Separate sprint after core features are stable.

---

## User Flows

### Flow 1: Quick Event Recording

```
1. User opens app OR taps widget button
2. App creates new event:
   - timestamp: current time
   - location: current GPS (if permission granted)
3. Event appears in today's timeline with placeholder "(untitled)"
4. User can tap event to add details later, or leave as-is
```

### Flow 2: Adding Event Details

```
1. User taps an event in timeline
2. EventDetailScreen opens showing:
   - Time (editable)
   - Title input field
   - Notes textarea
   - Category selector
   - Location display (if available)
   - Favorite template chips
   - "Add Transit" button
3. User selects a favorite template (e.g., "Gym Session")
   - Title auto-fills: "Gym Session"
   - Category auto-sets: "Health"
4. User adds optional notes
5. User saves → returns to timeline
```

### Flow 3: Managing Favorites

```
1. User navigates to FavoritesScreen (via bottom tab)
2. Sees list of existing templates
3. User taps "+ New Favorite"
4. Enters:
   - Label
   - Icon (from picker)
   - Default category
5. Saves → template appears in list
6. User can drag to reorder, swipe to delete
```

### Flow 4: Adding Transit Information

```
1. User is editing an event
2. Taps "Add Transit" button
3. TransitSearchScreen opens:
   - Option 1: "Auto-detect from location" (shows suggestions)
   - Option 2: "Manual search" (search field for stations/routes)
4. User selects a route segment:
   - Type: Subway
   - Line: Line 2
   - From: Gangnam Station
   - To: Seoul Station
   - Departure: 08:25
   - Arrival: 08:45
5. Confirms → transit segment added to event
6. Event timeline now shows transit icon + brief info
```

### Flow 5: Viewing Statistics

```
1. User navigates to StatsScreen
2. Selects time period: "This Week"
3. Sees summary:
   - Total events: 45
   - Top category: Work (20 events)
   - Commute events: 10
   - Average commute duration: 35 minutes
4. Views bar chart of category distribution
```

---

## Screen Designs (Wireframes)

### HomeScreen (Daily Timeline View)

```
┌─────────────────────────────────────┐
│  Timeline          🔍  ⚙️           │ ← Header with search, settings
├─────────────────────────────────────┤
│  📅  Today - Nov 16, 2025  ◀ ▶     │ ← Date selector
├─────────────────────────────────────┤
│                                     │
│  08:00  🚗  Morning Commute         │ ← Timeline Item
│         Work · Gangnam Station      │
│                                     │
│  09:30  💼  Team Meeting            │
│         Work · Conference Room A    │
│                                     │
│  12:00  🍽️  Lunch                   │
│         Leisure · (no location)     │
│                                     │
│  14:00  📝  (untitled)              │ ← Event without details yet
│         (no category)               │
│                                     │
│  ...                                │
│                                     │
│                   ╔═══╗             │ ← Floating Action Button
│                   ║ + ║             │
│                   ╚═══╝             │
│                                     │
├─────────────────────────────────────┤
│  🏠  📊  ⭐  ⚙️                     │ ← Bottom Tab Navigation
│ Home Stats Favs Settings            │
└─────────────────────────────────────┘
```

**Components**:
- `Header`: Date display, navigation arrows, search icon
- `TimelineList`: Scrollable FlatList of TimelineItem components
- `TimelineItem`: Time, icon, title, category badge, location tag
- `FAB` (Floating Action Button): "Log Now" button

### EventDetailScreen (Event Editing)

```
┌─────────────────────────────────────┐
│  ◀  Event Details          ✓ Save   │ ← Navigation header
├─────────────────────────────────────┤
│                                     │
│  ⏰ Time                            │
│  ┌─────────────────────────────┐   │
│  │  08:00 AM          📅 Edit  │   │ ← Time picker
│  └─────────────────────────────┘   │
│                                     │
│  📍 Location                        │
│  Gangnam Station (37.4979° N...)   │
│                                     │
│  ─────────────────────────────────  │
│                                     │
│  Quick Templates:                   │
│  ┌──────┐ ┌──────┐ ┌──────┐        │
│  │ 🚗   │ │ 💼   │ │ 🍽️   │        │ ← Favorite chips
│  │Commut│ │Meeting│ │ Lunch│        │
│  └──────┘ └──────┘ └──────┘        │
│                                     │
│  ─────────────────────────────────  │
│                                     │
│  Title                              │
│  ┌─────────────────────────────┐   │
│  │ Morning Commute             │   │ ← Text input
│  └─────────────────────────────┘   │
│                                     │
│  Category                           │
│  ┌─────────────────────────────┐   │
│  │ Work                    ▼   │   │ ← Dropdown
│  └─────────────────────────────┘   │
│                                     │
│  Notes                              │
│  ┌─────────────────────────────┐   │
│  │ Took Line 2 from Gangnam    │   │ ← Textarea
│  │ to Seoul Station. Busy!     │   │
│  │                             │   │
│  └─────────────────────────────┘   │
│                                     │
│  🚇 Transit Information             │
│  ┌─────────────────────────────┐   │
│  │ Subway Line 2               │   │
│  │ Gangnam → Seoul Station     │   │ ← Transit segment
│  │ 08:25 - 08:45               │   │
│  └─────────────────────────────┘   │
│  [+ Add Transit]                    │
│                                     │
│  ─────────────────────────────────  │
│                                     │
│  [Delete Event]                     │ ← Danger zone
│                                     │
└─────────────────────────────────────┘
```

**Components**:
- `TimePicker`: Custom time selection
- `LocationDisplay`: Shows GPS coordinates, optional map thumbnail
- `FavoriteChips`: Horizontal scrollable list
- `CategoryPicker`: Dropdown or bottom sheet
- `TransitSegment`: Displays transit trip details
- `DeleteButton`: Confirmation dialog

### FavoritesScreen (Template Management)

```
┌─────────────────────────────────────┐
│  Favorites                          │
├─────────────────────────────────────┤
│                                     │
│  ┌─────────────────────────────┐   │
│  │ 🚗  Morning Commute          │   │
│  │     Work                  ⋮  │   │ ← Drag handle + menu
│  └─────────────────────────────┘   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │ 💼  Team Meeting             │   │
│  │     Work                  ⋮  │   │
│  └─────────────────────────────┘   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │ 🍽️  Lunch Break              │   │
│  │     Leisure               ⋮  │   │
│  └─────────────────────────────┘   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │ 🏋️  Gym Session              │   │
│  │     Health                ⋮  │   │
│  └─────────────────────────────┘   │
│                                     │
│                                     │
│  [+ New Favorite]                   │
│                                     │
├─────────────────────────────────────┤
│  🏠  📊  ⭐  ⚙️                     │
└─────────────────────────────────────┘
```

**Features**:
- Drag-and-drop to reorder
- Tap to edit
- Swipe left to delete (with confirmation)
- Add button at bottom

### StatsScreen (Statistics & Insights)

```
┌─────────────────────────────────────┐
│  Statistics                         │
├─────────────────────────────────────┤
│                                     │
│  Period: [This Week ▼]              │ ← Period selector
│                                     │
│  ─────────────────────────────────  │
│                                     │
│  Summary                            │
│  Total Events: 45                   │
│  Days Tracked: 7/7                  │
│                                     │
│  ─────────────────────────────────  │
│                                     │
│  Events by Category                 │
│                                     │
│  Work         ████████████ 20      │
│  Leisure      ██████ 10             │ ← Bar chart (text)
│  Health       ████ 8                │
│  Transport    ███ 5                 │
│  Social       ██ 2                  │
│                                     │
│  ─────────────────────────────────  │
│                                     │
│  Commute Insights                   │
│  Total Commutes: 10                 │
│  Avg Duration: 35 min               │
│  Most Used: Subway Line 2           │
│                                     │
│  ─────────────────────────────────  │
│                                     │
│  Frequent Activities                │
│  1. Morning Commute (10x)           │
│  2. Team Meeting (8x)               │
│  3. Gym Session (5x)                │
│                                     │
├─────────────────────────────────────┤
│  🏠  📊  ⭐  ⚙️                     │
└─────────────────────────────────────┘
```

**Components**:
- Period selector (week/month/custom)
- Summary cards
- Simple bar chart visualization
- List of insights

### SettingsScreen

```
┌─────────────────────────────────────┐
│  Settings                           │
├─────────────────────────────────────┤
│                                     │
│  Privacy & Permissions              │
│  ────────────────────────────────   │
│  Location Access         [Toggle]   │
│  Transit Tracking        [Toggle]   │
│  AI Recommendations      [Toggle]   │
│                                     │
│  Data & Sync                        │
│  ────────────────────────────────   │
│  Cloud Sync              [Toggle]   │
│  Local-Only Mode         [Toggle]   │
│  Export Data             [Button]   │
│                                     │
│  Preferences                        │
│  ────────────────────────────────   │
│  Default Category        [Picker]   │
│  Theme                   [Light▼]   │
│  Start of Week           [Monday▼]  │
│                                     │
│  About                              │
│  ────────────────────────────────   │
│  Version 1.0.0                      │
│  Privacy Policy          [Link]     │
│  Terms of Service        [Link]     │
│                                     │
├─────────────────────────────────────┤
│  🏠  📊  ⭐  ⚙️                     │
└─────────────────────────────────────┘
```

---

## Data Models

### TypeScript Interfaces (Frontend)

```typescript
// src/types/event.ts

export interface Location {
  lat: number;
  lon: number;
  address?: string; // Optional reverse-geocoded address
}

export interface TransitTrip {
  id: string;
  type: 'BUS' | 'SUBWAY' | 'TRAIN';
  lineName: string;           // e.g., "Line 2", "Bus 405"
  routeId?: string;           // API-specific route identifier
  stationFrom: string;
  stationTo: string;
  departureTime: string;      // ISO8601
  arrivalTime: string;        // ISO8601
}

export interface Event {
  id: string;                 // UUID
  userId: string;             // User identifier
  timestamp: string;          // ISO8601
  title: string | null;
  note: string | null;
  category: string | null;    // "Work", "Health", "Leisure", etc.
  location: Location | null;
  transitTrips: TransitTrip[];
  createdAt: string;          // ISO8601
  updatedAt: string;          // ISO8601
}

// src/types/template.ts

export interface FavoriteTemplate {
  id: string;                 // UUID
  userId: string;
  label: string;              // e.g., "Morning Commute"
  icon: string;               // Emoji or icon identifier
  defaultCategory: string | null;
  order: number;              // For user-defined ordering
  createdAt: string;
  updatedAt: string;
}

// src/types/stats.ts

export interface CategoryStat {
  category: string;
  count: number;
  percentage: number;
}

export interface StatsSummary {
  totalEvents: number;
  daysTracked: number;
  periodStart: string;        // ISO8601
  periodEnd: string;          // ISO8601
  categoryCounts: CategoryStat[];
  topActivities: Array<{
    label: string;
    count: number;
  }>;
  commuteStats?: {
    totalCommutes: number;
    avgDurationMinutes: number;
    mostUsedLine: string;
  };
}

// src/types/user.ts

export interface UserSettings {
  userId: string;
  locationEnabled: boolean;
  transitTrackingEnabled: boolean;
  aiRecommendationsEnabled: boolean;
  cloudSyncEnabled: boolean;
  localOnlyMode: boolean;
  defaultCategory: string | null;
  theme: 'light' | 'dark' | 'auto';
  startOfWeek: 'sunday' | 'monday';
}
```

### Python Models (Backend)

```python
# backend/models.py

from sqlalchemy import Column, String, DateTime, Float, JSON, Boolean, Integer, ForeignKey, Text
from sqlalchemy.orm import relationship
from database import Base
import uuid
from datetime import datetime

class User(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    device_id = Column(String, unique=True, nullable=True, index=True)
    email = Column(String, unique=True, nullable=True)
    auth_provider = Column(String, nullable=True)  # 'device', 'google', 'apple'
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    events = relationship("Event", back_populates="user", cascade="all, delete-orphan")
    templates = relationship("FavoriteTemplate", back_populates="user", cascade="all, delete-orphan")
    settings = relationship("UserSettings", back_populates="user", uselist=False, cascade="all, delete-orphan")


class Event(Base):
    __tablename__ = "events"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    timestamp = Column(DateTime, nullable=False, index=True)
    title = Column(String, nullable=True)
    note = Column(Text, nullable=True)
    category = Column(String, nullable=True, index=True)
    location = Column(JSON, nullable=True)  # {"lat": float, "lon": float, "address": str?}
    transit_trips = Column(JSON, nullable=True)  # List[TransitTrip dict]
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    user = relationship("User", back_populates="events")


class FavoriteTemplate(Base):
    __tablename__ = "favorite_templates"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    label = Column(String, nullable=False)
    icon = Column(String, nullable=False)
    default_category = Column(String, nullable=True)
    order = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    user = relationship("User", back_populates="templates")


class UserSettings(Base):
    __tablename__ = "user_settings"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String, ForeignKey("users.id", ondelete="CASCADE"), unique=True, nullable=False)
    location_enabled = Column(Boolean, default=False)
    transit_tracking_enabled = Column(Boolean, default=False)
    ai_recommendations_enabled = Column(Boolean, default=True)
    cloud_sync_enabled = Column(Boolean, default=False)
    local_only_mode = Column(Boolean, default=True)
    default_category = Column(String, nullable=True)
    theme = Column(String, default='auto')  # 'light', 'dark', 'auto'
    start_of_week = Column(String, default='monday')  # 'sunday', 'monday'
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    user = relationship("User", back_populates="settings")


# Future: AutoRule for AI pattern learning
class AutoRule(Base):
    __tablename__ = "auto_rules"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    condition = Column(JSON, nullable=False)  # {"weekday": [1,2,3,4,5], "hour_range": [8,9], "location_type": "home"}
    suggested_label = Column(String, nullable=False)
    suggested_category = Column(String, nullable=True)
    confidence = Column(Float, default=0.0)
    times_accepted = Column(Integer, default=0)
    times_rejected = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
```

### Pydantic Schemas (Backend)

```python
# backend/schemas/event.py

from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime

class LocationSchema(BaseModel):
    lat: float
    lon: float
    address: Optional[str] = None

class TransitTripSchema(BaseModel):
    id: str
    type: str  # "BUS" | "SUBWAY" | "TRAIN"
    lineName: str
    routeId: Optional[str] = None
    stationFrom: str
    stationTo: str
    departureTime: datetime
    arrivalTime: datetime

class EventCreate(BaseModel):
    timestamp: datetime
    title: Optional[str] = None
    note: Optional[str] = None
    category: Optional[str] = None
    location: Optional[LocationSchema] = None
    transitTrips: Optional[List[TransitTripSchema]] = []

class EventUpdate(BaseModel):
    timestamp: Optional[datetime] = None
    title: Optional[str] = None
    note: Optional[str] = None
    category: Optional[str] = None
    location: Optional[LocationSchema] = None
    transitTrips: Optional[List[TransitTripSchema]] = None

class EventResponse(BaseModel):
    id: str
    userId: str
    timestamp: datetime
    title: Optional[str] = None
    note: Optional[str] = None
    category: Optional[str] = None
    location: Optional[LocationSchema] = None
    transitTrips: List[TransitTripSchema] = []
    createdAt: datetime
    updatedAt: datetime

    class Config:
        from_attributes = True


# backend/schemas/template.py

from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class TemplateCreate(BaseModel):
    label: str
    icon: str
    defaultCategory: Optional[str] = None

class TemplateUpdate(BaseModel):
    label: Optional[str] = None
    icon: Optional[str] = None
    defaultCategory: Optional[str] = None
    order: Optional[int] = None

class TemplateResponse(BaseModel):
    id: str
    userId: str
    label: str
    icon: str
    defaultCategory: Optional[str] = None
    order: int
    createdAt: datetime
    updatedAt: datetime

    class Config:
        from_attributes = True
```

---

## API Specifications

### Authentication

**Initial (MVP)**: Device ID-based anonymous authentication
- Client sends `X-Device-ID` header
- Server creates/retrieves user based on device ID
- No passwords, no email required

**Future**: OAuth integration (Google, Apple)

### Base URL

- Development: `http://localhost:8000/api/v1`
- Production: `https://api.timeline-app.com/api/v1`

### Endpoints

#### Events

**POST /events**
- Description: Create a new event
- Auth: Device ID header
- Request Body: `EventCreate`
- Response: `EventResponse` (201 Created)

**GET /events**
- Description: Get events for a date range
- Auth: Device ID header
- Query Params:
  - `date` (optional): YYYY-MM-DD, defaults to today
  - `start_date` (optional): YYYY-MM-DD
  - `end_date` (optional): YYYY-MM-DD
  - `category` (optional): filter by category
- Response: `List[EventResponse]` (200 OK)

**GET /events/{event_id}**
- Description: Get a specific event
- Auth: Device ID header
- Response: `EventResponse` (200 OK)

**PATCH /events/{event_id}**
- Description: Update an event
- Auth: Device ID header
- Request Body: `EventUpdate`
- Response: `EventResponse` (200 OK)

**DELETE /events/{event_id}**
- Description: Delete an event
- Auth: Device ID header
- Response: 204 No Content

#### Favorite Templates

**POST /templates**
- Description: Create a new favorite template
- Auth: Device ID header
- Request Body: `TemplateCreate`
- Response: `TemplateResponse` (201 Created)

**GET /templates**
- Description: Get all user's templates
- Auth: Device ID header
- Response: `List[TemplateResponse]` (200 OK)

**PATCH /templates/{template_id}**
- Description: Update a template
- Auth: Device ID header
- Request Body: `TemplateUpdate`
- Response: `TemplateResponse` (200 OK)

**DELETE /templates/{template_id}**
- Description: Delete a template
- Auth: Device ID header
- Response: 204 No Content

**POST /templates/reorder**
- Description: Update template order
- Auth: Device ID header
- Request Body: `{ templateIds: string[] }` (ordered list)
- Response: 200 OK

#### Statistics

**GET /stats/summary**
- Description: Get statistics summary for a period
- Auth: Device ID header
- Query Params:
  - `start_date`: YYYY-MM-DD
  - `end_date`: YYYY-MM-DD
- Response:
  ```json
  {
    "totalEvents": 45,
    "daysTracked": 7,
    "periodStart": "2025-11-10T00:00:00Z",
    "periodEnd": "2025-11-16T23:59:59Z",
    "categoryCounts": [
      {"category": "Work", "count": 20, "percentage": 44.4},
      {"category": "Leisure", "count": 10, "percentage": 22.2}
    ],
    "topActivities": [
      {"label": "Morning Commute", "count": 10},
      {"label": "Team Meeting", "count": 8}
    ],
    "commuteStats": {
      "totalCommutes": 10,
      "avgDurationMinutes": 35,
      "mostUsedLine": "Subway Line 2"
    }
  }
  ```

#### Transit (Future - Mock for now)

**GET /transit/suggestions**
- Description: Get transit route suggestions based on location and time
- Auth: Device ID header
- Query Params:
  - `lat`: latitude
  - `lon`: longitude
  - `timestamp`: ISO8601
- Response:
  ```json
  {
    "suggestions": [
      {
        "type": "SUBWAY",
        "lineName": "Line 2",
        "stationFrom": "Gangnam",
        "stationTo": "Seoul Station",
        "departureTime": "2025-11-16T08:25:00Z",
        "arrivalTime": "2025-11-16T08:45:00Z"
      }
    ]
  }
  ```

**GET /transit/stations**
- Description: Search for stations/stops
- Query Params:
  - `query`: search keyword
  - `type`: BUS | SUBWAY | TRAIN
- Response: List of stations

#### Recommendations (Future - Mock for now)

**GET /recommendations/labels**
- Description: Get label suggestions based on context
- Auth: Device ID header
- Query Params:
  - `timestamp`: ISO8601
  - `lat` (optional): latitude
  - `lon` (optional): longitude
- Response:
  ```json
  {
    "suggestions": [
      {"label": "Morning Commute", "confidence": 0.85},
      {"label": "Gym Session", "confidence": 0.65},
      {"label": "Breakfast", "confidence": 0.45}
    ]
  }
  ```

#### User Settings

**GET /settings**
- Description: Get user settings
- Auth: Device ID header
- Response: `UserSettings`

**PATCH /settings**
- Description: Update user settings
- Auth: Device ID header
- Request Body: Partial `UserSettings`
- Response: `UserSettings` (200 OK)

---

## Technology Stack

### Frontend (Mobile App)

**Core**:
- React Native 0.73+
- Expo SDK 50+
- TypeScript 5.0+

**State Management**:
- Zustand (lightweight, easy to learn)

**Navigation**:
- React Navigation 6.x
  - Bottom Tab Navigator (main screens)
  - Stack Navigator (detail screens)

**UI Components**:
- React Native Paper (Material Design)
- or React Native Elements
- Custom components for timeline-specific UI

**Data Fetching**:
- axios for HTTP requests
- TanStack Query (React Query) for caching and state management

**Local Storage**:
- AsyncStorage (simple key-value)
- expo-sqlite (for offline mode with structured data)

**Location & Permissions**:
- expo-location
- expo-permissions

**Date/Time**:
- date-fns (lightweight, tree-shakeable)

**Charts** (for stats):
- react-native-chart-kit
- or Victory Native (more customizable)

**Testing**:
- Jest (unit tests)
- React Native Testing Library (component tests)

### Backend (Server)

**Core**:
- Python 3.11+
- FastAPI 0.104+
- Uvicorn (ASGI server)

**Database**:
- PostgreSQL 15+ (production)
- SQLite (development, local testing)
- SQLAlchemy 2.0+ (ORM)

**Validation**:
- Pydantic 2.0+

**Environment**:
- python-dotenv

**Testing**:
- pytest
- httpx (for async API testing)

**Database Migrations**:
- Alembic

**Future Extensions**:
- Celery (for background tasks, AI model inference)
- Redis (caching, rate limiting)

### Infrastructure

**Build & Deploy**:
- Expo Application Services (EAS)
  - EAS Build (cloud builds)
  - EAS Submit (app store submission)
  - EAS Update (OTA updates)

**Backend Hosting** (suggestions):
- Railway / Render / Fly.io (simple, Python-friendly)
- or AWS / GCP / Azure (more control)

**Database**:
- PostgreSQL on managed service (Supabase, Railway, RDS)

---

## Project Structure

### Frontend (React Native + Expo)

```
timeline-app/
├── .expo/
├── .gitignore
├── app.json                    # Expo configuration
├── package.json
├── tsconfig.json
├── babel.config.js
├── .env.example
├── .env                        # Environment variables (gitignored)
│
├── src/
│   ├── navigation/
│   │   ├── RootNavigator.tsx   # Main navigation structure
│   │   ├── BottomTabNavigator.tsx
│   │   └── types.ts            # Navigation type definitions
│   │
│   ├── screens/
│   │   ├── HomeScreen.tsx      # Daily timeline view
│   │   ├── EventDetailScreen.tsx
│   │   ├── FavoritesScreen.tsx
│   │   ├── StatsScreen.tsx
│   │   ├── SettingsScreen.tsx
│   │   └── TransitSearchScreen.tsx (future)
│   │
│   ├── components/
│   │   ├── common/
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   └── Card.tsx
│   │   ├── timeline/
│   │   │   ├── TimelineItem.tsx
│   │   │   ├── TimelineList.tsx
│   │   │   └── DateSelector.tsx
│   │   ├── event/
│   │   │   ├── EventForm.tsx
│   │   │   ├── CategoryPicker.tsx
│   │   │   └── TimePicker.tsx
│   │   ├── favorites/
│   │   │   ├── FavoriteChip.tsx
│   │   │   ├── FavoriteList.tsx
│   │   │   └── FavoriteForm.tsx
│   │   └── transit/
│   │       ├── TransitSegment.tsx
│   │       └── TransitSearch.tsx
│   │
│   ├── store/
│   │   ├── eventsStore.ts      # Event state (Zustand)
│   │   ├── templatesStore.ts   # Template state
│   │   ├── settingsStore.ts    # User settings
│   │   └── index.ts            # Store exports
│   │
│   ├── api/
│   │   ├── client.ts           # Axios instance configuration
│   │   ├── eventsApi.ts        # Event CRUD operations
│   │   ├── templatesApi.ts     # Template operations
│   │   ├── statsApi.ts         # Statistics endpoints
│   │   ├── transitApi.ts       # Transit provider (mock initially)
│   │   └── recommendationsApi.ts # AI suggestions (mock initially)
│   │
│   ├── types/
│   │   ├── event.ts            # Event interfaces
│   │   ├── template.ts         # Template interfaces
│   │   ├── stats.ts            # Statistics interfaces
│   │   ├── transit.ts          # Transit interfaces
│   │   └── user.ts             # User & settings interfaces
│   │
│   ├── utils/
│   │   ├── time.ts             # Time formatting utilities
│   │   ├── date.ts             # Date manipulation
│   │   ├── location.ts         # Location utilities
│   │   ├── storage.ts          # Local storage helpers
│   │   └── validation.ts       # Input validation
│   │
│   ├── hooks/
│   │   ├── useLocation.ts      # Location permission & access
│   │   ├── useEvents.ts        # Event CRUD hooks (React Query)
│   │   ├── useTemplates.ts     # Template hooks
│   │   └── useStats.ts         # Statistics hooks
│   │
│   ├── constants/
│   │   ├── categories.ts       # Default categories
│   │   ├── icons.ts            # Icon mappings
│   │   └── config.ts           # App configuration
│   │
│   ├── services/
│   │   ├── suggestionEngine.ts # Rule-based AI suggestions
│   │   └── transitProvider.ts  # Transit API abstraction
│   │
│   └── theme/
│       ├── colors.ts
│       ├── typography.ts
│       └── spacing.ts
│
└── assets/
    ├── images/
    ├── icons/
    └── fonts/
```

### Backend (FastAPI)

```
backend/
├── .env.example
├── .env                        # Environment variables (gitignored)
├── requirements.txt
├── alembic.ini                 # Database migration config
│
├── main.py                     # FastAPI app entry point
├── config.py                   # Configuration management
├── database.py                 # Database connection & session
│
├── alembic/
│   ├── versions/
│   └── env.py
│
├── routers/
│   ├── events.py               # Event endpoints
│   ├── templates.py            # Template endpoints
│   ├── stats.py                # Statistics endpoints
│   ├── transit.py              # Transit endpoints (mock)
│   ├── recommendations.py      # AI recommendation endpoints (mock)
│   └── settings.py             # User settings endpoints
│
├── schemas/
│   ├── event.py                # Pydantic schemas for events
│   ├── template.py             # Pydantic schemas for templates
│   ├── stats.py                # Pydantic schemas for stats
│   ├── transit.py              # Pydantic schemas for transit
│   └── user.py                 # Pydantic schemas for user/settings
│
├── models.py                   # SQLAlchemy models (all entities)
│
├── services/
│   ├── event_service.py        # Business logic for events
│   ├── template_service.py     # Business logic for templates
│   ├── stats_service.py        # Statistics calculation
│   ├── transit_service.py      # Transit API integration (mock)
│   └── recommendation_service.py # AI recommendations (mock)
│
├── utils/
│   ├── auth.py                 # Device ID authentication
│   ├── validation.py           # Custom validators
│   └── date_utils.py           # Date/time utilities
│
└── tests/
    ├── test_events.py
    ├── test_templates.py
    └── test_stats.py
```

---

## Development Roadmap

### Phase 0: Setup & Infrastructure (Week 1)

**Goals**: Get development environment ready

- [ ] Initialize React Native + Expo + TypeScript project
- [ ] Setup basic navigation (BottomTab + Stack)
- [ ] Initialize FastAPI backend project
- [ ] Setup PostgreSQL database (local Docker or managed service)
- [ ] Configure Alembic for migrations
- [ ] Create initial database schema
- [ ] Setup environment variables (.env files)
- [ ] Configure CORS for local development

**Deliverables**:
- Running mobile app (empty screens)
- Running backend (health check endpoint)
- Database with empty tables

### Phase 1: Core Timeline Features (Week 2-3)

**Goals**: Basic event recording and viewing

**Frontend**:
- [ ] HomeScreen with daily timeline UI
- [ ] TimelineItem component
- [ ] Floating Action Button for quick event creation
- [ ] EventDetailScreen with basic form
- [ ] Local state management with Zustand
- [ ] Mock data for development

**Backend**:
- [ ] User model and device ID authentication
- [ ] Event CRUD endpoints
- [ ] Basic API tests

**Deliverables**:
- Can create, view, edit, delete events
- Events stored in backend database
- Timeline displays events chronologically

### Phase 2: Favorites & Templates (Week 4)

**Goals**: Quick event tagging with templates

**Frontend**:
- [ ] FavoritesScreen with template list
- [ ] Template creation/edit form
- [ ] FavoriteChip components in EventDetailScreen
- [ ] Drag-and-drop reordering
- [ ] Template state management

**Backend**:
- [ ] FavoriteTemplate CRUD endpoints
- [ ] Template reordering endpoint

**Deliverables**:
- Users can create and manage favorite templates
- Templates can be applied to events with one tap
- Templates persist across app restarts

### Phase 3: Location & Permissions (Week 5)

**Goals**: Automatic location capture

**Frontend**:
- [ ] Location permission request flow
- [ ] Automatic location capture on event creation
- [ ] Location display in EventDetailScreen
- [ ] SettingsScreen with permission toggles

**Backend**:
- [ ] Location field in Event model
- [ ] Location-based filtering (future)

**Deliverables**:
- Events can include GPS location
- User controls location permission
- Location displayed on timeline items

### Phase 4: Statistics & Insights (Week 6)

**Goals**: Basic analytics

**Frontend**:
- [ ] StatsScreen with period selector
- [ ] Summary cards (total events, top categories)
- [ ] Simple bar chart for category distribution
- [ ] Top activities list

**Backend**:
- [ ] Statistics calculation service
- [ ] /stats/summary endpoint
- [ ] Aggregation queries

**Deliverables**:
- Users can view weekly/monthly statistics
- Category distribution visualization
- Top activities ranking

### Phase 5: Search & Filtering (Week 7)

**Goals**: Find past events easily

**Frontend**:
- [ ] Search bar in HomeScreen
- [ ] Filter UI (category, date range)
- [ ] Search results display

**Backend**:
- [ ] Search/filter logic in event queries
- [ ] Full-text search (PostgreSQL)

**Deliverables**:
- Search events by keyword
- Filter by category and date range

### Phase 6: Transit Integration - Mock (Week 8)

**Goals**: Design transit feature with mock data

**Frontend**:
- [ ] TransitSegment component
- [ ] "Add Transit" button in EventDetailScreen
- [ ] TransitSearchScreen with mock data
- [ ] Transit provider abstraction layer

**Backend**:
- [ ] Transit trip schema in Event model
- [ ] Mock transit suggestion endpoint

**Deliverables**:
- UI for adding transit information
- Mock transit data displayed in timeline
- Abstraction layer ready for real API

### Phase 7: AI Recommendations - Rule-Based (Week 9)

**Goals**: Simple pattern-based suggestions

**Frontend**:
- [ ] Suggestion chips in EventDetailScreen
- [ ] Rule-based suggestion engine (client-side)
- [ ] Accept/reject suggestion interactions

**Backend**:
- [ ] Mock recommendation endpoint
- [ ] Rule storage (future: for server-based)

**Deliverables**:
- Time-based suggestions (e.g., "Morning Commute" at 8am on weekdays)
- Location-based suggestions (when location available)
- User can accept/reject suggestions

### Phase 8: Polish & Testing (Week 10)

**Goals**: Production-ready MVP

- [ ] Error handling and loading states
- [ ] Empty states and placeholders
- [ ] Offline mode (AsyncStorage fallback)
- [ ] App icon and splash screen
- [ ] E2E testing key flows
- [ ] Performance optimization
- [ ] Bug fixes

**Deliverables**:
- Stable, tested app
- Ready for beta testing

### Future Phases (Post-MVP)

**Phase 9: Widget Support**
- iOS/Android home screen widgets
- Quick event logging from home screen

**Phase 10: Real Transit API Integration**
- Integrate with public transit API (Kakao, Google Maps, etc.)
- Automatic route detection

**Phase 11: Advanced AI**
- Server-side ML model for better suggestions
- Pattern learning from user behavior

**Phase 12: Media Support**
- Photo attachments
- Voice memos

**Phase 13: Export & Sharing**
- Export timeline as PDF/CSV
- Share timeline images on social media

---

## Security & Privacy

### Data Privacy Principles

1. **Local-First Option**: User can opt to keep all data local (no cloud sync)
2. **Explicit Consent**: All tracking (location, transit, AI) requires explicit opt-in
3. **Minimal Collection**: Only collect data necessary for features
4. **User Ownership**: User can export and delete all their data
5. **Transparency**: Clear privacy policy explaining data usage

### Security Measures

#### Mobile App

- **Secure Storage**: Use Expo SecureStore for sensitive data (device ID, tokens)
- **HTTPS Only**: All API calls over HTTPS
- **No Hardcoded Secrets**: API keys in environment variables
- **Certificate Pinning** (future): Prevent MITM attacks

#### Backend

- **Authentication**: Device ID-based (MVP), OAuth (future)
- **Authorization**: Users can only access their own data
- **SQL Injection Prevention**: Use SQLAlchemy ORM parameterized queries
- **Rate Limiting**: Prevent abuse (e.g., 100 requests/minute per device)
- **Input Validation**: Pydantic schemas validate all inputs
- **HTTPS/TLS**: Enforce HTTPS in production
- **CORS Configuration**: Whitelist allowed origins
- **Database Encryption**: Encrypt sensitive fields (future)

#### Location Data

- **Permission Checks**: Request and verify permissions before accessing GPS
- **Purpose Limitation**: Location only used for event context, not tracking
- **Opt-Out**: User can disable location at any time
- **Anonymization**: Location data not shared with third parties

### Privacy Settings

Users control:
- Location access (on/off)
- Transit tracking (on/off)
- AI recommendations (on/off)
- Cloud sync (on/off)
- Local-only mode (on/off)

### Data Retention

- **Active Data**: Kept indefinitely (user's timeline)
- **Deleted Data**: Soft delete (30 days), then hard delete
- **Logs**: Server logs retained for 90 days
- **Analytics**: Aggregated only, no PII

### Compliance

- **GDPR**: Right to access, right to deletion, data portability
- **CCPA**: Data disclosure, opt-out of sale (N/A - no data sale)
- **App Store Requirements**: Privacy labels, data usage disclosure

---

## Extension Points

### Transit Provider Abstraction

**Interface**:
```typescript
interface TransitProvider {
  searchTripByTime(location: Location, timestamp: string): Promise<TransitTrip[]>;
  searchStations(query: string, type?: TransitType): Promise<Station[]>;
  getNearbyStations(location: Location): Promise<Station[]>;
}
```

**Implementations**:
- `MockTransitProvider` (current)
- `KakaoTransitProvider` (future, Korea)
- `GoogleMapsTransitProvider` (future, global)

**How to Swap**:
1. Create new class implementing `TransitProvider`
2. Update `src/services/transitProvider.ts` to use new implementation
3. No changes needed in UI components

### Recommendation Engine Abstraction

**Interface**:
```typescript
interface SuggestionEngine {
  suggestLabel(
    eventHistory: Event[],
    context: { time: string; weekday: number; location?: Location }
  ): Promise<Suggestion[]>;
}
```

**Implementations**:
- `RuleBasedEngine` (current): Simple if-else rules
- `MLBasedEngine` (future): Server-side ML model

**How to Swap**:
1. Implement new engine with same interface
2. Update `src/services/suggestionEngine.ts`
3. UI automatically uses new suggestions

### Storage Layer Abstraction

**Current**: Direct API calls + local fallback

**Future**: Offline-first architecture
- Local SQLite as source of truth
- Background sync to server
- Conflict resolution

**Interface**:
```typescript
interface EventRepository {
  create(event: EventCreate): Promise<Event>;
  get(id: string): Promise<Event>;
  list(filters: EventFilters): Promise<Event[]>;
  update(id: string, updates: EventUpdate): Promise<Event>;
  delete(id: string): Promise<void>;
}
```

**Implementations**:
- `LocalEventRepository` (SQLite)
- `RemoteEventRepository` (API)
- `SyncedEventRepository` (hybrid with sync)

### Widget Extension

**Design Considerations**:
- iOS: WidgetKit (requires native Swift code)
- Android: App Widget (requires native Kotlin code)
- Expo Config Plugin needed for native code

**Planned Widgets**:
1. **Quick Log**: Single button, taps create event
2. **Timeline Preview**: Shows last 3 events, tappable
3. **Templates**: Shows favorite templates, tap to log with template

**Implementation Path**:
1. Create native modules (Swift/Kotlin)
2. Expose to React Native via Expo modules
3. Configure in `app.json`
4. Handle widget taps in app

### Photo/Voice Attachments

**Data Model Extension**:
```typescript
interface Event {
  // ... existing fields
  attachments: Attachment[];
}

interface Attachment {
  id: string;
  type: 'photo' | 'voice';
  url: string;           // Local file path or remote URL
  thumbnailUrl?: string; // For photos
  durationSeconds?: number; // For voice
  createdAt: string;
}
```

**Storage**:
- Local: Device file system
- Remote: S3/CloudStorage with presigned URLs

**Considerations**:
- File size limits
- Storage costs
- Privacy (photos may contain sensitive info)

---

## Open Questions & Decisions Needed

### 1. Default Categories

**Proposed**:
- Work
- Health
- Leisure
- Transport
- Social
- Personal
- Other

**Question**: Should users be able to create custom categories, or stick to predefined list?

**Recommendation**: Allow custom categories, but suggest defaults.

### 2. Time Granularity

**Question**: Should events support seconds precision, or just minutes?

**Recommendation**: Store ISO8601 with seconds, display in minutes. Allows future features like precise transit tracking.

### 3. Timezone Handling

**Question**: How to handle events created in different timezones (e.g., during travel)?

**Recommendation**:
- Store timestamps in UTC (database)
- Display in user's current timezone (app)
- Future: Add timezone field to Event for travel scenarios

### 4. Offline Mode Strategy

**Options**:
1. **Always Online**: Require internet, fail gracefully
2. **Offline-First**: Local storage primary, sync when online
3. **Hybrid**: Online by default, offline fallback

**Recommendation**: Start with Hybrid (Phase 1-2), move to Offline-First (Phase 3+)

### 5. Transit API Choice (Future)

**For Korea**:
- Kakao Mobility API
- Seoul Open Data Portal
- Korea Transport Database (TAGO)

**For Global**:
- Google Maps Directions API (paid)
- Transit.land (open data)
- Moovit API

**Recommendation**: Design abstraction layer now, choose provider when implementing.

### 6. AI Model Approach (Future)

**Options**:
1. **On-Device**: TensorFlow Lite models on mobile
2. **Server-Side**: FastAPI backend runs inference
3. **Hybrid**: Simple rules on-device, complex models server-side

**Recommendation**: Start with server-side (easier to iterate), consider on-device for privacy-sensitive users.

---

## Success Metrics

### MVP Launch (Phase 1-2)

- User can log 10+ events per day without friction
- Event creation takes < 3 seconds
- App loads in < 2 seconds
- Zero crashes in core flows

### Phase 3-4 (Templates & Stats)

- 70% of events use templates (indicates value)
- Users view stats at least once per week
- Template creation < 30 seconds

### Phase 5+ (Advanced Features)

- Transit integration used on 30% of commute events
- AI suggestions accepted 50%+ of the time
- Widget accounts for 20%+ of event creations

---

## Appendix

### Glossary

- **Event**: A timestamped record of an activity or moment
- **Template/Favorite**: A reusable preset for common events
- **Transit Trip**: A segment of public transportation (bus, subway, train)
- **Timeline**: Chronological list of events for a day/week/month
- **Suggestion**: AI-recommended label or category for an event
- **Device ID**: Unique identifier for anonymous user authentication

### References

- [React Native Docs](https://reactnative.dev/)
- [Expo Docs](https://docs.expo.dev/)
- [FastAPI Docs](https://fastapi.tiangolo.com/)
- [SQLAlchemy Docs](https://docs.sqlalchemy.org/)
- [React Navigation](https://reactnavigation.org/)
- [Zustand](https://github.com/pmndrs/zustand)

---

## Next Steps

1. **Review & Approve This Design**
   - Read through all sections
   - Identify any missing requirements
   - Clarify open questions
   - Approve to proceed with implementation

2. **Setup Development Environment**
   - Install Node.js, Expo CLI
   - Install Python, FastAPI dependencies
   - Setup PostgreSQL (Docker or managed)

3. **Phase 0: Initialize Projects**
   - Create React Native + Expo project
   - Create FastAPI backend
   - Setup database schema

4. **Phase 1: Build Core Features**
   - Follow roadmap step-by-step
   - Test each feature before moving to next

---

**End of Design Document**

---

## Approval Checklist

Before proceeding to implementation, please confirm:

- [ ] App concept and features are clear
- [ ] Data models meet requirements
- [ ] API specifications are complete
- [ ] Technology choices are acceptable
- [ ] Project structure makes sense
- [ ] Development roadmap is realistic
- [ ] Security/privacy considerations addressed
- [ ] Ready to start coding!

**Status**: ⏳ **Awaiting User Approval**
