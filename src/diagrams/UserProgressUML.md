# User Progress Tracking System - UML Diagram

```mermaid
classDiagram
    class AuthContext {
        -currentUser: User
        -userProgress: UserProgress
        -loading: boolean
        -profileLoading: boolean
        +signIn(email, password): Promise~void~
        +signUp(email, password): Promise~void~
        +logout(): Promise~void~
        +updateUserProfile(profileData): Promise~void~
        +addSubmission(submission): Promise~void~
        +updateSolvedQuestion(questionId): Promise~void~
        -fetchUserProfile(userId): Promise~void~
        -fetchUserProgress(userId): Promise~void~
        -saveUserProgress(progress): Promise~void~
    }

    class UserProgress {
        +userId: string
        +displayName: string
        +solvedQuestions: string[] | Record~string, boolean~
        +submissions: Submission[]
        +streak: Streak
        +categoryProgress: CategoryProgress[]
        +difficultyProgress: DifficultyProgress[]
        +topicProgress: TopicProgress[]
        +badges: Badge[]
        +totalSolved: number
        +totalAttempted: number
        +rank: number
        +xp: number
        +level: number
    }

    class Submission {
        +id: string
        +userId: string
        +questionId: string
        +questionTitle: string
        +code: string
        +language: string
        +status: string
        +timestamp: Date
        +executionTime: number
        +memory: number
        +runtime: number
    }

    class CodeQuestion {
        +id: string
        +title: string
        +difficulty: string
        +language: string
        +languageId: number
        +tags: string[]
        +description: string
        +starterCode: Record~string, string~
        +testCases: TestCase[]
    }

    class TestCase {
        +input: string
        +expectedOutput: string
        +actualOutput: string
        +passed: boolean
        +executionTime: number
    }

    class CodeExecutionService {
        +executeCode(code, language, input): Promise~SubmissionResult~
    }

    class useCodeExecution {
        -isRunning: boolean
        -output: string
        -testResults: TestCase[]
        +runCode(code, language, input, testCases): Promise~ExecutionResult~
    }

    class useQuestionProgress {
        -progress: {status, lastSubmission, submissionCount}
        +getProgress(): {status, lastSubmission, submissionCount}
    }

    class QuestionSolvingPage {
        -question: CodeQuestion
        -code: string
        -selectedLanguage: string
        -customInput: string
        -output: string
        -testResults: TestCase[]
        -lastSubmissionStatus: string
        +handleRunCode(): void
        +handleSubmitCode(): void
        +handleResetCode(): void
    }

    class UserDashboard {
        -activeTab: string
        -difficultyFilter: string
        -searchQuery: string
        -filteredSubmissions: Submission[]
        -stats: {totalSolved, totalSubmissions, acceptanceRate, streak, xp, level}
        +setActiveTab(tab): void
        +setDifficultyFilter(filter): void
        +setSearchQuery(query): void
    }

    class Profile {
        -isEditing: boolean
        -displayName: string
        -bio: string
        -activeTab: string
        +handleSave(): Promise~void~
        +handleCancel(): void
        +updateUserProfile(): Promise~void~
    }

    AuthContext --> UserProgress : manages
    AuthContext --> Submission : creates
    UserProgress "1" *-- "many" Submission : contains
    UserProgress "1" *-- "many" Badge : earns
    UserProgress "1" *-- "1" Streak : tracks
    UserProgress "1" *-- "many" CategoryProgress : monitors
    UserProgress "1" *-- "many" DifficultyProgress : monitors
    UserProgress "1" *-- "many" TopicProgress : monitors
    
    QuestionSolvingPage --> useCodeExecution : uses
    QuestionSolvingPage --> AuthContext : uses
    QuestionSolvingPage --> CodeQuestion : displays
    QuestionSolvingPage --> TestCase : runs
    
    useCodeExecution --> CodeExecutionService : calls
    useQuestionProgress --> AuthContext : reads from
    
    UserDashboard --> AuthContext : reads from
    UserDashboard --> Submission : displays
    
    Profile --> AuthContext : updates
```

## Sequence Diagram for Code Submission Flow

