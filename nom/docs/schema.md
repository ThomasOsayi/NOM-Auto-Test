# NOM Database Schema

## ERD Overview
````
┌─────────────┐         ┌──────────────┐         ┌─────────────┐
│   users     │────────<│   follows    │>────────│   users     │
└─────────────┘         └──────────────┘         └─────────────┘
       │                                                  
       │                                                  
       │ 1:N                                              
       │                                                  
       ▼                                                  
┌─────────────┐                                          
│    noms     │                                          
└─────────────┘

rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Users: read public, write own
    match /users/{userId} {
      allow read: if true;
      allow write: if request.auth.uid == userId;
    }
    
    // NOMs: read public, write own
    match /noms/{nomId} {
      allow read: if true;
      allow create: if request.auth.uid != null;
      allow update, delete: if request.auth.uid == resource.data.userId;
    }
    
    // Follows: read public, write own
    match /follows/{followId} {
      allow read: if true;
      allow create: if request.auth.uid == request.resource.data.followerId;
      allow delete: if request.auth.uid == resource.data.followerId;
    }
    
    // Notifications: read/write own only
    match /notifications/{notifId} {
      allow read, write: if request.auth.uid == resource.data.userId;
    }
  }
}
````

---

## Storage Structure (Firebase Storage)
````
/users/{userId}/profile/{filename}.jpg
/noms/{nomId}/{photoIndex}.jpg
````

**Rules:**
- Any authenticated user can upload to their own folders
- All images are publicly readable

---

## Phase 1 MVP Scope

**Week 1-3 Implementation:**
- ✅ `users` collection (signup/login)
- ✅ `noms` collection (create + read)
- ✅ Basic search (by restaurant name, location)
- ⏳ `follows` (Phase 2)
- ⏳ `notifications` (Phase 2)
````
