# View Profile and Book Demo - Implementation Guide

## Current Status

The FindTeachers page already has:
- ✅ "View Profile" button (UI only)
- ✅ "Book Demo" button (UI only)
- ❌ Not connected to functionality

## What Needs to Be Implemented

### 1. View Teacher Profile
**Goal:** Parent clicks "View Profile" → See full teacher details

**Implementation:**
- Create Teacher Profile Modal or Page
- Show complete teacher information
- Display skills, experience, qualifications
- Show portfolio links
- Display reviews/ratings

**Files to Modify:**
- `client/src/components/Dashboard/ParentDashboard/FindTeachers.jsx`
- Create: `client/src/components/Dashboard/ParentDashboard/TeacherProfileModal.jsx`

### 2. Book Demo Class
**Goal:** Parent clicks "Book Demo" → Send demo request to teacher

**Implementation:**
- Create Demo Booking Modal
- Form fields: Subject, Date, Time, Mode (Online/Offline), Message
- Send request to backend
- Teacher sees request in their dashboard

**Files to Create/Modify:**
- Create: `client/src/components/Dashboard/ParentDashboard/BookDemoModal.jsx`
- Modify: `client/src/components/Dashboard/ParentDashboard/FindTeachers.jsx`
- Backend: Already has tuition request endpoints

### 3. Teacher Dashboard - Demo Requests
**Goal:** Teacher sees demo requests from parents

**Implementation:**
- Show list of demo requests
- Accept/Reject buttons
- Set demo class date/time
- Send confirmation to parent

**Files to Modify:**
- `client/src/components/Dashboard/TeacherDashboard/DashboardLayout.jsx`
- Create: `client/src/components/Dashboard/TeacherDashboard/DemoRequests.jsx`

---

## Quick Implementation (Minimal)

### Step 1: Add View Profile Button Handler

In `FindTeachers.jsx`, add:
```javascript
const handleViewProfile = (teacherId) => {
  // Option A: Navigate to teacher profile page
  navigate(`/teacher/profile/${teacherId}`);
  
  // Option B: Open modal
  setSelectedTeacher(teacherId);
  setShowProfileModal(true);
};
```

### Step 2: Add Book Demo Button Handler

```javascript
const handleBookDemo = (teacher) => {
  setSelectedTeacher(teacher);
  setShowBookingModal(true);
};
```

### Step 3: Use Existing Backend Endpoint

The backend already has:
```
POST /api/tuition/request
```

This can be used for demo bookings!

---

## Backend Endpoints (Already Available)

### Create Tuition/Demo Request
```
POST /api/tuition/request
Body: {
  teacherId: "...",
  subject: "Mathematics",
  classLevel: "Grade 10",
  mode: "Online",
  location: "Mumbai",
  message: "Request for demo class",
  hourlyRate: 500
}
```

### Get Teacher's Requests
```
GET /api/tuition/teacher/requests
```

### Update Request Status
```
PATCH /api/tuition/teacher/request/:requestId/status
Body: {
  status: "accepted" | "rejected",
  startDate: "2024-03-15"
}
```

---

## Recommended Approach

### Phase 1: View Profile (Simple)
1. Navigate to teacher profile page when "View Profile" clicked
2. Reuse existing TeacherProfile component but in read-only mode
3. Or create a simple modal showing teacher details

### Phase 2: Book Demo (Using Existing Backend)
1. Create BookDemoModal component
2. Form with: Subject, Date, Time, Mode, Message
3. Call existing `POST /api/tuition/request` endpoint
4. Show success message

### Phase 3: Teacher Dashboard
1. Add "Demo Requests" section to teacher dashboard
2. Fetch requests using `GET /api/tuition/teacher/requests`
3. Show Accept/Reject buttons
4. Update status using existing endpoint

---

## Minimal Code Example

### FindTeachers.jsx - Add Handlers
```javascript
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTuitionRequest } from '@/services/tuitionServices';
import { toast } from 'sonner';

const FindTeachers = () => {
  const navigate = useNavigate();
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  const handleViewProfile = (teacherId) => {
    navigate(`/teacher/${teacherId}`);
  };

  const handleBookDemo = (teacher) => {
    setSelectedTeacher(teacher);
    setShowBookingModal(true);
  };

  const submitDemoRequest = async (formData) => {
    try {
      await createTuitionRequest({
        teacherId: selectedTeacher._id,
        ...formData
      });
      toast.success('Demo request sent successfully!');
      setShowBookingModal(false);
    } catch (error) {
      toast.error('Failed to send demo request');
    }
  };

  // In the teacher card JSX:
  <button 
    onClick={() => handleViewProfile(tutor._id)}
    className="flex-1 bg-[#5B3DF5] text-white py-2 px-4 rounded-lg"
  >
    View Profile
  </button>
  <button 
    onClick={() => handleBookDemo(tutor)}
    className="flex-1 border border-[#E5E7EB] text-[#6B7280] py-2 px-4 rounded-lg"
  >
    Book Demo
  </button>
};
```

---

## Summary

**Current Issue:** 404 errors due to browser cache
**Solution:** Hard refresh browser (Ctrl+Shift+R)

**New Feature Request:** View Profile + Book Demo
**Status:** Buttons exist, functionality needs to be added
**Backend:** Already has endpoints for tuition requests
**Effort:** Medium (2-3 hours for complete implementation)

**Next Steps:**
1. Hard refresh browser to fix 404 errors
2. Verify teachers are visible
3. Then implement View Profile and Book Demo features

Would you like me to implement the View Profile and Book Demo functionality now?
