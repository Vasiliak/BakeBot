while(true) 
{ 
    size_t eventsCount{}; 
    const XblAchievementsManagerEvent* events{}; 
    HRESULT hr = XblAchievementsManagerDoWork(&events, &eventsCount); 
    if (FAILED(hr))
    {
        // handle the error
    }

    for (uint32_t i = 0; i < eventsCount; ++i) 
    { 
        // act on the event
        switch (events[i].eventType) 
        { 
        case XblAchievementsManagerEventType::LocalUserInitialStateSynced: 
            // ...
            break; 
        case XblAchievementsManagerEventType::AchievementProgressUpdated: 
            // ...
            break; 
        case XblAchievementsManagerEventType::AchievementUnlocked: 
            // ...
            break; 
        default: 
            break; 
        } 
    } 
} 

HRESULT hr = XblAchievementsManagerAddLocalUser(userHandle, nullptr);

if (!XblAchievementsManagerIsUserInitialized(xboxUserId))
{
    return;
}

XblAchievementsManagerResultHandle resultHandle; 
const XblAchievement* achievements; 
uint64_t achievementsCount; 

hr = XblAchievementsManagerGetAchievements( 
    xboxUserId, 
    XblAchievementOrderBy::DefaultOrder, 
    XblAchievementsManagerSortOrder::Unsorted, 
    &resultHandle 
); 

if(FAILED(hr)) 
{ 
    return; 
} 

hr = XblAchievementsManagerResultGetAchievements( 
    resultHandle, 
    &achievements, 
    &achievementsCount 
); 

if(FAILED(hr)) 
{ 
    return; 
} 
 
for (uint32_t i = 0; i < 5; ++i) 
{ 
    // ... 
} 
XblAchievementsManagerResultCloseHandle(resultHandle); 