```mermaid
sequenceDiagram
    actor User
    participant QSP as QuestionSolvingPage
    participant UCE as useCodeExecution
    participant CES as CodeExecutionService
    participant AC as AuthContext
    participant FB as Firebase/Firestore

    User->>QSP: Writes code solution
    User->>QSP: Clicks "Run Code"
    QSP->>UCE: runCode(code, language, input, testCases)
    UCE->>CES: executeCode(code, language, input)
    CES-->>UCE: Returns execution result
    
    loop For each test case
        UCE->>CES: executeCode(code, language, testCase.input)
        CES-->>UCE: Returns test case result
    end
    
    UCE-->>QSP: Returns all results
    QSP-->>User: Displays output and test results
    
    User->>QSP: Clicks "Submit"
    QSP->>UCE: runCode(code, language, input, testCases)
    UCE-->>QSP: Returns execution results
    
    alt All tests passed
        QSP->>AC: addSubmission(submission)
        AC->>FB: Adds submission to Firestore
        AC->>FB: Updates solvedQuestions
        FB-->>AC: Confirms update
        AC-->>QSP: Submission successful
        QSP->>QSP: Updates UI to show success
    else Some tests failed
        QSP->>AC: addSubmission(submission with failed status)
        AC->>FB: Adds submission to Firestore
        FB-->>AC: Confirms update
        AC-->>QSP: Submission recorded
        QSP->>QSP: Updates UI to show failure
    end
    
    QSP-->>User: Shows submission result
```

## State Diagram for User Progress

```mermaid
stateDiagram-v2
    [*] --> Unsolved
    
    Unsolved --> Attempted: User submits incorrect solution
    Attempted --> Attempted: User submits another incorrect solution
    Attempted --> Solved: User submits correct solution
    Unsolved --> Solved: User submits correct solution first try
    
    Solved --> [*]
    
    state UserProgress {
        [*] --> Level1
        Level1 --> Level2: Earn 100 XP
        Level2 --> Level3: Earn 100 XP
        Level3 --> Level4: Earn 100 XP
        
        state Badges {
            [*] --> NoBadge
            NoBadge --> BronzeBadge: Solve 30% of topic problems
            BronzeBadge --> SilverBadge: Solve 60% of topic problems
            SilverBadge --> GoldBadge: Solve 100% of topic problems
        }
        
        state Streak {
            [*] --> NoStreak
            NoStreak --> Day1: Solve problem
            Day1 --> Day2: Solve problem next day
            Day2 --> Day3: Solve problem next day
            Day3 --> Day7: Continue daily solving
            Day1 --> NoStreak: Miss a day
            Day2 --> NoStreak: Miss a day
            Day3 --> NoStreak: Miss a day
            Day7 --> WeekStreakBadge: Complete 7-day streak
        }
    }
```

## Component Interaction Diagram

```mermaid
flowchart TD
    User([User])
    
    subgraph Components
        Profile[Profile Page]
        UserDashboard[User Dashboard]
        QuestionSolvingPage[Question Solving Page]
        TopicsPage[Topics Page]
        TopicDetailPage[Topic Detail Page]
        ProblemsPage[Problems Page]
    end
    
    subgraph Hooks
        useAuth[useAuth]
        useCodeExecution[useCodeExecution]
        useQuestionProgress[useQuestionProgress]
    end
    
    subgraph Services
        CodeExecutionService[Code Execution Service]
    end
    
    subgraph Firebase
        Auth[Firebase Auth]
        Firestore[Firestore Database]
    end
    
    User -->|Interacts with| Components
    
    Profile -->|Uses| useAuth
    UserDashboard -->|Uses| useAuth
    QuestionSolvingPage -->|Uses| useAuth
    QuestionSolvingPage -->|Uses| useCodeExecution
    QuestionSolvingPage -->|Uses| useQuestionProgress
    TopicsPage -->|Uses| useAuth
    TopicDetailPage -->|Uses| useAuth
    ProblemsPage -->|Uses| useAuth
    
    useAuth -->|Authenticates with| Auth
    useAuth -->|Reads/Writes data to| Firestore
    useCodeExecution -->|Calls| CodeExecutionService
    useQuestionProgress -->|Reads from| useAuth
    
    CodeExecutionService -->|Executes code via| ExternalJudge[Judge0 API]
```